import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ToolCard } from "@/components/ToolCard";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";
import { tools, featuredTools, toolsByCategory } from "@/data/tools";
import { Sparkles, Zap, Shield, Smartphone } from "lucide-react";
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

        {/* Top Banner Ad */}
        <div className="container mx-auto px-4">
          <TopBannerAd />
        </div>

        {/* Features Section */}
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
                Why Choose Our Tools?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Powerful, secure, and completely free tools that work entirely
                in your browser
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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

        {/* Bottom Banner Ad */}
        <div className="container mx-auto px-4">
          <BottomBannerAd />
        </div>

        {/* Footer */}
        <footer className="bg-foreground/5 py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">
              © {currentYear} Digital Toolbox. All tools are free to use. No
              registration required.
            </p>
            <div className="mt-4 space-x-6 text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
