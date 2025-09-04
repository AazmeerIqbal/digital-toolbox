import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";
import { Users, Target, Heart, Lightbulb } from "lucide-react";

const About = () => {
  const seoConfig = {
    title: "About Us - Digital Toolbox | Free Online Tools",
    description: "Learn about Digital Toolbox, our mission to provide free online tools for everyone, and our commitment to privacy and security.",
    keywords: ["about digital toolbox", "free online tools", "our mission", "privacy-focused tools", "browser-based tools"],
    canonical: "https://digitaltoolbox.com/about"
  };

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
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                About Digital Toolbox
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Empowering users worldwide with free, secure, and powerful online tools
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-primary" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To democratize access to powerful digital tools by providing a comprehensive 
                    suite of free online utilities that work entirely in your browser. We believe 
                    that everyone should have access to professional-grade tools without barriers.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-6 w-6 text-primary" />
                    Our Values
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Privacy-first design, user-centric approach, and commitment to excellence. 
                    We prioritize your data security by ensuring all processing happens locally 
                    on your device, never on our servers.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Why We Built Digital Toolbox</h2>
              <p className="mb-6">
                In today's digital world, we often need quick access to various tools for different tasks. 
                Whether it's converting an image to PDF, compressing files, generating QR codes, or testing 
                typing speed, these needs arise frequently in our personal and professional lives.
              </p>
              <p className="mb-6">
                However, most existing solutions require downloads, registrations, or come with limitations. 
                We saw an opportunity to create something better - a platform where all essential tools are 
                available instantly, securely, and completely free.
              </p>
              <p className="mb-6">
                Digital Toolbox was born from the idea that powerful productivity tools should be accessible 
                to everyone, regardless of their technical expertise or budget. We've carefully crafted each 
                tool to be intuitive, fast, and reliable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">User-Focused</h3>
                <p className="text-muted-foreground text-sm">
                  Every tool is designed with user experience in mind, ensuring simplicity without 
                  sacrificing functionality.
                </p>
              </div>
              <div className="text-center">
                <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Innovation</h3>
                <p className="text-muted-foreground text-sm">
                  We continuously improve and add new tools based on user feedback and emerging needs.
                </p>
              </div>
              <div className="text-center">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Quality</h3>
                <p className="text-muted-foreground text-sm">
                  Each tool undergoes rigorous testing to ensure reliability, accuracy, and performance.
                </p>
              </div>
            </div>

            <Card className="border-border/50 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Join Our Community</h3>
                  <p className="text-muted-foreground mb-6">
                    Digital Toolbox serves thousands of users worldwide who rely on our tools for their 
                    daily digital tasks. Join our growing community and experience the convenience of 
                    having all essential tools in one place.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      13+ Tools Available
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      100% Free Forever
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      No Registration Required
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;
