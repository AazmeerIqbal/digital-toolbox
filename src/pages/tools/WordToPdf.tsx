import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  CheckCircle,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/ToolLayout";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";
import { ToolExplanation } from "@/components/ToolExplanation";
import { ToolGuide } from "@/components/ToolGuide";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface DocInfo {
  name: string;
  originalSize: number;
  arrayBuffer: ArrayBuffer;
}

function formatSize(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(1) + " " + ["B", "KB", "MB", "GB"][i];
}

export default function WordToPdf() {
  const seoConfig = getSEOConfig("word-to-pdf");
  const [doc, setDoc] = useState<DocInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const renderDocx = useCallback(async (arrayBuffer: ArrayBuffer) => {
    if (!previewContainerRef.current) return;
    const { renderAsync } = await import("docx-preview");
    previewContainerRef.current.innerHTML = "";
    await renderAsync(arrayBuffer, previewContainerRef.current, undefined, {
      className: "docx-preview",
      injectStylesheet: true,
      ignoreWidth: false,
      ignoreHeight: false,
      ignoreFonts: false,
      breakPages: true,
      ignoreLastRenderedPageBreak: true,
      experimental: false,
      trimXmlDeclaration: true,
      useBase64URL: true,
      renderChanges: false,
      renderHeaders: true,
      renderFooters: true,
      renderFootnotes: true,
      renderEndnotes: true,
    });
  }, []);

  const processFile = useCallback(async (file: File) => {
    if (!file.name.toLowerCase().endsWith(".docx")) {
      toast({
        title: "Unsupported format",
        description: "Please upload a .docx file. Old .doc files are not supported.",
        variant: "destructive",
      });
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 50 MB.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setDoc(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const docInfo: DocInfo = {
        name: file.name.replace(/\.docx$/i, ""),
        originalSize: file.size,
        arrayBuffer,
      };
      setDoc(docInfo);
      // Let React render the container div before filling it
      await new Promise((r) => setTimeout(r, 80));
      await renderDocx(arrayBuffer);
      toast({ title: "Document ready", description: "Preview loaded — click Download PDF." });
    } catch (err) {
      console.error(err);
      toast({
        title: "Conversion failed",
        description: "Could not parse the file. Make sure it's a valid .docx document.",
        variant: "destructive",
      });
      setDoc(null);
    } finally {
      setLoading(false);
    }
  }, [renderDocx, toast]);

  const downloadPdf = useCallback(async () => {
    if (!previewContainerRef.current || !doc) return;

    // docx-preview renders each Word page as a <section class="docx"> element
    const pageSections = Array.from(
      previewContainerRef.current.querySelectorAll<HTMLElement>("section.docx")
    );

    // Fall back to capturing the whole container if sections aren't found
    const targets: HTMLElement[] =
      pageSections.length > 0
        ? pageSections
        : [previewContainerRef.current];

    setExporting(true);
    setExportProgress(0);

    try {
      const pdf = new jsPDF({
        unit: "pt",
        format: "a4",
        orientation: "portrait",
        compress: true,
      });

      const pdfW = pdf.internal.pageSize.getWidth();   // 595.28 pt
      const pdfH = pdf.internal.pageSize.getHeight();  // 841.89 pt

      for (let i = 0; i < targets.length; i++) {
        setExportProgress(Math.round(((i + 1) / targets.length) * 90));

        const el = targets[i];

        // Temporarily make element visible and positioned for capture
        const prevVisibility = el.style.visibility;
        el.style.visibility = "visible";

        const canvas = await html2canvas(el, {
          scale: 2,                 // retina quality
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: false,
          // Use scrollWidth/scrollHeight to capture full content
          width: el.scrollWidth,
          height: el.scrollHeight,
          windowWidth: el.scrollWidth,
        });

        el.style.visibility = prevVisibility;

        const imgData = canvas.toDataURL("image/jpeg", 0.92);
        const imgW = canvas.width;
        const imgH = canvas.height;

        // Scale the captured image to fit A4 width, preserving aspect ratio
        const scale = pdfW / imgW;
        const renderedH = imgH * scale;

        if (i > 0) pdf.addPage();

        // If the page content is taller than A4, split into sub-pages
        if (renderedH <= pdfH) {
          pdf.addImage(imgData, "JPEG", 0, 0, pdfW, renderedH);
        } else {
          // Content overflows one A4 page — slice it
          let yOffset = 0;
          let subPage = 0;
          while (yOffset < imgH) {
            if (subPage > 0) pdf.addPage();
            const sliceH = Math.min(pdfH / scale, imgH - yOffset);
            const sliceCanvas = document.createElement("canvas");
            sliceCanvas.width = imgW;
            sliceCanvas.height = Math.ceil(sliceH);
            const ctx = sliceCanvas.getContext("2d")!;
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
            ctx.drawImage(canvas, 0, yOffset, imgW, sliceH, 0, 0, imgW, sliceH);
            const sliceImg = sliceCanvas.toDataURL("image/jpeg", 0.92);
            pdf.addImage(sliceImg, "JPEG", 0, 0, pdfW, sliceH * scale);
            yOffset += sliceH;
            subPage++;
          }
        }
      }

      setExportProgress(100);
      pdf.save(`${doc.name}.pdf`);
      toast({ title: "PDF downloaded!", description: `${doc.name}.pdf saved successfully.` });
    } catch (err) {
      console.error(err);
      toast({ title: "Export failed", description: "Could not generate the PDF. Please try again.", variant: "destructive" });
    } finally {
      setExporting(false);
      setExportProgress(0);
    }
  }, [doc, toast]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const reset = () => {
    setDoc(null);
    if (previewContainerRef.current) previewContainerRef.current.innerHTML = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <SEOHead config={seoConfig} />
      <ToolLayout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <FileText className="h-10 w-10 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Word to PDF Converter
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Convert .docx files to PDF with colors, alignment, tables, and images fully
              preserved. No upload — runs entirely in your browser.
            </p>
          </div>

          {/* Upload Area */}
          {!doc && (
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div
                  className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer
                    ${dragActive
                      ? "border-primary bg-primary/5 scale-[1.01]"
                      : "border-border/60 hover:border-primary/50 hover:bg-muted/30"
                    }`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".docx"
                    onChange={handleSelect}
                    className="hidden"
                  />

                  {loading ? (
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="h-12 w-12 text-primary animate-spin" />
                      <p className="text-lg font-medium text-foreground">Rendering document…</p>
                      <p className="text-sm text-muted-foreground">Preserving colors, fonts, and formatting</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 rounded-full bg-primary/10">
                        <Upload className="h-10 w-10 text-primary" />
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-foreground mb-1">
                          Drop your Word document here
                        </p>
                        <p className="text-muted-foreground">
                          or <span className="text-primary font-medium">click to browse</span>
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-500" /> Colors preserved
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-500" /> Alignment preserved
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-500" /> Tables & images
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-500" /> Direct PDF download
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Result Controls */}
          {doc && (
            <Card className="border-green-500/30 bg-green-50/30 dark:bg-green-950/20">
              <CardContent className="py-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/40">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{doc.name}.docx</p>
                      <p className="text-sm text-muted-foreground">
                        {formatSize(doc.originalSize)} · Ready to export
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                      Rendered
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPreview((v) => !v)}
                      disabled={exporting}
                    >
                      {showPreview
                        ? <><EyeOff className="h-4 w-4 mr-1" /> Hide Preview</>
                        : <><Eye className="h-4 w-4 mr-1" /> Show Preview</>
                      }
                    </Button>
                    <Button onClick={downloadPdf} disabled={exporting} className="gap-2 min-w-[160px]">
                      {exporting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {exportProgress > 0 ? `${exportProgress}%…` : "Preparing…"}
                        </>
                      ) : (
                        <><Download className="h-4 w-4" /> Download PDF</>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" onClick={reset} disabled={exporting}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Progress bar */}
                {exporting && (
                  <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${exportProgress}%` }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Document Preview — always mounted so ref is available */}
          <div className={doc && showPreview ? "block" : "hidden"}>
            <Card className="border-border/50 overflow-hidden">
              <CardHeader className="py-3 px-4 bg-muted/40 border-b">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Eye className="h-4 w-4" /> Document Preview
                  <span className="text-xs opacity-60 ml-2">Scroll to see all pages</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-auto max-h-[800px] bg-gray-100 dark:bg-gray-900">
                <div ref={previewContainerRef} />
              </CardContent>
            </Card>
          </div>

          {/* Another file button */}
          {doc && (
            <div className="text-center">
              <Button variant="outline" onClick={reset} disabled={exporting}>
                <Upload className="h-4 w-4 mr-2" /> Convert Another Document
              </Button>
            </div>
          )}

          {/* How it works — shown before upload */}
          {!doc && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { step: "1", title: "Upload .docx", desc: "Drag & drop or click to select your Word document" },
                { step: "2", title: "Preview", desc: "See your document with full colors, fonts, and layout intact" },
                { step: "3", title: "Download PDF", desc: "Click Download PDF — no print dialog, direct file save" },
              ].map((s) => (
                <Card key={s.step} className="border-border/50 text-center">
                  <CardContent className="pt-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg flex items-center justify-center mx-auto mb-3">
                      {s.step}
                    </div>
                    <h3 className="font-semibold mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <ToolExplanation
            title="Word to PDF Converter"
            description="Convert Microsoft Word documents (.docx) to PDF format with full fidelity — colors, fonts, alignment, tables, images, and headers all preserved exactly as they appear in Word. No file upload needed."
            howToUse={[
              "Click the upload area or drag and drop your .docx file",
              "Wait while the document renders — you'll see it exactly as Word shows it",
              "Review the preview to confirm colors, alignment, and layout look correct",
              "Click 'Download PDF' — the file downloads directly, no dialogs",
            ]}
            features={[
              "Full color preservation — text colors, highlights, table cell shading",
              "Exact alignment — centered, right-aligned, and justified text all preserved",
              "Tables with borders, merged cells, and background colors",
              "Images, headers, footers, and page breaks preserved",
              "Direct PDF download — no print dialogs or popups",
              "100% browser-based — your documents never leave your device",
            ]}
            faqs={[
              {
                question: "Does it support .doc files?",
                answer: "Only .docx (modern Word format) is supported. For old .doc files, open them in Word or Google Docs and re-save as .docx first.",
              },
              {
                question: "Will colors and formatting be preserved?",
                answer: "Yes. This tool renders the full Word XML including text colors, cell shading, alignment, font sizes, and images — not just plain text.",
              },
              {
                question: "Why does the download take a moment for large documents?",
                answer: "The tool captures each page of your document as a high-resolution image and compiles them into a PDF. Larger documents with many pages or complex graphics take a few seconds to process.",
              },
              {
                question: "Is my document safe?",
                answer: "Absolutely. Your file never leaves your device. All conversion happens locally in your browser.",
              },
            ]}
          />

          <ToolGuide id="word-to-pdf" />
        </motion.div>
      </ToolLayout>
    </>
  );
}
