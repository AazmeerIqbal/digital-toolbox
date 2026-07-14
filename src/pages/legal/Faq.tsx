import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { HelpCircle, Shield, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { faqItems } from "@/data/faq";

const Faq = () => {
  const seoConfig = {
    title: "FAQ — Frequently Asked Questions | Toolzaply",
    description:
      "Answers to common questions about Toolzaply's free online tools: privacy, file handling, supported formats, size limits, browser support, and more.",
    keywords: [
      "toolzaply faq",
      "free online tools questions",
      "are online converters safe",
      "browser tools privacy",
      "file conversion faq",
    ],
    canonical: "https://toolzaply.com/faq",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  };

  return (
    <>
      <SEOHead config={seoConfig} />

      <div className="min-h-screen bg-gradient-subtle flex flex-col">
        <Header />

        <div className="flex-1 container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about using Toolzaply's free browser-based tools.
              </p>
            </div>

            {/* Quick trust points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {[
                { icon: Shield, title: "100% Private", desc: "Files never leave your device" },
                { icon: Zap, title: "Always Free", desc: "No accounts, no paywalls" },
                { icon: Globe, title: "Works Everywhere", desc: "Any modern browser or device" },
              ].map((item) => (
                <Card key={item.title} className="border-border/50 text-center">
                  <CardContent className="pt-6">
                    <item.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h2 className="font-semibold text-base mb-1">{item.title}</h2>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    <h2 className="font-semibold text-lg">{item.q}</h2>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Still have a question we didn't answer?
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Faq;
