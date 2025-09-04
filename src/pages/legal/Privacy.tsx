import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";
import { Shield, Eye, Lock, Server } from "lucide-react";

const Privacy = () => {
  const seoConfig = {
    title: "Privacy Policy - Digital Toolbox | Your Data Security",
    description: "Learn how Digital Toolbox protects your privacy. All tools work locally in your browser - your files never leave your device.",
    keywords: ["privacy policy", "data security", "local processing", "browser tools", "no data collection"],
    canonical: "https://digitaltoolbox.com/privacy"
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <SEOHead config={seoConfig} />
      
      <div className="min-h-screen bg-gradient-subtle">
        <Header />
        
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Privacy Policy
              </h1>
              <p className="text-xl text-muted-foreground">
                Your privacy is our priority. Learn how we protect your data.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Last updated: {currentYear}
              </p>
            </div>

            <div className="space-y-8">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-6 w-6 text-primary" />
                    Data Processing & Storage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    <strong>Local Processing Only:</strong> All tools on Digital Toolbox work entirely 
                    within your browser using client-side JavaScript. Your files, documents, images, 
                    and any data you process never leave your device or get uploaded to our servers.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>No Data Storage:</strong> We do not store, save, or have access to any 
                    files or content you process using our tools. Everything happens locally on your 
                    computer and is automatically cleared when you close the browser or navigate away.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Temporary Browser Storage:</strong> Some tools may use your browser's 
                    local storage to save preferences or work-in-progress content (like the markdown 
                    editor). This data remains on your device and can be cleared at any time.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-6 w-6 text-primary" />
                    Information We Collect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    <strong>Analytics Data:</strong> We may use privacy-respecting analytics to understand 
                    how our tools are used (such as which tools are most popular) to improve our service. 
                    This data is anonymized and does not include personal information.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Technical Information:</strong> Standard web server logs may collect basic 
                    technical information such as IP addresses, browser types, and access times for 
                    security and performance monitoring.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>No Personal Data:</strong> We do not collect names, email addresses, phone 
                    numbers, or any other personal information. No registration is required to use our tools.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-6 w-6 text-primary" />
                    Third-Party Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    <strong>Advertising:</strong> We may display advertisements through Google AdSense 
                    to support the free operation of our tools. Google may use cookies and similar 
                    technologies to serve relevant ads. You can learn more about Google's privacy 
                    practices at their Privacy Policy.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>CDN Services:</strong> We use content delivery networks to ensure fast 
                    loading times. These services may log basic access information for performance 
                    monitoring.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Your Rights & Choices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Since we don't collect or store personal data, there's no personal information 
                    to access, modify, or delete. You maintain complete control over any data you 
                    process using our tools.
                  </p>
                  <p className="text-muted-foreground">
                    You can clear your browser's local storage at any time to remove any saved 
                    preferences or temporary data. You can also use ad blockers or adjust your 
                    browser settings to control advertising cookies.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Security Measures</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Our tools are built with security best practices including secure HTTPS connections, 
                    content security policies, and regular security updates. Since all processing happens 
                    locally, your data is inherently more secure than cloud-based alternatives.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    If you have any questions about this Privacy Policy or our practices, please 
                    contact us through our <a href="/contact" className="text-primary hover:underline">Contact page</a>.
                  </p>
                </CardContent>
              </Card>

              <div className="text-center mt-12 p-6 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  This Privacy Policy may be updated periodically. We will notify users of any 
                  significant changes by updating the "Last updated" date at the top of this page.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
