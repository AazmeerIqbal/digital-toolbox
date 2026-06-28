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
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, Upload, Download, Trash2, Settings, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/ToolLayout";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";
import { ToolExplanation } from "@/components/ToolExplanation";
import { ToolGuide } from "@/components/ToolGuide";

interface CompressedImage {
  original: File;
  compressed: Blob;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  previewUrl: string;
  outputType: string;
  outputExt: string;
}

// Returns true if canvas has any pixel with alpha < 255
function hasTransparency(ctx: CanvasRenderingContext2D, w: number, h: number): boolean {
  const data = ctx.getImageData(0, 0, w, h).data;
  // Sample every 8th pixel for performance
  for (let i = 3; i < data.length; i += 32) {
    if (data[i] < 255) return true;
  }
  return false;
}

async function compressImage(
  file: File,
  quality: number // 0.0 – 1.0
): Promise<{ blob: Blob; type: string; ext: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;

      const isPng = file.type === "image/png";
      const isWebp = file.type === "image/webp";

      if (isPng) {
        ctx.drawImage(img, 0, 0);
        const transparent = hasTransparency(ctx, canvas.width, canvas.height);

        if (transparent) {
          // Keep as WebP with quality (supports transparency + lossy compression)
          canvas.toBlob(
            (b) => resolve({ blob: b!, type: "image/webp", ext: "webp" }),
            "image/webp",
            quality
          );
        } else {
          // No transparency — flatten to white and compress as JPEG
          const c2 = document.createElement("canvas");
          c2.width = img.naturalWidth;
          c2.height = img.naturalHeight;
          const ctx2 = c2.getContext("2d")!;
          ctx2.fillStyle = "#ffffff";
          ctx2.fillRect(0, 0, c2.width, c2.height);
          ctx2.drawImage(img, 0, 0);
          c2.toBlob(
            (b) => resolve({ blob: b!, type: "image/jpeg", ext: "jpg" }),
            "image/jpeg",
            quality
          );
        }
      } else if (isWebp) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (b) => resolve({ blob: b!, type: "image/webp", ext: "webp" }),
          "image/webp",
          quality
        );
      } else {
        // JPEG / GIF / BMP / TIFF → JPEG with quality
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (b) => resolve({ blob: b!, type: "image/jpeg", ext: "jpg" }),
          "image/jpeg",
          quality
        );
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    img.src = objectUrl;
  });
}

function qualityLabel(q: number): { text: string; color: string } {
  if (q >= 0.85) return { text: "Maximum", color: "bg-blue-500" };
  if (q >= 0.70) return { text: "High", color: "bg-green-500" };
  if (q >= 0.50) return { text: "Medium", color: "bg-yellow-500" };
  if (q >= 0.30) return { text: "Low", color: "bg-orange-500" };
  return { text: "Minimum", color: "bg-red-500" };
}

function formatSize(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(1) + " " + ["B", "KB", "MB", "GB"][i];
}

export default function ImageCompressor() {
  const seoConfig = getSEOConfig("imagecompressor");
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [recompressing, setRecompressing] = useState(false);
  const [quality, setQuality] = useState([0.8]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const MAX_FILE_SIZE_MB = 20;

  const validateFiles = (files: File[]): File[] =>
    files.filter((f) => {
      if (!f.type.startsWith("image/")) {
        toast({ title: "Invalid file", description: `${f.name} is not an image`, variant: "destructive" });
        return false;
      }
      if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast({ title: "File too large", description: `${f.name} exceeds ${MAX_FILE_SIZE_MB} MB`, variant: "destructive" });
        return false;
      }
      return true;
    });

  const processFiles = async (files: File[], q: number): Promise<CompressedImage[]> => {
    const results: CompressedImage[] = [];
    for (const file of files) {
      const { blob, type, ext } = await compressImage(file, q);
      const previewUrl = URL.createObjectURL(blob);
      const ratio = ((file.size - blob.size) / file.size) * 100;
      results.push({
        original: file,
        compressed: blob,
        originalSize: file.size,
        compressedSize: blob.size,
        compressionRatio: ratio,
        previewUrl,
        outputType: type,
        outputExt: ext,
      });
    }
    return results;
  };

  const handleFiles = async (rawFiles: File[]) => {
    const valid = validateFiles(rawFiles);
    if (!valid.length) return;
    setProcessing(true);
    try {
      const results = await processFiles(valid, quality[0]);
      setImages((prev) => [...prev, ...results]);
      toast({ title: "Done", description: `${valid.length} image(s) compressed.` });
    } catch {
      toast({ title: "Error", description: "Compression failed. Please try again.", variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  };

  const recompressAll = async () => {
    if (!images.length) return;
    setRecompressing(true);
    try {
      // Revoke old preview URLs
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
      const originals = images.map((i) => i.original);
      const results = await processFiles(originals, quality[0]);
      setImages(results);
      toast({ title: "Re-compressed", description: `All images re-compressed at ${Math.round(quality[0] * 100)}% quality.` });
    } catch {
      toast({ title: "Error", description: "Re-compression failed.", variant: "destructive" });
    } finally {
      setRecompressing(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await handleFiles(files);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    await handleFiles(Array.from(e.dataTransfer.files));
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].previewUrl);
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
  };

  const downloadImage = (img: CompressedImage) => {
    const baseName = img.original.name.replace(/\.[^.]+$/, "");
    const url = URL.createObjectURL(img.compressed);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}-compressed.${img.outputExt}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => images.forEach(downloadImage);

  const q = quality[0];
  const ql = qualityLabel(q);

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
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">Image Compressor</h1>
              <p className="text-xl text-muted-foreground">
                Compress images with precise quality control — no uploads, runs entirely in your browser
              </p>
            </div>

            {/* Settings */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Compression Quality
                </CardTitle>
                <CardDescription>
                  Lower quality = smaller file. Higher quality = better image. Recommended: 70–85% for web.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Quality: {Math.round(q * 100)}%</span>
                    <span className={`text-xs text-white px-2 py-0.5 rounded-full ${ql.color}`}>
                      {ql.text}
                    </span>
                  </div>
                  <Slider
                    value={quality}
                    onValueChange={setQuality}
                    min={0.05}
                    max={1}
                    step={0.05}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5% — Smallest file</span>
                    <span className="text-center">70–85% — Recommended</span>
                    <span>100% — Best quality</span>
                  </div>

                  {images.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={recompressAll}
                      disabled={recompressing || processing}
                      className="mt-2"
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${recompressing ? "animate-spin" : ""}`} />
                      {recompressing ? "Re-compressing…" : `Re-compress all at ${Math.round(q * 100)}%`}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Upload */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Upload Images
                </CardTitle>
                <CardDescription>
                  JPG, PNG, WebP, GIF supported · Max {MAX_FILE_SIZE_MB} MB per file
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-10 text-center transition-colors cursor-pointer ${
                    dragActive
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm font-medium mb-1">
                    {processing ? "Compressing…" : "Click to choose images or drag & drop"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Compresses at <strong>{Math.round(q * 100)}% quality</strong> ({ql.text})
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={processing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {images.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <CardTitle>Compressed Images ({images.length})</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearAll}
                        className="text-destructive hover:text-destructive"
                      >
                        Clear All
                      </Button>
                      <Button onClick={downloadAll}>
                        <Download className="mr-2 h-4 w-4" />
                        Download All
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {images.map((img, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={img.previewUrl}
                            alt={img.original.name}
                            className="w-16 h-16 object-cover rounded border flex-shrink-0"
                          />

                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{img.original.name}</p>
                            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                              <span>Original: <strong>{formatSize(img.originalSize)}</strong></span>
                              <span>→</span>
                              <span>Compressed: <strong>{formatSize(img.compressedSize)}</strong></span>
                              <Badge variant="outline" className="text-xs">
                                .{img.outputExt}
                              </Badge>
                            </div>
                            <div className="mt-2">
                              {img.compressionRatio > 0 ? (
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 bg-muted rounded-full h-1.5">
                                    <div
                                      className="bg-green-500 h-1.5 rounded-full transition-all"
                                      style={{ width: `${Math.min(img.compressionRatio, 100)}%` }}
                                    />
                                  </div>
                                  <span className="text-green-600 text-xs font-semibold whitespace-nowrap">
                                    −{img.compressionRatio.toFixed(1)}%
                                  </span>
                                </div>
                              ) : (
                                <span className="text-yellow-600 text-xs">
                                  File increased — image was already highly optimized
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2 flex-shrink-0">
                            <Button size="sm" variant="outline" onClick={() => downloadImage(img)} title="Download">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => removeImage(index)} title="Remove">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <ToolExplanation
              title="Image Compressor"
              description="Toolzaply's Image Compressor uses the browser's native Canvas API to compress images with true quality control. Unlike tools that target a fixed file size, this tool compresses strictly to the quality percentage you set — giving you predictable, consistent results. All processing is local; your images never leave your device."
              howToUse={[
                "Set the quality slider to your desired level (70–85% is recommended for web use).",
                "Click the upload area or drag and drop your images.",
                "Review the original vs compressed size and the savings percentage.",
                "If you want to try a different quality level, adjust the slider and click 'Re-compress all'.",
                "Download individual files or use 'Download All' to save everything at once.",
              ]}
              features={[
                "Canvas-based compression — quality slider directly controls output quality, not a file size target.",
                "Re-compress button lets you change quality and re-process all images without re-uploading.",
                "Transparent PNGs preserved — automatically outputs WebP (with transparency + lossy compression).",
                "Non-transparent PNGs converted to JPEG for maximum size reduction.",
                "Visual savings progress bar with exact percentage reduction per image.",
                "Batch processing — compress multiple images simultaneously.",
              ]}
              faqs={[
                {
                  question: "Why does the quality slider actually work now?",
                  answer: "Previously the tool used a library that overrode your quality setting with a 1 MB file-size target. Now it uses the browser's Canvas API directly, so 30% quality always produces a smaller file than 80% quality.",
                },
                {
                  question: "What happens to PNG files?",
                  answer: "PNG files with transparency are converted to WebP (which supports transparency AND lossy compression). PNG files without transparency are converted to JPEG, which achieves much better compression ratios.",
                },
                {
                  question: "Are my images uploaded to any server?",
                  answer: "No. Compression runs entirely in your browser using the Canvas API. Your files never leave your device.",
                },
                {
                  question: "What quality setting should I use?",
                  answer: "70–85% is the sweet spot for web images — visually indistinguishable from the original at a fraction of the file size. Use 90%+ for photos you'll print. Use 50–60% for thumbnails or previews where file size matters most.",
                },
              ]}            />

            <ToolGuide id="imagecompressor" />
          </motion.div>
        </div>
      </ToolLayout>
    </>
  );
}
