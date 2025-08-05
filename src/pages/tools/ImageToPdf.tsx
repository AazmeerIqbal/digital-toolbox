import { Helmet } from "react-helmet-async";
import { ToolLayout } from "@/components/ToolLayout";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileImage, Trash2, AlertCircle } from "lucide-react";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";

export default function ImageToPdf() {
  const [images, setImages] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log(
      "ImageToPdf component mounted, fileInputRef:",
      fileInputRef.current
    );
  }, []);

  useEffect(() => {
    if (fileInputRef.current) {
      console.log("File input ref is now available");
    }
  }, [fileInputRef.current]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    console.log("File input triggered, files selected:", files.length);
    if (files.length === 0) return;

    // Validate file types
    const validFiles = files.filter((file) => {
      console.log("Checking file:", file.name, "Type:", file.type);
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setImages((prev) => [...prev, ...validFiles]);
      toast({
        title: "Files added",
        description: `${validFiles.length} image(s) added successfully`,
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
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setImages((prev) => [...prev, ...validFiles]);
      toast({
        title: "Files added",
        description: `${validFiles.length} image(s) added successfully`,
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAllImages = () => {
    setImages([]);
  };

  const convertToPdf = async () => {
    if (images.length === 0) {
      toast({
        title: "No images selected",
        description: "Please select at least one image to convert",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    try {
      const pdf = new jsPDF();
      let isFirstPage = true;

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imageUrl = URL.createObjectURL(image);
        const img = new Image();

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = () =>
            reject(new Error(`Failed to load image: ${image.name}`));
          img.src = imageUrl;
        });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          throw new Error("Failed to get canvas context");
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = canvas.toDataURL("image/jpeg", 0.95);

        if (!isFirstPage) {
          pdf.addPage();
        }

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const aspectRatio = img.width / img.height;

        let width = pdfWidth - 20;
        let height = width / aspectRatio;

        if (height > pdfHeight - 20) {
          height = pdfHeight - 20;
          width = height * aspectRatio;
        }

        const x = (pdfWidth - width) / 2;
        const y = (pdfHeight - height) / 2;

        pdf.addImage(imgData, "JPEG", x, y, width, height);
        URL.revokeObjectURL(imageUrl);
        isFirstPage = false;
      }

      pdf.save("converted-images.pdf");
      toast({
        title: "Success",
        description: "PDF created successfully!",
      });
    } catch (error) {
      console.error("Error converting to PDF:", error);
      toast({
        title: "Error",
        description: "Failed to convert images to PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const triggerFileInput = () => {
    console.log("Trigger file input clicked");
    if (fileInputRef.current) {
      console.log("File input ref found, triggering click");
      try {
        fileInputRef.current.click();
      } catch (error) {
        console.error("Error triggering file input:", error);
        // Fallback: try to create a temporary file input
        const tempInput = document.createElement("input");
        tempInput.type = "file";
        tempInput.multiple = true;
        tempInput.accept = "image/*";
        tempInput.onchange = (e) => {
          const target = e.target as HTMLInputElement;
          if (target.files) {
            handleFileSelect({ target } as React.ChangeEvent<HTMLInputElement>);
          }
        };
        tempInput.click();
      }
    } else {
      console.log("File input ref not found");
      // Fallback: try to create a temporary file input
      const tempInput = document.createElement("input");
      tempInput.type = "file";
      tempInput.multiple = true;
      tempInput.accept = "image/*";
      tempInput.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        if (target.files) {
          handleFileSelect({ target } as React.ChangeEvent<HTMLInputElement>);
        }
      };
      tempInput.click();
    }
  };

  return (
    <>
      <Helmet>
        <title>Image to PDF Converter - Free Online Tool</title>
        <meta
          name="description"
          content="Convert multiple images to PDF online for free. No registration required. Fast, secure, and easy to use image to PDF converter."
        />
        <meta
          name="keywords"
          content="image to pdf, convert images, pdf converter, free tool, online converter"
        />
      </Helmet>

      <ToolLayout>
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Image to PDF Converter
              </h1>
              <p className="text-xl text-muted-foreground">
                Convert multiple images into a single PDF document
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileImage className="h-5 w-5" />
                  Upload Images
                </CardTitle>
                <CardDescription>
                  Select multiple images to convert to PDF. Supported formats:
                  JPG, PNG, GIF, BMP, WebP
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
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
                    Choose Images
                  </Button>
                  <p className="text-sm text-muted-foreground mb-2">
                    or drag and drop images here
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Maximum file size: 10MB per image
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>

            {images.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Selected Images ({images.length})</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllImages}
                      className="text-destructive hover:text-destructive"
                    >
                      Clear All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <p className="text-xs text-center mt-1 truncate">
                          {image.name}
                        </p>
                        <p className="text-xs text-center text-muted-foreground">
                          {(image.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={convertToPdf}
                      disabled={processing}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {processing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Converting...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Convert to PDF
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </ToolLayout>
    </>
  );
}
