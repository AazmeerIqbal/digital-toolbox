import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileImage, Trash2 } from "lucide-react";
import jsPDF from "jspdf";

export default function ImageToPdf() {
  const [images, setImages] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const convertToPdf = async () => {
    if (images.length === 0) return;
    
    setProcessing(true);
    try {
      const pdf = new jsPDF();
      let isFirstPage = true;

      for (const image of images) {
        const imageUrl = URL.createObjectURL(image);
        const img = new Image();
        
        await new Promise((resolve) => {
          img.onload = resolve;
          img.src = imageUrl;
        });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        
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
        
        pdf.addImage(imgData, 'JPEG', x, y, width, height);
        URL.revokeObjectURL(imageUrl);
        isFirstPage = false;
      }
      
      pdf.save('converted-images.pdf');
    } catch (error) {
      console.error('Error converting to PDF:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Image to PDF Converter - Free Online Tool</title>
        <meta name="description" content="Convert multiple images to PDF online for free. No registration required. Fast, secure, and easy to use image to PDF converter." />
        <meta name="keywords" content="image to pdf, convert images, pdf converter, free tool, online converter" />
      </Helmet>

      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">Image to PDF Converter</h1>
              <p className="text-xl text-muted-foreground">Convert multiple images into a single PDF document</p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileImage className="h-5 w-5" />
                  Upload Images
                </CardTitle>
                <CardDescription>
                  Select multiple images to convert to PDF. Supported formats: JPG, PNG, GIF, BMP
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Button variant="outline" className="mb-2">
                      Choose Images
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      or drag and drop images here
                    </p>
                  </label>
                  <input
                    id="image-upload"
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
                  <CardTitle>Selected Images ({images.length})</CardTitle>
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
                        <p className="text-xs text-center mt-1 truncate">{image.name}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center">
                    <Button
                      onClick={convertToPdf}
                      disabled={processing}
                      className="bg-gradient-primary text-primary-foreground"
                    >
                      {processing ? (
                        "Converting..."
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
      </div>
    </>
  );
}