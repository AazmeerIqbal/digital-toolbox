import { ToolLayout } from "@/components/ToolLayout";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  Download, 
  FileImage, 
  Trash2, 
  AlertCircle, 
  CheckCircle,
  HelpCircle,
  Zap,
  Shield,
  Smartphone
} from "lucide-react";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";

export default function ImageToPdf() {
  const seoConfig = getSEOConfig("image-to-pdf");
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
    toast({
      title: "Image removed",
      description: "Image removed from the list",
    });
  };

  const clearAllImages = () => {
    setImages([]);
    toast({
      title: "All images cleared",
      description: "All images have been removed",
    });
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
    console.log("Starting PDF conversion with", images.length, "images");

    try {
      const pdf = new jsPDF();
      let isFirstPage = true;

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        console.log(`Processing image ${i + 1}:`, image.name);

        // Create image URL and load it
        const imageUrl = URL.createObjectURL(image);
        const img = new Image();

        await new Promise((resolve, reject) => {
          img.onload = () => {
            console.log(`Image ${i + 1} loaded:`, img.width, "x", img.height);

            try {
              // Calculate dimensions to fit the page
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = pdf.internal.pageSize.getHeight();
              const margin = 10;
              const maxWidth = pdfWidth - 2 * margin;
              const maxHeight = pdfHeight - 2 * margin;

              let width = img.width;
              let height = img.height;

              // Scale down if image is larger than page
              if (width > maxWidth || height > maxHeight) {
                const ratio = Math.min(maxWidth / width, maxHeight / height);
                width *= ratio;
                height *= ratio;
              }

              // Center the image on the page
              const x = (pdfWidth - width) / 2;
              const y = (pdfHeight - height) / 2;

              if (!isFirstPage) {
                pdf.addPage();
              }
              isFirstPage = false;

              pdf.addImage(imageUrl, "JPEG", x, y, width, height);
              console.log(`Image ${i + 1} added to PDF`);
              resolve(true);
            } catch (error) {
              console.error(`Error adding image ${i + 1} to PDF:`, error);
              reject(error);
            }
          };

          img.onerror = () => {
            console.error(`Failed to load image ${i + 1}:`, image.name);
            reject(new Error(`Failed to load image: ${image.name}`));
          };

          img.src = imageUrl;
        });

        // Clean up the object URL
        URL.revokeObjectURL(imageUrl);
      }

      // Save the PDF
      const filename = `images-to-pdf-${Date.now()}.pdf`;
      pdf.save(filename);
      console.log("PDF saved as:", filename);

      toast({
        title: "PDF created successfully!",
        description: `Your PDF with ${images.length} image(s) has been downloaded`,
      });
    } catch (error) {
      console.error("Error creating PDF:", error);
      toast({
        title: "Error creating PDF",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
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
      <SEOHead config={seoConfig} />

      <ToolLayout>
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Image to PDF Converter
              </h1>
              <p className="text-xl text-muted-foreground">
                Convert multiple images into a single PDF document instantly
              </p>
            </div>

            {/* Tool Interface */}
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

            {/* About This Tool */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>About Image to PDF Converter</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                  <p>
                    Our free Image to PDF Converter is a powerful online tool that allows you to combine 
                    multiple images into a single PDF document quickly and easily. Whether you're creating 
                    a photo album, compiling scanned documents, or organizing visual content, this tool 
                    makes the process effortless.
                  </p>
                  <p>
                    The converter supports all popular image formats including JPG, PNG, GIF, BMP, and WebP. 
                    You can upload multiple images at once, arrange them in your preferred order, and create 
                    a professional-looking PDF in seconds. The tool automatically optimizes image placement 
                    and sizing to ensure your PDF looks great on any device.
                  </p>
                  <p>
                    All processing happens directly in your browser, which means your images are never 
                    uploaded to our servers. This ensures complete privacy and security for your sensitive 
                    documents and photos. The conversion process is fast, efficient, and maintains the 
                    original quality of your images.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Why Choose Our Image to PDF Converter?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Lightning Fast</h3>
                      <p className="text-sm text-muted-foreground">
                        Convert multiple images to PDF in seconds with our optimized processing engine.
                      </p>
                    </div>
                    <div className="text-center">
                      <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">100% Secure</h3>
                      <p className="text-sm text-muted-foreground">
                        Your images never leave your device. All processing happens locally in your browser.
                      </p>
                    </div>
                    <div className="text-center">
                      <Smartphone className="h-8 w-8 text-primary mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Mobile Friendly</h3>
                      <p className="text-sm text-muted-foreground">
                        Works perfectly on all devices - desktop, tablet, and mobile phones.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* How to Use */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>How to Convert Images to PDF</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Upload Images</h4>
                        <p className="text-sm text-muted-foreground">
                          Click "Choose Images" or drag and drop your image files into the upload area. 
                          You can select multiple images at once.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Review and Arrange</h4>
                        <p className="text-sm text-muted-foreground">
                          Preview your selected images and remove any unwanted files. Images will appear 
                          in the PDF in the order they were selected.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Convert to PDF</h4>
                        <p className="text-sm text-muted-foreground">
                          Click "Convert to PDF" and your file will be automatically downloaded. 
                          The conversion happens instantly!
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    <AccordionItem value="item-1" className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left">
                        What image formats are supported?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Our tool supports all popular image formats including JPG, JPEG, PNG, GIF, BMP, 
                        and WebP. Most modern image formats will work seamlessly with our converter.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left">
                        Is there a limit to how many images I can convert?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        There's no strict limit on the number of images you can convert. However, for optimal 
                        performance, we recommend processing batches of 50 images or less at a time. Each 
                        image should be under 10MB in size.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left">
                        Are my images stored on your servers?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        No, absolutely not! All image processing happens directly in your browser. Your images 
                        never leave your device, ensuring complete privacy and security. We cannot see or 
                        access your files in any way.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4" className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left">
                        Can I control the order of images in the PDF?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes, images appear in the PDF in the order they were selected or uploaded. If you need 
                        to change the order, you can remove images and re-upload them in your preferred sequence.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5" className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left">
                        Will the image quality be preserved?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes, our converter maintains the original quality of your images. Images are automatically 
                        resized to fit the PDF page dimensions while preserving their aspect ratio and quality.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </ToolLayout>
    </>
  );
}
