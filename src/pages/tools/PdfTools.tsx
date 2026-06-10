import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";
import { ToolExplanation } from "@/components/ToolExplanation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Merge,
  Split,
  RotateCw,
  Minimize2,
  FileX,
  Upload,
  Download,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import { PDFDocument, degrees, PDFName, PDFDict } from "pdf-lib";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/ToolLayout";

// Set up pdfjs worker using the bundled worker from pdfjs-dist
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;

interface ExtractedImage {
  dataUrl: string;
  format: string;
  width: number;
  height: number;
  name: string;
}

const MAX_FILE_SIZE_MB = 50;

export default function PdfTools() {
  const seoConfig = getSEOConfig("pdf-tools");
  const [activeTab, setActiveTab] = useState<string>("merge");
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState<string>("");
  const [extractedImages, setExtractedImages] = useState<ExtractedImage[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [rotationAngle, setRotationAngle] = useState<number>(90);
  const [splitPageRange, setSplitPageRange] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // ─── File handling ───────────────────────────────────────────────────────────

  const addFiles = useCallback(
    (incoming: File[]) => {
      const valid = incoming.filter((file) => {
        if (file.type !== "application/pdf") {
          toast({ title: "Invalid file", description: `${file.name} is not a PDF`, variant: "destructive" });
          return false;
        }
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          toast({ title: "File too large", description: `${file.name} exceeds ${MAX_FILE_SIZE_MB}MB`, variant: "destructive" });
          return false;
        }
        return true;
      });
      if (valid.length) {
        setFiles((prev) => [...prev, ...valid]);
        toast({ title: "Files added", description: `${valid.length} file(s) added` });
      }
    },
    [toast]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      addFiles(Array.from(e.target.files || []));
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [addFiles]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      addFiles(Array.from(e.dataTransfer.files));
    },
    [addFiles]
  );

  const removeFile = useCallback((index: number) => setFiles((prev) => prev.filter((_, i) => i !== index)), []);

  const clearAll = useCallback(() => {
    setFiles([]);
    setExtractedText("");
    setExtractedImages([]);
  }, []);

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  const downloadBlob = (bytes: Uint8Array, filename: string, mime = "application/pdf") => {
    const blob = new Blob([bytes], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── Merge ───────────────────────────────────────────────────────────────────

  const mergePdfs = useCallback(async () => {
    if (files.length < 2) {
      toast({ title: "Error", description: "Select at least 2 PDF files to merge", variant: "destructive" });
      return;
    }
    setProcessing(true);
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const pdf = await PDFDocument.load(await file.arrayBuffer());
        const pages = await merged.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      downloadBlob(await merged.save(), "merged.pdf");
      toast({ title: "Done", description: `Merged ${files.length} PDFs successfully` });
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to merge PDFs", variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  }, [files, toast]);

  // ─── Split ───────────────────────────────────────────────────────────────────

  const splitPdf = useCallback(async () => {
    if (files.length !== 1) {
      toast({ title: "Error", description: "Select exactly one PDF to split", variant: "destructive" });
      return;
    }
    setProcessing(true);
    try {
      const pdf = await PDFDocument.load(await files[0].arrayBuffer());
      const total = pdf.getPageCount();

      // Parse page range: "1-3,5,7-9" → 0-indexed array
      let indices: number[];
      if (splitPageRange.trim()) {
        indices = [];
        for (const part of splitPageRange.split(",")) {
          const p = part.trim();
          if (p.includes("-")) {
            const [s, e] = p.split("-").map((n) => parseInt(n.trim()) - 1);
            for (let i = s; i <= Math.min(e, total - 1); i++) if (i >= 0) indices.push(i);
          } else {
            const n = parseInt(p) - 1;
            if (n >= 0 && n < total) indices.push(n);
          }
        }
        if (!indices.length) {
          toast({ title: "Error", description: "No valid pages in range", variant: "destructive" });
          setProcessing(false);
          return;
        }
      } else {
        indices = pdf.getPageIndices();
      }

      // Download each selected page as individual PDF
      for (const i of indices) {
        const newPdf = await PDFDocument.create();
        const [page] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(page);
        downloadBlob(await newPdf.save(), `page-${i + 1}.pdf`);
      }

      toast({ title: "Done", description: `Split into ${indices.length} PDF file(s)` });
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to split PDF", variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  }, [files, splitPageRange, toast]);

  // ─── Rotate ──────────────────────────────────────────────────────────────────

  const rotatePdf = useCallback(async () => {
    if (files.length !== 1) {
      toast({ title: "Error", description: "Select exactly one PDF to rotate", variant: "destructive" });
      return;
    }
    setProcessing(true);
    try {
      const pdf = await PDFDocument.load(await files[0].arrayBuffer());
      pdf.getPages().forEach((page) => {
        const current = page.getRotation().angle;
        page.setRotation(degrees((current + rotationAngle) % 360));
      });
      downloadBlob(await pdf.save(), "rotated.pdf");
      toast({ title: "Done", description: `All pages rotated ${rotationAngle}°` });
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to rotate PDF", variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  }, [files, rotationAngle, toast]);

  // ─── Compress ────────────────────────────────────────────────────────────────

  const compressPdf = useCallback(async () => {
    if (files.length !== 1) {
      toast({ title: "Error", description: "Select exactly one PDF to compress", variant: "destructive" });
      return;
    }
    setProcessing(true);
    try {
      const original = files[0];
      const pdf = await PDFDocument.load(await original.arrayBuffer(), { ignoreEncryption: true });

      // Strip all metadata to reduce size
      pdf.setTitle("");
      pdf.setAuthor("");
      pdf.setSubject("");
      pdf.setKeywords([]);
      pdf.setProducer("");
      pdf.setCreator("");

      const compressed = await PDFDocument.create();
      const pages = await compressed.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((p) => compressed.addPage(p));

      const bytes = await compressed.save({ useObjectStreams: true, addDefaultPage: false });
      const savedBytes = original.size - bytes.length;
      const pct = ((savedBytes / original.size) * 100).toFixed(1);

      downloadBlob(bytes, "compressed.pdf");

      if (bytes.length >= original.size) {
        toast({ title: "Done", description: "PDF already optimised — no further structural compression possible." });
      } else {
        toast({ title: "Done", description: `Compressed by ${pct}% (${(savedBytes / 1024).toFixed(0)} KB saved)` });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to compress PDF", variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  }, [files, toast]);

  // ─── Extract Text (pdfjs-dist) ───────────────────────────────────────────────

  const extractText = useCallback(async () => {
    if (files.length !== 1) {
      toast({ title: "Error", description: "Select exactly one PDF to extract text", variant: "destructive" });
      return;
    }
    setProcessing(true);
    setExtractedText("");
    try {
      const arrayBuffer = await files[0].arrayBuffer();
      const loadingTask = getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;

      let fullText = "";
      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item: any) => item.str ?? "")
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();
        if (pageText) fullText += `--- Page ${i} ---\n${pageText}\n\n`;
      }

      if (fullText.trim()) {
        setExtractedText(fullText);
        toast({ title: "Done", description: "Text extracted successfully" });
      } else {
        setExtractedText("No selectable text found. This PDF may contain scanned images rather than text.");
        toast({ title: "Info", description: "No text content found in this PDF" });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to extract text", variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  }, [files, toast]);

  const downloadText = useCallback(() => {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [extractedText]);

  // ─── Extract Images (pdf-lib context traversal) ───────────────────────────────

  const extractImages = useCallback(async () => {
    if (files.length !== 1) {
      toast({ title: "Error", description: "Select exactly one PDF to extract images", variant: "destructive" });
      return;
    }
    setProcessing(true);
    setExtractedImages([]);
    try {
      const pdfDoc = await PDFDocument.load(await files[0].arrayBuffer());
      const context = pdfDoc.context;
      const found: ExtractedImage[] = [];

      // Helper: resolve PDFRef to its actual object
      const resolve = (obj: any): any => {
        if (!obj) return undefined;
        // PDFRef has objectNumber + generationNumber
        if (typeof obj.objectNumber === "number") return context.lookup(obj);
        return obj;
      };

      for (let pageIdx = 0; pageIdx < pdfDoc.getPageCount(); pageIdx++) {
        const page = pdfDoc.getPage(pageIdx);
        const pageNode = page.node as any;

        const resources = resolve(pageNode.get(PDFName.of("Resources")));
        if (!resources) continue;

        const xObjects = resolve((resources as PDFDict).get(PDFName.of("XObject")));
        if (!xObjects || typeof (xObjects as any).entries !== "function") continue;

        for (const [xName, xRef] of (xObjects as PDFDict).entries()) {
          const xObj = resolve(xRef) as any;
          if (!xObj) continue;

          // Image XObjects are streams: they have .dict and .contents
          const dict: PDFDict | undefined = xObj.dict;
          const contents: Uint8Array | undefined = xObj.contents;
          if (!dict || !contents || contents.length === 0) continue;

          const subtype = resolve(dict.get(PDFName.of("Subtype"))) as any;
          if (!subtype || typeof subtype.asString !== "function") continue;
          if (subtype.asString() !== "/Image") continue;

          // Dimensions
          const wObj = resolve(dict.get(PDFName.of("Width"))) as any;
          const hObj = resolve(dict.get(PDFName.of("Height"))) as any;
          const width: number = wObj?.asNumber?.() ?? wObj?.numberValue ?? 0;
          const height: number = hObj?.asNumber?.() ?? hObj?.numberValue ?? 0;

          // Filter → format
          const filterObj = resolve(dict.get(PDFName.of("Filter"))) as any;
          const filterName: string = filterObj?.asString?.() ?? "";

          let format = "png";
          let mimeType = "image/png";

          if (filterName === "/DCTDecode") {
            // Raw JPEG bytes — downloadable directly
            format = "jpg";
            mimeType = "image/jpeg";
            const blob = new Blob([contents], { type: mimeType });
            const dataUrl = URL.createObjectURL(blob);
            const imgName = `image-p${pageIdx + 1}-${xName.toString().replace("/", "")}.jpg`;
            found.push({ dataUrl, format, width, height, name: imgName });
          } else if (filterName === "/JPXDecode") {
            // JPEG 2000 — download raw bytes (browser will handle it in some cases)
            format = "jp2";
            mimeType = "image/jp2";
            const blob = new Blob([contents], { type: mimeType });
            const dataUrl = URL.createObjectURL(blob);
            found.push({ dataUrl, format, width, height, name: `image-p${pageIdx + 1}-${xName.toString().replace("/", "")}.jp2` });
          } else if (filterName === "/FlateDecode" || filterName === "") {
            // Raw (possibly deflate-compressed) pixel data — render via canvas
            try {
              const bpcObj = resolve(dict.get(PDFName.of("BitsPerComponent"))) as any;
              const bitsPerComponent: number = bpcObj?.asNumber?.() ?? bpcObj?.numberValue ?? 8;
              const csObj = resolve(dict.get(PDFName.of("ColorSpace"))) as any;
              const csName: string = csObj?.asString?.() ?? csObj?.[0]?.asString?.() ?? "/DeviceRGB";
              const channels = csName.includes("Gray") ? 1 : 4;

              // Decompress if FlateDecode using DecompressionStream
              let pixelData: Uint8Array;
              if (filterName === "/FlateDecode") {
                const ds = new DecompressionStream("deflate-raw");
                const writer = ds.writable.getWriter();
                const reader = ds.readable.getReader();
                writer.write(contents);
                writer.close();
                const chunks: Uint8Array[] = [];
                let done = false;
                while (!done) {
                  const { value, done: d } = await reader.read();
                  if (value) chunks.push(value);
                  done = d;
                }
                const total = chunks.reduce((sum, c) => sum + c.length, 0);
                pixelData = new Uint8Array(total);
                let offset = 0;
                for (const chunk of chunks) {
                  pixelData.set(chunk, offset);
                  offset += chunk.length;
                }
              } else {
                pixelData = contents;
              }

              const canvas = document.createElement("canvas");
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext("2d");
              if (!ctx || width === 0 || height === 0) continue;

              const imageData = ctx.createImageData(width, height);
              for (let px = 0; px < width * height; px++) {
                if (channels === 1) {
                  const v = pixelData[px * (bitsPerComponent / 8)] ?? 0;
                  imageData.data[px * 4] = v;
                  imageData.data[px * 4 + 1] = v;
                  imageData.data[px * 4 + 2] = v;
                  imageData.data[px * 4 + 3] = 255;
                } else {
                  imageData.data[px * 4] = pixelData[px * 3] ?? 0;
                  imageData.data[px * 4 + 1] = pixelData[px * 3 + 1] ?? 0;
                  imageData.data[px * 4 + 2] = pixelData[px * 3 + 2] ?? 0;
                  imageData.data[px * 4 + 3] = 255;
                }
              }
              ctx.putImageData(imageData, 0, 0);
              const dataUrl = canvas.toDataURL("image/png");
              found.push({ dataUrl, format: "png", width, height, name: `image-p${pageIdx + 1}-${xName.toString().replace("/", "")}.png` });
            } catch {
              // Skip images we can't decompress
            }
          }
        }
      }

      if (found.length > 0) {
        setExtractedImages(found);
        toast({ title: "Done", description: `Found ${found.length} image(s). Click each to download.` });
      } else {
        toast({ title: "No images found", description: "This PDF contains no embedded raster images (or they use an unsupported format)." });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to extract images", variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  }, [files, toast]);

  const downloadImage = (img: ExtractedImage) => {
    const a = document.createElement("a");
    a.href = img.dataUrl;
    a.download = img.name;
    a.click();
  };

  const downloadAllImages = () => {
    extractedImages.forEach((img) => downloadImage(img));
  };

  // ─── Tool definitions ─────────────────────────────────────────────────────────

  const tools = [
    { id: "merge", title: "Merge PDFs", icon: Merge, description: "Combine multiple PDFs into one", action: mergePdfs, minFiles: 2 },
    { id: "split", title: "Split PDF", icon: Split, description: "Split pages into separate files", action: splitPdf, minFiles: 1, maxFiles: 1 },
    { id: "rotate", title: "Rotate PDF", icon: RotateCw, description: "Rotate all pages by any angle", action: rotatePdf, minFiles: 1, maxFiles: 1 },
    { id: "compress", title: "Compress PDF", icon: Minimize2, description: "Reduce PDF file size", action: compressPdf, minFiles: 1, maxFiles: 1 },
    { id: "extract-text", title: "Extract Text", icon: FileX, description: "Pull all text content from PDF", action: extractText, minFiles: 1, maxFiles: 1 },
    { id: "extract-images", title: "Extract Images", icon: ImageIcon, description: "Download embedded images", action: extractImages, minFiles: 1, maxFiles: 1 },
  ];

  const activeTool = tools.find((t) => t.id === activeTab) ?? tools[0];

  const canProcess = (tool: (typeof tools)[0]) => {
    if (files.length === 0) return false;
    if (tool.minFiles && files.length < tool.minFiles) return false;
    if (tool.maxFiles && files.length > tool.maxFiles) return false;
    return true;
  };

  return (
    <>
      <SEOHead config={seoConfig} />
      <ToolLayout>
        <div className="container mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-3">PDF Tools Suite</h1>
              <p className="text-lg text-muted-foreground">Merge, Split, Rotate, Compress, Extract — all in your browser</p>
            </div>

            {/* Tool selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Card
                    key={tool.id}
                    onClick={() => setActiveTab(tool.id)}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${activeTab === tool.id ? "ring-2 ring-primary bg-primary/5" : ""}`}
                  >
                    <CardHeader className="p-3 text-center">
                      <Icon className={`h-6 w-6 mx-auto mb-1 ${activeTab === tool.id ? "text-primary" : "text-muted-foreground"}`} />
                      <CardTitle className="text-xs font-medium">{tool.title}</CardTitle>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            {/* Tool-specific options */}
            {activeTab === "rotate" && (
              <Card className="mb-4">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium whitespace-nowrap">Rotation angle:</label>
                    <Select value={String(rotationAngle)} onValueChange={(v) => setRotationAngle(Number(v))}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90">90° clockwise</SelectItem>
                        <SelectItem value="180">180°</SelectItem>
                        <SelectItem value="270">270° (90° counter-clockwise)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "split" && (
              <Card className="mb-4">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium whitespace-nowrap">Page range (optional):</label>
                    <input
                      type="text"
                      placeholder="e.g. 1-3,5,7-9 — leave blank for all pages"
                      value={splitPageRange}
                      onChange={(e) => setSplitPageRange(e.target.value)}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Each selected page downloads as a separate PDF file.</p>
                </CardContent>
              </Card>
            )}

            {activeTab === "compress" && (
              <Card className="mb-4">
                <CardContent className="pt-4 pb-4">
                  <p className="text-sm text-muted-foreground">
                    Compression strips metadata and optimises object streams using pdf-lib. For PDFs with large embedded images, the reduction may be modest — the biggest gains come from PDFs with redundant metadata or unoptimised structure.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Upload area */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  {activeTab === "merge" ? "Upload PDF Files (2 or more)" : "Upload a PDF File"}
                </CardTitle>
                <CardDescription>{activeTool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors mb-6 ${dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                >
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground mb-1">Click to choose or drag & drop PDF files here</p>
                  <p className="text-xs text-muted-foreground">Max {MAX_FILE_SIZE_MB}MB per file • PDF only</p>
                  <input ref={fileInputRef} type="file" multiple accept=".pdf,application/pdf" onChange={handleFileSelect} className="hidden" />
                </div>

                {files.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Selected files ({files.length})</span>
                      <Button variant="ghost" size="sm" onClick={clearAll} className="text-destructive hover:text-destructive h-7">
                        <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear all
                      </Button>
                    </div>
                    {files.map((file, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg bg-muted/40">
                        <div className="flex items-center gap-3 min-w-0">
                          <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => removeFile(i)} className="text-destructive hover:text-destructive flex-shrink-0">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-center">
                  <Button
                    onClick={() => canProcess(activeTool) && activeTool.action()}
                    disabled={processing || !canProcess(activeTool)}
                    size="lg"
                    className="min-w-[200px]"
                  >
                    {processing ? (
                      <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />Processing…</>
                    ) : (
                      `${activeTool.title}`
                    )}
                  </Button>
                </div>

                {!canProcess(activeTool) && files.length > 0 && activeTab === "merge" && (
                  <p className="text-center text-xs text-muted-foreground mt-2">Add at least one more PDF file to merge</p>
                )}
              </CardContent>
            </Card>

            {/* Extracted text output */}
            {extractedText && (
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Extracted Text</CardTitle>
                    <Button size="sm" variant="outline" onClick={downloadText}>
                      <Download className="h-4 w-4 mr-1" /> Download .txt
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea value={extractedText} readOnly className="h-64 font-mono text-xs" />
                </CardContent>
              </Card>
            )}

            {/* Extracted images output */}
            {extractedImages.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Extracted Images ({extractedImages.length})</CardTitle>
                    <Button size="sm" variant="outline" onClick={downloadAllImages}>
                      <Download className="h-4 w-4 mr-1" /> Download All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {extractedImages.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => downloadImage(img)}
                        className="border rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors group"
                        title={`Click to download ${img.name}`}
                      >
                        <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                          <img
                            src={img.dataUrl}
                            alt={img.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="p-2 text-center">
                          <p className="text-xs font-medium truncate">{img.name}</p>
                          <p className="text-xs text-muted-foreground">{img.width}×{img.height} · {img.format.toUpperCase()}</p>
                          <p className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">Click to download</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <ToolExplanation
              title="PDF Tools Suite"
              description="Toolzaply's PDF Tools Suite runs entirely in your browser — your files are never uploaded to any server. Merge multiple PDFs into one, split pages out, rotate mis-oriented scans, compress for email, extract real text content, or pull embedded images directly from any PDF document."
              howToUse={[
                "Click one of the six tool tabs (Merge, Split, Rotate, Compress, Extract Text, Extract Images) to select your operation.",
                "Drag & drop your PDF file(s) into the upload area, or click to browse.",
                "For Merge: upload 2 or more PDFs. For all other tools: upload exactly 1 PDF.",
                "Configure any tool-specific options (rotation angle, page range, etc.) that appear below the tool tabs.",
                "Click the action button. Your processed file downloads automatically.",
              ]}
              features={[
                "Merge: combine unlimited PDFs preserving page order.",
                "Split: extract all pages or a custom range (e.g. '1-3, 5, 7-9') as individual files.",
                "Rotate: rotate all pages by 90°, 180°, or 270° — respects existing page rotation.",
                "Compress: strips metadata and optimises object streams to reduce file size.",
                "Extract Text: uses pdfjs-dist to accurately read all selectable text, page by page.",
                "Extract Images: finds and downloads JPEG, JPEG2000, and raw pixel images embedded in the PDF.",
                "100% client-side — nothing leaves your device.",
              ]}
              faqs={[
                { question: "Why does my PDF produce no extracted text?", answer: "Scanned PDFs contain images of text, not actual text characters. Only PDFs with selectable text (created digitally, not scanned) will yield results from Extract Text." },
                { question: "What image formats can be extracted?", answer: "JPEG (DCTDecode), JPEG2000 (JPXDecode), and raw/FlateDecode pixel data are supported. Vector graphics (SVG/paths drawn in PDF) are not raster images and cannot be extracted." },
                { question: "Why is the compressed file the same size or larger?", answer: "pdf-lib's compression works on PDF structure (metadata, object streams). If the PDF was already structurally optimised, or its size is mostly large images, structural compression has little effect." },
                { question: "Are my files uploaded anywhere?", answer: "No. All processing uses JavaScript running locally in your tab. Your PDFs never leave your device." },
              ]}
            />
          </motion.div>
        </div>
      </ToolLayout>
    </>
  );
}
