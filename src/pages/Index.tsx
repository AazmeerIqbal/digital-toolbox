import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ToolCard } from "@/components/ToolCard";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";
import { tools, featuredTools, toolsByCategory } from "@/data/tools";
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Smartphone, 
  Users, 
  Globe, 
  CheckCircle,
  HelpCircle 
} from "lucide-react";
import { TopBannerAd, InContentAd, BottomBannerAd } from "@/components/AdSense";

const Index = () => {
  const seoConfig = getSEOConfig("home");

  const currentYear = new Date().getFullYear();

  return (
    <>
      <SEOHead config={seoConfig} />

      <div className="min-h-screen bg-gradient-subtle">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <Hero />

        {/* About Digital Toolbox Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  About Digital Toolbox
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-xl leading-relaxed mb-6">
                    Digital Toolbox is your comprehensive collection of free online tools designed to 
                    simplify everyday digital tasks. We believe that powerful productivity tools should 
                    be accessible to everyone, which is why all our tools are completely free and require 
                    no registration.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    Our mission is to provide high-quality, secure, and user-friendly tools that work 
                    entirely in your browser. Whether you're a professional, student, or casual user, 
                    our tools are designed to save you time and enhance your productivity. From PDF 
                    conversion and image processing to text manipulation and data generation, we've got 
                    you covered.
                  </p>
                  <p className="text-lg leading-relaxed">
                    What sets us apart is our commitment to privacy and security. All processing happens 
                    locally on your device, meaning your files and data never leave your computer. This 
                    ensures maximum security while delivering lightning-fast performance.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Top Banner Ad */}
        <div className="container mx-auto px-4">
          <TopBannerAd />
        </div>

        {/* Features Overview Section */}
        <section className="py-16 bg-background/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Features & Benefits
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover what makes our digital tools the perfect choice for your needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description:
                    "All processing happens locally in your browser for maximum speed",
                },
                {
                  icon: Shield,
                  title: "100% Secure",
                  description:
                    "Your files never leave your device, ensuring complete privacy",
                },
                {
                  icon: Sparkles,
                  title: "No Registration",
                  description:
                    "Start using tools immediately without creating accounts",
                },
                {
                  icon: Smartphone,
                  title: "Mobile Friendly",
                  description:
                    "Responsive design that works perfectly on all devices",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full border-border/50 hover:border-primary/20 transition-colors">
                    <CardContent className="pt-6">
                      <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold text-lg mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Additional Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                    Complete Digital Solution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">PDF Processing Tools</h4>
                          <p className="text-sm text-muted-foreground">
                            Convert images to PDF, merge/split PDFs, compress files
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Image Optimization</h4>
                          <p className="text-sm text-muted-foreground">
                            Compress images, resize photos, convert formats
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Text & Data Tools</h4>
                          <p className="text-sm text-muted-foreground">
                            Case conversion, fake data generation, markdown editing
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Productivity Enhancers</h4>
                          <p className="text-sm text-muted-foreground">
                            Pomodoro timers, typing tests, unit converters
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Creative Tools</h4>
                          <p className="text-sm text-muted-foreground">
                            Color palettes, QR code generation, resume builder
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Always Improving</h4>
                          <p className="text-sm text-muted-foreground">
                            Regular updates with new features and tools
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* In-Content Ad */}
        <div className="container mx-auto px-4">
          <InContentAd />
        </div>

        {/* Featured Tools Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured Tools
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our most popular and useful tools for everyday tasks
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {featuredTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ToolCard tool={tool} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* All Tools Section */}
        <section className="py-16 bg-background/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                All Tools
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Complete collection of productivity and utility tools
              </p>
            </motion.div>

            {Object.entries(toolsByCategory).map(
              ([category, categoryTools], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Badge variant="secondary" className="text-sm">
                      {category}
                    </Badge>
                    <h3 className="text-2xl font-bold text-foreground">
                      {category} Tools
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryTools.map((tool, index) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <ToolCard tool={tool} index={index} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-muted-foreground">
                  Get answers to common questions about our tools and services
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    <h3 className="font-semibold text-lg">Are all tools completely free to use?</h3>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, absolutely! All tools on Digital Toolbox are completely free to use with no hidden 
                    costs, subscription fees, or premium tiers. We believe that essential productivity tools 
                    should be accessible to everyone. You can use any tool as many times as you want without 
                    any limitations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    <h3 className="font-semibold text-lg">How secure are my files and data?</h3>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Your privacy and security are our top priorities. All our tools work entirely within your 
                    browser using client-side processing. This means your files, documents, and data never 
                    leave your device or get uploaded to our servers. Everything is processed locally on your 
                    computer, ensuring complete privacy and security.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    <h3 className="font-semibold text-lg">Do I need to create an account or register?</h3>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    No registration is required! You can start using any of our tools immediately without 
                    creating an account, providing personal information, or going through any signup process. 
                    Simply visit the tool you need and start using it right away. This approach ensures your 
                    privacy and saves you time.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    <h3 className="font-semibold text-lg">Can I use these tools on mobile devices?</h3>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! All our tools are designed with responsive layouts that work seamlessly across all 
                    devices including smartphones, tablets, laptops, and desktop computers. The interface 
                    automatically adapts to your screen size for the best possible user experience on any device.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    <h3 className="font-semibold text-lg">What file formats are supported?</h3>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Our tools support a wide variety of file formats depending on the specific tool. For images: 
                    JPG, PNG, GIF, WebP, and more. For documents: PDF, TXT, MD (Markdown). For data: JSON, CSV, 
                    XML. Each tool page provides specific information about supported formats and any limitations. 
                    We continuously work to expand format support based on user needs.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* Bottom Banner Ad */}
        <div className="container mx-auto px-4">
          <BottomBannerAd />
        </div>

        {/* Footer */}
        <footer className="bg-foreground/5 py-12 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-foreground mb-4">Digital Toolbox</h3>
                <p className="text-muted-foreground mb-4">
                  Your one-stop destination for free online productivity tools. 
                  Secure, fast, and user-friendly tools that work entirely in your browser.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Trusted by thousands of users worldwide</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/tools/image-to-pdf" className="text-muted-foreground hover:text-primary transition-colors">PDF Converter</a></li>
                  <li><a href="/tools/image-compressor" className="text-muted-foreground hover:text-primary transition-colors">Image Compressor</a></li>
                  <li><a href="/tools/color-tools" className="text-muted-foreground hover:text-primary transition-colors">Color Tools</a></li>
                  <li><a href="/tools/qr-tools" className="text-muted-foreground hover:text-primary transition-colors">QR Generator</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                  <li><a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                  <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border pt-8 text-center">
              <p className="text-muted-foreground">
                © {currentYear} Digital Toolbox. All tools are free to use. No registration required.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
