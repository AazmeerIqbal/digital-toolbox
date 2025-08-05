import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, Construction } from "lucide-react";

export default function ImageCompressor() {
  return (
    <>
      <Helmet>
        <title>Image Compressor - Free Online Image Compression Tool</title>
        <meta name="description" content="Compress and resize images online for free. Reduce file size while maintaining quality. Support for JPG, PNG, WebP and more." />
        <meta name="keywords" content="image compressor, resize images, compress photos, image optimization, reduce file size" />
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
              <h1 className="text-4xl font-bold text-foreground mb-4">Image Compressor</h1>
              <p className="text-xl text-muted-foreground">Compress and resize images without quality loss</p>
            </div>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <ImageIcon className="h-8 w-8 text-primary" />
                  Smart Image Compression
                </CardTitle>
                <CardDescription>
                  Reduce image file sizes while maintaining visual quality
                </CardDescription>
              </CardHeader>
              <CardContent className="py-16">
                <div className="space-y-6">
                  <Construction className="h-24 w-24 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      We're developing an advanced image compression tool that works 
                      entirely in your browser for privacy and speed.
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Features will include:</p>
                    <ul className="mt-2 space-y-1">
                      <li>• Lossless and lossy compression</li>
                      <li>• Batch processing</li>
                      <li>• Format conversion</li>
                      <li>• Custom quality settings</li>
                      <li>• Preview before/after</li>
                      <li>• File size optimization</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}