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
  Loader2,
  Eye,
  EyeOff,
  Printer,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/ToolLayout";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";
import { ToolExplanation } from "@/components/ToolExplanation";
import { ToolGuide } from "@/components/ToolGuide";

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
  const [showPreview, setShowPreview] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Render DOCX into the preview container using docx-preview
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

      // Give React a tick to render the container before we fill it
      await new Promise((r) => setTimeout(r, 50));
      await renderDocx(arrayBuffer);

      toast({ title: "Document ready", description: `${file.name} rendered successfully.` });
    } catch (err) {
      console.error(err);
      toast({
        title: "Conversion failed",
        description: "Could not parse the document. Make sure it's a valid .docx file.",
        variant: "destructive",
      });
      setDoc(null);
    } finally {
      setLoading(false);
    }
  }, [renderDocx, toast]);

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

  // Print-to-PDF: opens a new window with just the rendered content and triggers print
  const printToPdf = useCallback(() => {
    if (!previewContainerRef.current) return;

    const previewHtml = previewContainerRef.current.innerHTML;

    // Collect all docx-preview stylesheets from the current page
    const styleSheets = Array.from(document.styleSheets)
      .map((sheet) => {
        try {
          return Array.from(sheet.cssRules)
            .map((rule) => rule.cssText)
            .join("\n");
        } catch {
          return "";
        }
      })
      .join("\n");

    const win = window.open("", "_blank");
    if (!win) {
      toast({
        title: "Popup blocked",
        description: "Please allow popups for this site, then try again.",
        variant: "destructive",
      });
      return;
    }

    win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>${doc?.name ?? "document"}</title>
  <style>
    ${styleSheets}

    * { box-sizing: border-box; }

    body {
      margin: 0;
      padding: 0;
      background: #fff;
    }

    /* Ensure docx-preview pages render at full width */
    .docx-preview section.docx {
      box-shadow: none !important;
      margin: 0 auto !important;
    }

    @media print {
      body { margin: 0; padding: 0; }
      @page { margin: 0; }
    }
  </style>
</head>
<body>
  <div class="docx-preview">${previewHtml}</div>
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
        window.close();
      }, 600);
    };
  </script>
</body>
</html>`);
    win.document.close();
  }, [doc, toast]);

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
              Convert your .docx Word documents to PDF — colors, alignment, tables, and
              formatting preserved. 100% browser-based, your files never leave your device.
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
                      <p className="text-sm text-muted-foreground">Preserving all colors and formatting</p>
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
                          <CheckCircle className="h-4 w-4 text-green-500" /> 100% private
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
                    >
                      {showPreview ? (
                        <><EyeOff className="h-4 w-4 mr-1" /> Hide Preview</>
                      ) : (
                        <><Eye className="h-4 w-4 mr-1" /> Show Preview</>
                      )}
                    </Button>
                    <Button onClick={printToPdf} className="gap-2">
                      <Printer className="h-4 w-4" />
                      Save as PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={reset}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* How to save as PDF tip — shown once doc is ready */}
          {doc && (
            <Card className="border-blue-400/30 bg-blue-50/30 dark:bg-blue-950/20">
              <CardContent className="py-3 px-4 text-sm text-blue-700 dark:text-blue-400">
                <strong>How to save as PDF:</strong> Click <em>"Save as PDF"</em> above → a print dialog will open →
                set the <strong>Destination</strong> to <strong>"Save as PDF"</strong> → click Save.
                This uses your browser's native PDF engine for pixel-perfect output.
              </CardContent>
            </Card>
          )}

          {/* Document Preview — always mounted so the ref is available */}
          <div className={doc && showPreview ? "block" : "hidden"}>
            <Card className="border-border/50 overflow-hidden">
              <CardHeader className="py-3 px-4 bg-muted/40 border-b">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Eye className="h-4 w-4" /> Document Preview
                  <span className="text-xs opacity-60 ml-2">Scroll to see all pages</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-auto max-h-[800px] bg-gray-100">
                <div ref={previewContainerRef} className="docx-wrapper" />
              </CardContent>
            </Card>
          </div>

          {/* Another file button */}
          {doc && (
            <div className="text-center">
              <Button variant="outline" onClick={reset}>
                <Upload className="h-4 w-4 mr-2" /> Convert Another Document
              </Button>
            </div>
          )}

          {/* Steps — only shown before upload */}
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
                  desc: "See your document exactly as it appears in Word — colors and all",
                },
                {
                  step: "3",
                  title: "Save as PDF",
                  desc: "Click 'Save as PDF' and choose PDF in the print dialog",
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
            description="Convert Microsoft Word documents (.docx) to PDF format with full fidelity — colors, fonts, alignment, tables, images, and headers all preserved exactly as they appear in Word."
            howToUse={[
              "Click the upload area or drag and drop your .docx file",
              "Wait while the document renders — you'll see it exactly as Word shows it",
              "Review the preview to confirm colors, alignment, and layout look correct",
              "Click 'Save as PDF' to open the print dialog",
              "In the print dialog, set Destination to 'Save as PDF' and click Save",
            ]}
            features={[
              "Full color preservation — text colors, highlights, table cell shading",
              "Exact alignment — centered, right-aligned, justified text all preserved",
              "Tables with borders, merged cells, and background colors",
              "Images, headers, footers, and page breaks preserved",
              "100% browser-based — your documents never leave your device",
              "Completely free, supports documents up to 50 MB",
            ]}
            faqs={[
              {
                question: "Why use 'Save as PDF' in print instead of a direct download?",
                answer: "The browser's built-in PDF printer produces pixel-perfect output because it uses the same rendering engine that draws the preview. This gives you the highest possible fidelity — exactly what you see on screen ends up in the PDF.",
              },
              {
                question: "Does it support .doc files?",
                answer: "Only .docx (modern Word format) is supported. For old .doc files, open them in Word or Google Docs and re-save as .docx first.",
              },
              {
                question: "Will colors and formatting be preserved?",
                answer: "Yes. Unlike simple text converters, this tool renders the full Word XML including text colors, cell shading, alignment, font sizes, and images.",
              },
              {
                question: "Is my document safe?",
                answer: "Absolutely. Your file never leaves your device. All conversion happens locally in your browser using JavaScript.",
              },
            ]}
          />

          <ToolGuide id="word-to-pdf" />
        </motion.div>
      </ToolLayout>
    </>
  );
}
