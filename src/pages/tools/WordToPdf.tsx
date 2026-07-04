import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  CheckCircle,
  AlertCircle,
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

interface ConvertedDoc {
  name: string;
  originalSize: number;
  html: string;
  messages: string[];
}

function formatSize(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(1) + " " + ["B", "KB", "MB", "GB"][i];
}

export default function WordToPdf() {
  const seoConfig = getSEOConfig("word-to-pdf");
  const [doc, setDoc] = useState<ConvertedDoc | null>(null);
  const [converting, setConverting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const convertFile = useCallback(async (file: File) => {
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

    setConverting(true);
    setDoc(null);

    try {
      // Dynamically import mammoth to keep initial bundle small
      const mammoth = await import("mammoth");
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml(
        { arrayBuffer },
        {
          styleMap: [
            "p[style-name='Heading 1'] => h1:fresh",
            "p[style-name='Heading 2'] => h2:fresh",
            "p[style-name='Heading 3'] => h3:fresh",
            "p[style-name='Heading 4'] => h4:fresh",
            "p[style-name='Title'] => h1.doc-title:fresh",
            "p[style-name='Subtitle'] => p.doc-subtitle:fresh",
            "b => strong",
            "i => em",
            "u => u",
            "strike => s",
            "r[style-name='Strong'] => strong",
          ],
        }
      );

      const warnings = result.messages
        .filter((m) => m.type === "warning")
        .map((m) => m.message);

      setDoc({
        name: file.name.replace(/\.docx$/i, ""),
        originalSize: file.size,
        html: result.value,
        messages: warnings,
      });

      toast({ title: "Converted successfully", description: `${file.name} is ready for download.` });
    } catch (err) {
      console.error(err);
      toast({
        title: "Conversion failed",
        description: "Could not parse the document. Make sure it's a valid .docx file.",
        variant: "destructive",
      });
    } finally {
      setConverting(false);
    }
  }, [toast]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) convertFile(file);
    },
    [convertFile]
  );

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) convertFile(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const downloadPdf = async () => {
    if (!doc || !previewRef.current) return;
    setExporting(true);

    try {
      const A4_WIDTH_PX = 794;   // A4 at 96 dpi
      const A4_HEIGHT_PX = 1123;

      const element = previewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: A4_WIDTH_PX,
        windowWidth: A4_WIDTH_PX,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // A4 in mm: 210 x 297
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // How many mm per pixel
      const ratio = pdfWidth / imgWidth;
      const totalPdfHeight = imgHeight * ratio;
      let yOffset = 0;

      while (yOffset < totalPdfHeight) {
        if (yOffset > 0) pdf.addPage();

        // Calculate pixel slice for this page
        const sliceHeightPx = Math.min(
          (pdfHeight / ratio),
          imgHeight - yOffset / ratio
        );

        // Create a temporary canvas for this slice
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = imgWidth;
        pageCanvas.height = Math.ceil(sliceHeightPx);
        const ctx = pageCanvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(
          canvas,
          0, Math.round(yOffset / ratio),
          imgWidth, Math.ceil(sliceHeightPx),
          0, 0,
          imgWidth, Math.ceil(sliceHeightPx)
        );

        const pageImg = pageCanvas.toDataURL("image/jpeg", 0.95);
        pdf.addImage(pageImg, "JPEG", 0, 0, pdfWidth, pageCanvas.height * ratio);

        yOffset += pdfHeight;
      }

      pdf.save(`${doc.name}.pdf`);
      toast({ title: "PDF downloaded!", description: `${doc.name}.pdf saved to your device.` });
    } catch (err) {
      console.error(err);
      toast({ title: "Export failed", description: "Could not generate PDF.", variant: "destructive" });
    } finally {
      setExporting(false);
    }
  };

  const reset = () => {
    setDoc(null);
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
              Convert your .docx Word documents to PDF instantly — 100% in your browser.
              Your files never leave your device.
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

                  {converting ? (
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="h-12 w-12 text-primary animate-spin" />
                      <p className="text-lg font-medium text-foreground">Converting document…</p>
                      <p className="text-sm text-muted-foreground">This may take a moment for large files</p>
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
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-500" /> .docx files
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-500" /> Up to 50 MB
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-500" /> 100% private
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Result Panel */}
          {doc && (
            <div className="space-y-4">
              {/* File info bar */}
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
                          {formatSize(doc.originalSize)} · Converted to PDF
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                        Ready
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPreview((v) => !v)}
                      >
                        {showPreview ? (
                          <><EyeOff className="h-4 w-4 mr-1" /> Hide Preview</>
                        ) : (
                          <><Eye className="h-4 w-4 mr-1" /> Show Preview</>
                        )}
                      </Button>
                      <Button
                        onClick={downloadPdf}
                        disabled={exporting}
                        className="gap-2"
                      >
                        {exporting ? (
                          <><Loader2 className="h-4 w-4 animate-spin" /> Generating PDF…</>
                        ) : (
                          <><Download className="h-4 w-4" /> Download PDF</>
                        )}
                      </Button>
                      <Button variant="outline" size="sm" onClick={reset}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Warnings */}
              {doc.messages.length > 0 && (
                <Card className="border-yellow-400/40 bg-yellow-50/30 dark:bg-yellow-950/20">
                  <CardContent className="py-3 px-4">
                    <div className="flex items-start gap-2 text-sm text-yellow-700 dark:text-yellow-400">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium mb-1">Some formatting may not be fully preserved:</p>
                        <ul className="list-disc list-inside space-y-0.5 text-xs opacity-80">
                          {doc.messages.slice(0, 5).map((m, i) => <li key={i}>{m}</li>)}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Document Preview */}
              {showPreview && (
                <Card className="border-border/50 overflow-hidden">
                  <CardHeader className="py-3 px-4 bg-muted/40 border-b">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Eye className="h-4 w-4" /> Document Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 overflow-auto max-h-[700px]">
                    <div
                      ref={previewRef}
                      className="word-preview"
                      dangerouslySetInnerHTML={{ __html: doc.html }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Another file button */}
              <div className="text-center">
                <Button variant="outline" onClick={reset}>
                  <Upload className="h-4 w-4 mr-2" /> Convert Another Document
                </Button>
              </div>
            </div>
          )}

          {/* How it works */}
          {!doc && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  step: "1",
                  title: "Upload .docx",
                  desc: "Drag & drop or click to select your Word document",
                },
                {
                  step: "2",
                  title: "Preview",
                  desc: "See how your document looks before downloading",
                },
                {
                  step: "3",
                  title: "Download PDF",
                  desc: "Get a perfectly formatted PDF in seconds",
                },
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
            description="Convert Microsoft Word documents (.docx) to PDF format instantly in your browser. No software installation required, no file uploads, complete privacy."
            howToUse={[
              "Click the upload area or drag and drop your .docx file",
              "Wait a moment while the document is parsed in your browser",
              "Review the document preview to check formatting",
              "Click 'Download PDF' to save the converted file",
              "Upload another document with the 'Convert Another' button",
            ]}
            features={[
              "Convert .docx files to PDF with formatting preserved",
              "Live document preview before downloading",
              "Tables, headings, bold, italic, and lists all supported",
              "100% browser-based — your documents never leave your device",
              "Multi-page PDF output with proper pagination",
              "Completely free, up to 50 MB per file",
            ]}
            faqs={[
              {
                question: "Does it support .doc files?",
                answer: "Only .docx (modern Word format) is supported. For old .doc files, open them in Word or Google Docs and re-save as .docx first.",
              },
              {
                question: "Will the formatting be preserved?",
                answer: "Yes — headings, bold, italic, underline, lists, tables, and links are all preserved. Complex elements like SmartArt or embedded charts may not render perfectly.",
              },
              {
                question: "Is my document safe?",
                answer: "Absolutely. Your file never leaves your device. All conversion happens locally in your browser using JavaScript.",
              },
              {
                question: "What is the maximum file size?",
                answer: "You can convert documents up to 50 MB. Most typical Word documents are well under this limit.",
              },
            ]}
          />

          <ToolGuide id="word-to-pdf" />
        </motion.div>

        {/* Global word-preview styles injected via a style tag */}
        <style>{`
          .word-preview {
            max-width: 794px;
            margin: 0 auto;
            padding: 60px 80px;
            background: #fff;
            color: #111;
            font-family: "Times New Roman", Times, serif;
            font-size: 12pt;
            line-height: 1.6;
            min-height: 400px;
          }
          .word-preview h1 { font-size: 24pt; font-weight: bold; margin: 16pt 0 8pt; }
          .word-preview h2 { font-size: 18pt; font-weight: bold; margin: 14pt 0 6pt; }
          .word-preview h3 { font-size: 14pt; font-weight: bold; margin: 12pt 0 4pt; }
          .word-preview h4 { font-size: 12pt; font-weight: bold; margin: 10pt 0 4pt; }
          .word-preview p { margin: 0 0 8pt; }
          .word-preview ul, .word-preview ol { margin: 4pt 0 8pt 24pt; }
          .word-preview li { margin-bottom: 4pt; }
          .word-preview table { border-collapse: collapse; width: 100%; margin: 12pt 0; }
          .word-preview td, .word-preview th { border: 1px solid #999; padding: 6px 10px; }
          .word-preview th { background: #f0f0f0; font-weight: bold; }
          .word-preview strong { font-weight: bold; }
          .word-preview em { font-style: italic; }
          .word-preview u { text-decoration: underline; }
          .word-preview s { text-decoration: line-through; }
          .word-preview a { color: #1155cc; }
          .word-preview img { max-width: 100%; height: auto; }
          .word-preview .doc-title { font-size: 28pt; font-weight: bold; text-align: center; }
          .word-preview .doc-subtitle { font-size: 14pt; color: #555; text-align: center; }
        `}</style>
      </ToolLayout>
    </>
  );
}
