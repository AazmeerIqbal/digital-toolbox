import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { QrCode, Camera, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function QrTools() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);

  const downloadQR = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "qrcode.png";
      a.click();
    }
  };

  return (
    <>
      <Helmet>
        <title>QR Code Generator & Scanner - Free Online Tool</title>
        <meta name="description" content="Generate QR codes from text or URLs and scan QR codes using your camera. Free online QR code tools with no registration required." />
        <meta name="keywords" content="qr code generator, qr scanner, qr code reader, free qr tools, barcode generator" />
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
              <h1 className="text-4xl font-bold text-foreground mb-4">QR Code Tools</h1>
              <p className="text-xl text-muted-foreground">Generate and scan QR codes instantly</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* QR Generator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5" />
                    QR Code Generator
                  </CardTitle>
                  <CardDescription>
                    Create QR codes from text, URLs, or any data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Enter text, URL, or any data to generate QR code..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="min-h-[100px]"
                    />
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Size</label>
                      <select 
                        value={size} 
                        onChange={(e) => setSize(Number(e.target.value))}
                        className="w-full p-2 border border-border rounded-lg bg-background"
                      >
                        <option value={128}>Small (128px)</option>
                        <option value={256}>Medium (256px)</option>
                        <option value={512}>Large (512px)</option>
                      </select>
                    </div>

                    {text && (
                      <div className="text-center space-y-4">
                        <div className="inline-block p-4 bg-white rounded-lg shadow-md">
                          <QRCodeSVG
                            value={text}
                            size={Math.min(size, 300)}
                            level="M"
                            includeMargin={true}
                          />
                        </div>
                        
                        <Button onClick={downloadQR} className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download QR Code
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* QR Scanner */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    QR Code Scanner
                  </CardTitle>
                  <CardDescription>
                    Scan QR codes using your device camera
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 border-2 border-dashed border-border rounded-lg">
                    <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">QR Scanner feature</p>
                    <p className="text-sm text-muted-foreground">
                      Camera access required for scanning
                    </p>
                    <Button variant="outline" className="mt-4" disabled>
                      Enable Scanner (Coming Soon)
                    </Button>
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