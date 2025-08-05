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
import { Slider } from "@/components/ui/slider";
import { ImageIcon, Upload, Download, Trash2, Settings } from "lucide-react";
import imageCompression from "browser-image-compression";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/ToolLayout";

interface CompressedImage {
  original: File;
  compressed: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  previewUrl: string;
}

export default function ImageCompressor() {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [quality, setQuality] = useState([0.8]);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [maxHeight, setMaxHeight] = useState(1080);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
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

    if (validFiles.length === 0) return;

    setProcessing(true);

    try {
      const compressedImages: CompressedImage[] = [];

      for (const file of validFiles) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: Math.max(maxWidth, maxHeight),
          useWebWorker: true,
          quality: quality[0],
        };

        const compressedFile = await imageCompression(file, options);
        const previewUrl = URL.createObjectURL(compressedFile);

        compressedImages.push({
          original: file,
          compressed: compressedFile,
          originalSize: file.size,
          compressedSize: compressedFile.size,
          compressionRatio:
            ((file.size - compressedFile.size) / file.size) * 100,
          previewUrl,
        });
      }

      setImages((prev) => [...prev, ...compressedImages]);
      toast({
        title: "Success",
        description: `${validFiles.length} image(s) compressed successfully!`,
      });
    } catch (error) {
      console.error("Compression error:", error);
      toast({
        title: "Error",
        description: "Failed to compress some images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
      // Reset the input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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

  const handleDrop = async (e: React.DragEvent) => {
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

    if (validFiles.length === 0) return;

    setProcessing(true);

    try {
      const compressedImages: CompressedImage[] = [];

      for (const file of validFiles) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: Math.max(maxWidth, maxHeight),
          useWebWorker: true,
          quality: quality[0],
        };

        const compressedFile = await imageCompression(file, options);
        const previewUrl = URL.createObjectURL(compressedFile);

        compressedImages.push({
          original: file,
          compressed: compressedFile,
          originalSize: file.size,
          compressedSize: compressedFile.size,
          compressionRatio:
            ((file.size - compressedFile.size) / file.size) * 100,
          previewUrl,
        });
      }

      setImages((prev) => [...prev, ...compressedImages]);
      toast({
        title: "Success",
        description: `${validFiles.length} image(s) compressed successfully!`,
      });
    } catch (error) {
      console.error("Compression error:", error);
      toast({
        title: "Error",
        description: "Failed to compress some images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const removeImage = (index: number) => {
    const image = images[index];
    URL.revokeObjectURL(image.previewUrl);
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAllImages = () => {
    images.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    setImages([]);
  };

  const downloadImage = (image: CompressedImage) => {
    const url = URL.createObjectURL(image.compressed);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed-${image.original.name}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    images.forEach((image) => downloadImage(image));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Helmet>
        <title>Image Compressor - Free Online Image Compression Tool</title>
        <meta
          name="description"
          content="Compress and resize images online for free. Reduce file size while maintaining quality. Support for JPG, PNG, WebP and more."
        />
        <meta
          name="keywords"
          content="image compressor, resize images, compress photos, image optimization, reduce file size"
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
                Image Compressor
              </h1>
              <p className="text-xl text-muted-foreground">
                Compress and resize images without quality loss
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Compression Settings
                </CardTitle>
                <CardDescription>
                  Configure compression options before uploading images
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Quality: {Math.round(quality[0] * 100)}%
                    </label>
                    <Slider
                      value={quality}
                      onValueChange={setQuality}
                      max={1}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Max Width (px)
                    </label>
                    <Input
                      type="number"
                      value={maxWidth}
                      onChange={(e) =>
                        setMaxWidth(parseInt(e.target.value) || 1920)
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Max Height (px)
                    </label>
                    <Input
                      type="number"
                      value={maxHeight}
                      onChange={(e) =>
                        setMaxHeight(parseInt(e.target.value) || 1080)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Upload Images
                </CardTitle>
                <CardDescription>
                  Select images to compress. Supported formats: JPG, PNG, WebP,
                  GIF
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
                    disabled={processing}
                    onClick={triggerFileInput}
                  >
                    {processing ? "Compressing..." : "Choose Images"}
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
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Compressed Images ({images.length})</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearAllImages}
                        className="text-destructive hover:text-destructive"
                      >
                        Clear All
                      </Button>
                      <Button
                        onClick={downloadAll}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download All
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {images.map((image, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={image.previewUrl}
                            alt={`Compressed ${index + 1}`}
                            className="w-16 h-16 object-cover rounded border"
                          />

                          <div className="flex-1">
                            <p className="font-medium text-sm">
                              {image.original.name}
                            </p>
                            <div className="text-xs text-muted-foreground space-y-1">
                              <p>
                                Original: {formatFileSize(image.originalSize)}
                              </p>
                              <p>
                                Compressed:{" "}
                                {formatFileSize(image.compressedSize)}
                              </p>
                              <p className="text-green-600">
                                Reduced by {image.compressionRatio.toFixed(1)}%
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => downloadImage(image)}
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeImage(index)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
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
