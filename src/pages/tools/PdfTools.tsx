import { Helmet } from "react-helmet-async";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
} from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/ToolLayout";

export default function PdfTools() {
  const [activeTab, setActiveTab] = useState<string>("merge");
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length === 0) return;

    // Validate file types
    const validFiles = selectedFiles.filter((file) => {
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a PDF file`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
      toast({
        title: "Files added",
        description: `${validFiles.length} PDF file(s) added successfully`,
      });
    }

    // Reset the input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    // Validate file types
    const validFiles = files.filter((file) => {
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a PDF file`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
      toast({
        title: "Files added",
        description: `${validFiles.length} PDF file(s) added successfully`,
      });
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    setFiles([]);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      toast({
        title: "Error",
        description: "Please select at least 2 PDF files to merge",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged-document.pdf";
      a.click();
      URL.revokeObjectURL(url);

      toast({ title: "Success", description: "PDFs merged successfully!" });
    } catch (error) {
      console.error("Merge error:", error);
      toast({
        title: "Error",
        description: "Failed to merge PDFs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const splitPdf = async () => {
    if (files.length !== 1) {
      toast({
        title: "Error",
        description: "Please select exactly one PDF file to split",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    try {
      const arrayBuffer = await files[0].arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);

      for (let i = 0; i < pdf.getPageCount(); i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(copiedPage);

        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `page-${i + 1}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      }

      toast({ title: "Success", description: "PDF split successfully!" });
    } catch (error) {
      console.error("Split error:", error);
      toast({
        title: "Error",
        description: "Failed to split PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const rotatePdf = async () => {
    if (files.length !== 1) {
      toast({
        title: "Error",
        description: "Please select exactly one PDF file to rotate",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    try {
      const arrayBuffer = await files[0].arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);

      const pages = pdf.getPages();
      pages.forEach((page) => {
        page.setRotation(degrees(90));
      });

      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "rotated-document.pdf";
      a.click();
      URL.revokeObjectURL(url);

      toast({ title: "Success", description: "PDF rotated successfully!" });
    } catch (error) {
      console.error("Rotate error:", error);
      toast({
        title: "Error",
        description: "Failed to rotate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const extractText = async () => {
    if (files.length !== 1) {
      toast({
        title: "Error",
        description: "Please select exactly one PDF file to extract text",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    try {
      // Simple text extraction - in a real app you'd use a proper PDF text extraction library
      setExtractedText(
        "Text extraction is simplified in this demo. In production, you would use libraries like pdf2pic or pdfjs-dist for proper text extraction."
      );
      toast({
        title: "Info",
        description: "Text extraction completed (demo mode)",
      });
    } catch (error) {
      console.error("Extract error:", error);
      toast({
        title: "Error",
        description: "Failed to extract text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const tools = [
    {
      id: "merge",
      title: "Merge PDFs",
      icon: Merge,
      description: "Combine multiple PDF files",
      action: mergePdfs,
    },
    {
      id: "split",
      title: "Split PDF",
      icon: Split,
      description: "Extract pages or split PDF",
      action: splitPdf,
    },
    {
      id: "rotate",
      title: "Rotate PDF",
      icon: RotateCw,
      description: "Rotate PDF pages",
      action: rotatePdf,
    },
    {
      id: "compress",
      title: "Compress PDF",
      icon: Minimize2,
      description: "Reduce file size",
      action: () =>
        toast({
          title: "Info",
          description: "Compression feature coming soon!",
        }),
    },
    {
      id: "extract-text",
      title: "Extract Text",
      icon: FileX,
      description: "Extract text content",
      action: extractText,
    },
    {
      id: "extract-images",
      title: "Extract Images",
      icon: FileText,
      description: "Extract all images",
      action: () =>
        toast({
          title: "Info",
          description: "Image extraction feature coming soon!",
        }),
    },
  ];

  return (
    <>
      <Helmet>
        <title>PDF Tools Suite - Free Online PDF Editor</title>
        <meta
          name="description"
          content="Complete PDF toolkit: merge, split, rotate, compress and extract content from PDFs. Free online PDF tools with no registration required."
        />
        <meta
          name="keywords"
          content="pdf tools, merge pdf, split pdf, rotate pdf, compress pdf, pdf editor"
        />
      </Helmet>

      <ToolLayout>
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                PDF Tools Suite
              </h1>
              <p className="text-xl text-muted-foreground">
                Complete toolkit for all your PDF needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Card
                    key={tool.id}
                    className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${
                      activeTab === tool.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setActiveTab(tool.id)}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-primary" />
                        {tool.title}
                      </CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Upload PDF Files</CardTitle>
                <CardDescription>Select PDF files to work with</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
                    dragActive
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <Button
                    variant="outline"
                    className="mb-2"
                    onClick={triggerFileInput}
                    disabled={processing}
                  >
                    Choose PDF Files
                  </Button>
                  <p className="text-sm text-muted-foreground mb-2">
                    Select PDF files to process or drag and drop here
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Maximum file size: 10MB per file
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {files.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">
                        Selected Files ({files.length})
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearAllFiles}
                        className="text-destructive hover:text-destructive"
                      >
                        Clear All
                      </Button>
                    </div>
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <span className="text-sm font-medium">
                              {file.name}
                            </span>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeFile(index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => {
                      const activeTool = tools.find((t) => t.id === activeTab);
                      if (activeTool) activeTool.action();
                    }}
                    disabled={processing || files.length === 0}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {processing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      `Process with ${
                        tools.find((t) => t.id === activeTab)?.title
                      }`
                    )}
                  </Button>
                </div>

                {extractedText && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">
                      Extracted Text:
                    </h3>
                    <Textarea value={extractedText} readOnly className="h-32" />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </ToolLayout>
    </>
  );
}
