import { Helmet } from "react-helmet-async";
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
import { Textarea } from "@/components/ui/textarea";
import {
  QrCode,
  Camera,
  Download,
  Play,
  Square,
  Copy,
  Check,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { ToolLayout } from "@/components/ToolLayout";

export default function QrTools() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState("");
  const [copied, setCopied] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const scannerContainerRef = useRef<HTMLDivElement>(null);

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

  const startScanner = () => {
    if (scannerContainerRef.current && !isScanning) {
      setIsScanning(true);
      setScannedResult("");

      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          setScannedResult(decodedText);
          stopScanner();
        },
        (error) => {
          // Error handling is optional
        }
      );
    }
  };

  const stopScanner = () => {
    if (scannerRef.current && isScanning) {
      scannerRef.current.clear();
      scannerRef.current = null;
      setIsScanning(false);
    }
  };

  const copyToClipboard = async () => {
    if (scannedResult) {
      try {
        await navigator.clipboard.writeText(scannedResult);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>QR Code Generator & Scanner - Free Online Tool</title>
        <meta
          name="description"
          content="Generate QR codes from text or URLs and scan QR codes using your camera. Free online QR code tools with no registration required."
        />
        <meta
          name="keywords"
          content="qr code generator, qr scanner, qr code reader, free qr tools, barcode generator"
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
                QR Code Tools
              </h1>
              <p className="text-xl text-muted-foreground">
                Generate and scan QR codes instantly
              </p>
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
                      <label className="text-sm font-medium mb-2 block">
                        Size
                      </label>
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
                        <div className="inline-block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
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
                  <div className="space-y-4">
                    {!isScanning ? (
                      <div className="text-center p-8 border-2 border-dashed border-border rounded-lg">
                        <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">
                          Click start to begin scanning QR codes
                        </p>
                        <Button onClick={startScanner} className="w-full">
                          <Play className="mr-2 h-4 w-4" />
                          Start Scanner
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative">
                          <div id="qr-reader" className="w-full"></div>
                          <Button
                            onClick={stopScanner}
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2 z-10"
                          >
                            <Square className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                          Point your camera at a QR code to scan
                        </p>
                      </div>
                    )}

                    {scannedResult && (
                      <div className="space-y-3 p-4 bg-muted rounded-lg">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">
                            Scanned Result:
                          </h4>
                          <Button
                            onClick={copyToClipboard}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            {copied ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <Textarea
                          value={scannedResult}
                          readOnly
                          className="min-h-[80px] text-sm"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </ToolLayout>
    </>
  );
}
