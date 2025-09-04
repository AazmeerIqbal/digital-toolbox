import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";
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
import { Textarea } from "@/components/ui/textarea";
import {
  QrCode,
  Camera,
  Download,
  Play,
  Square,
  Copy,
  Check,
  Zap,
  Shield,
  Smartphone,
  HelpCircle,
  Link,
  MessageSquare,
  Mail
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { ToolLayout } from "@/components/ToolLayout";

export default function QrTools() {
  const seoConfig = getSEOConfig("qr-tools");
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
          // Handle scan error (optional)
          console.warn("QR scan error:", error);
        }
      );
    }
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(scannedResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const generateSampleQR = (type: string) => {
    switch (type) {
      case 'url':
        setText('https://example.com');
        break;
      case 'email':
        setText('mailto:contact@example.com');
        break;
      case 'sms':
        setText('sms:+1234567890');
        break;
      case 'wifi':
        setText('WIFI:T:WPA;S:MyNetwork;P:MyPassword;;');
        break;
      default:
        setText('Hello, World!');
    }
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, []);

  return (
    <>
      <SEOHead config={seoConfig} />

      <ToolLayout>
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                QR Code Generator & Scanner
              </h1>
              <p className="text-xl text-muted-foreground">
                Create and scan QR codes instantly with our free online tool
              </p>
            </div>

            {/* Main Tools */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
                      placeholder="Enter text, URL, email, phone number, or any data to generate QR code..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="min-h-[100px]"
                    />

                    {/* Quick Templates */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Quick Templates
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => generateSampleQR('url')}
                        >
                          <Link className="h-3 w-3 mr-1" />
                          URL
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => generateSampleQR('email')}
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => generateSampleQR('sms')}
                        >
                          <MessageSquare className="h-3 w-3 mr-1" />
                          SMS
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => generateSampleQR('wifi')}
                        >
                          WiFi
                        </Button>
                      </div>
                    </div>

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
                  <CardTitle>About QR Code Tools</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                  <p>
                    Our comprehensive QR Code Tools provide everything you need to generate and scan QR codes 
                    quickly and efficiently. Whether you're creating QR codes for websites, contact information, 
                    WiFi credentials, or any other data, our generator supports all standard QR code formats 
                    and produces high-quality, scannable codes.
                  </p>
                  <p>
                    The built-in scanner uses your device's camera to instantly decode QR codes, making it 
                    perfect for accessing websites, saving contact information, connecting to WiFi networks, 
                    or reading any encoded data. Both tools work entirely in your browser, ensuring your 
                    data remains private and secure.
                  </p>
                  <p>
                    QR codes (Quick Response codes) have become essential in our digital world, bridging the 
                    gap between physical and digital experiences. From restaurant menus and event tickets to 
                    marketing campaigns and contactless payments, QR codes provide a fast and convenient way 
                    to share information.
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
                  <CardTitle>Why Choose Our QR Code Tools?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Instant Generation</h3>
                      <p className="text-sm text-muted-foreground">
                        Generate QR codes instantly as you type. No waiting, no processing delays.
                      </p>
                    </div>
                    <div className="text-center">
                      <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Privacy Focused</h3>
                      <p className="text-sm text-muted-foreground">
                        All processing happens locally. Your data never leaves your device.
                      </p>
                    </div>
                    <div className="text-center">
                      <Smartphone className="h-8 w-8 text-primary mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Mobile Optimized</h3>
                      <p className="text-sm text-muted-foreground">
                        Perfect for mobile devices with camera access for scanning.
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
                  <CardTitle>How to Use QR Code Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Generator Instructions */}
                    <div>
                      <h3 className="font-semibold mb-4 text-primary">QR Code Generator</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                            1
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-1">Enter Your Data</h4>
                            <p className="text-xs text-muted-foreground">
                              Type or paste any text, URL, email, or data you want to encode.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                            2
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-1">Choose Size</h4>
                            <p className="text-xs text-muted-foreground">
                              Select the appropriate size for your intended use.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                            3
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-1">Download</h4>
                            <p className="text-xs text-muted-foreground">
                              Click download to save your QR code as a PNG image.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Scanner Instructions */}
                    <div>
                      <h3 className="font-semibold mb-4 text-primary">QR Code Scanner</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                            1
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-1">Start Scanner</h4>
                            <p className="text-xs text-muted-foreground">
                              Click "Start Scanner" and allow camera access when prompted.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                            2
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-1">Scan Code</h4>
                            <p className="text-xs text-muted-foreground">
                              Point your camera at the QR code and wait for automatic detection.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                            3
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-1">View Result</h4>
                            <p className="text-xs text-muted-foreground">
                              The decoded content will appear below for you to copy or use.
                            </p>
                          </div>
                        </div>
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
                        What types of data can I encode in QR codes?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        QR codes can store various types of data including plain text, URLs, email addresses, 
                        phone numbers, SMS messages, WiFi credentials, contact information (vCard), calendar 
                        events, and more. The limit is approximately 4,296 alphanumeric characters.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left">
                        Can I customize the appearance of generated QR codes?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Currently, our tool generates standard black and white QR codes in three sizes (128px, 
                        256px, 512px). The codes are optimized for maximum compatibility and scannability across 
                        all devices and QR code readers.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left">
                        Do I need to allow camera access for the scanner?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes, the QR code scanner requires camera access to function. When you click "Start Scanner", 
                        your browser will ask for permission to access your camera. This is completely secure and 
                        the camera feed is processed locally on your device.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4" className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left">
                        Are the QR codes generated by this tool permanent?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes, QR codes are static and permanent. Once generated, they will always contain the same 
                        data you encoded. Unlike dynamic QR codes that redirect through a service, these codes 
                        work independently and don't rely on our service to function.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5" className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left">
                        Can I scan QR codes from images on my device?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Currently, our scanner works with live camera feed. If you need to scan QR codes from 
                        saved images, you can display the image on another screen and scan it with the camera, 
                        or use your device's built-in QR code scanner from the photo gallery.
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
