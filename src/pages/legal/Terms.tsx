import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";
import { FileText, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const Terms = () => {
  const seoConfig = {
    title: "Terms of Service - Digital Toolbox | Usage Terms & Conditions",
    description: "Read our Terms of Service to understand the rules and guidelines for using Digital Toolbox tools and services.",
    keywords: ["terms of service", "usage terms", "terms and conditions", "digital toolbox rules", "user agreement"],
    canonical: "https://digitaltoolbox.com/terms"
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
              <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Terms of Service
              </h1>
              <p className="text-xl text-muted-foreground">
                Please read these terms carefully before using our services
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Last updated: {currentYear}
              </p>
            </div>

            <div className="space-y-8">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    Acceptance of Terms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    By accessing and using Digital Toolbox, you accept and agree to be bound by the 
                    terms and provision of this agreement. If you do not agree to abide by the above, 
                    please do not use this service.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Service Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Digital Toolbox provides a collection of free online tools for various digital 
                    tasks including but not limited to file conversion, image processing, text 
                    manipulation, and productivity enhancement.
                  </p>
                  <p className="text-muted-foreground">
                    All tools operate entirely within your web browser using client-side processing. 
                    We do not store, process, or have access to your files or data.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    Permitted Use
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Personal and commercial use of all tools
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Processing your own files and content
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Educational and learning purposes
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Sharing links to our tools with others
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Prohibited Use
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      Using tools for illegal or harmful activities
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      Attempting to reverse engineer or copy our tools
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      Overloading our servers or disrupting service
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      Processing copyrighted content without permission
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6 text-yellow-500" />
                    Disclaimers & Limitations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    <strong>Service Availability:</strong> While we strive to maintain 100% uptime, 
                    we cannot guarantee uninterrupted access to our tools. Services may be temporarily 
                    unavailable due to maintenance, updates, or technical issues.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Tool Accuracy:</strong> We make every effort to ensure our tools work 
                    correctly, but we cannot guarantee perfect accuracy in all cases. Users should 
                    verify important results independently.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Browser Compatibility:</strong> Our tools are designed to work with modern 
                    web browsers. Some features may not be available in older browser versions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Intellectual Property</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    The Digital Toolbox website, including its design, code, and content, is protected 
                    by intellectual property laws. While the tools are free to use, the underlying 
                    code and design remain our property.
                  </p>
                  <p className="text-muted-foreground">
                    Users retain full ownership of any content they create or process using our tools. 
                    We claim no rights to your files, documents, or generated content.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Digital Toolbox is provided "as is" without warranties of any kind. We shall not 
                    be liable for any direct, indirect, incidental, or consequential damages resulting 
                    from the use or inability to use our services. Users assume full responsibility 
                    for their use of the tools and any results obtained.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Changes to Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We reserve the right to modify these terms at any time. Changes will be effective 
                    immediately upon posting to this page. Continued use of our services after changes 
                    constitutes acceptance of the new terms.
                  </p>
                </CardContent>
              </Card>

              <div className="text-center mt-12 p-6 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  If you have any questions about these Terms of Service, please 
                  <a href="/contact" className="text-primary hover:underline ml-1">contact us</a>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Terms;
