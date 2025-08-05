import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Merge, Split, RotateCw, Minimize2, FileX } from "lucide-react";

export default function PdfTools() {
  return (
    <>
      <Helmet>
        <title>PDF Tools Suite - Free Online PDF Editor</title>
        <meta name="description" content="Complete PDF toolkit: merge, split, rotate, compress and extract content from PDFs. Free online PDF tools with no registration required." />
        <meta name="keywords" content="pdf tools, merge pdf, split pdf, rotate pdf, compress pdf, pdf editor" />
      </Helmet>

      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">PDF Tools Suite</h1>
              <p className="text-xl text-muted-foreground">Complete toolkit for all your PDF needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Merge className="h-5 w-5 text-primary" />
                    Merge PDFs
                  </CardTitle>
                  <CardDescription>
                    Combine multiple PDF files into a single document
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6 border-2 border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">Coming Soon</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Split className="h-5 w-5 text-primary" />
                    Split PDF
                  </CardTitle>
                  <CardDescription>
                    Extract pages or split PDF into multiple files
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6 border-2 border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">Coming Soon</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RotateCw className="h-5 w-5 text-primary" />
                    Rotate PDF
                  </CardTitle>
                  <CardDescription>
                    Rotate PDF pages to the correct orientation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6 border-2 border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">Coming Soon</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Minimize2 className="h-5 w-5 text-primary" />
                    Compress PDF
                  </CardTitle>
                  <CardDescription>
                    Reduce PDF file size while maintaining quality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6 border-2 border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">Coming Soon</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileX className="h-5 w-5 text-primary" />
                    Extract Text
                  </CardTitle>
                  <CardDescription>
                    Extract text content from PDF documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6 border-2 border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">Coming Soon</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Extract Images
                  </CardTitle>
                  <CardDescription>
                    Extract all images from PDF documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6 border-2 border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">Coming Soon</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}