import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/Header";

export default function FAQ() {
  const seoConfig = {
    title: "FAQ - Frequently Asked Questions - Digital Toolbox",
    description:
      "Find answers to common questions about our free online tools. Learn how to use PDF converters, image tools, text converters and more.",
    keywords: [
      "digital toolbox faq",
      "online tools help",
      "pdf converter questions",
      "image tools support",
      "free tools guide",
      "how to use online tools",
    ],
    ogTitle: "FAQ - Digital Toolbox Help & Support",
    ogDescription:
      "Get help with our free online tools. Common questions and answers about PDF conversion, image processing, and more.",
    canonical: "https://digitaltoolbox.com/faq",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Are all tools in Digital Toolbox free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all tools in Digital Toolbox are completely free to use. No registration, subscription, or payment required.",
          },
        },
        {
          "@type": "Question",
          name: "How do I convert images to PDF?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Upload your images to our Image to PDF Converter tool, arrange them in the desired order, and click convert. The tool will merge all images into a single PDF document.",
          },
        },
        {
          "@type": "Question",
          name: "Is my data secure when using these tools?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all processing happens locally in your browser. Your files never leave your device, ensuring complete privacy and security.",
          },
        },
      ],
    },
  };

  const faqData = [
    {
      category: "General Questions",
      items: [
        {
          question: "Are all tools in Digital Toolbox free to use?",
          answer:
            "Yes, all tools in Digital Toolbox are completely free to use. No registration, subscription, or payment required. We believe in providing valuable tools without any cost barriers.",
        },
        {
          question: "Do I need to create an account to use the tools?",
          answer:
            "No, you don't need to create an account. All tools work immediately without any registration. Simply visit the tool you need and start using it right away.",
        },
        {
          question: "What file formats are supported?",
          answer:
            "We support a wide range of file formats including JPG, PNG, GIF, BMP, WebP for images; PDF for documents; and various text formats. Each tool page lists the specific formats it supports.",
        },
        {
          question: "Is there a file size limit?",
          answer:
            "Most tools have a 10MB file size limit per file to ensure fast processing and optimal performance. For larger files, we recommend splitting them into smaller parts.",
        },
      ],
    },
    {
      category: "PDF Tools",
      items: [
        {
          question: "How do I convert images to PDF?",
          answer:
            "Upload your images to our Image to PDF Converter tool, arrange them in the desired order, and click convert. The tool will merge all images into a single PDF document that you can download immediately.",
        },
        {
          question: "Can I merge multiple PDF files?",
          answer:
            "Yes, use our PDF Tools Suite to merge multiple PDF files into one. Simply upload all your PDF files, arrange them in the desired order, and click merge.",
        },
        {
          question: "How do I split a PDF file?",
          answer:
            "Upload your PDF to the PDF Tools Suite, select the 'Split PDF' option, and choose which pages to extract or split by page ranges.",
        },
        {
          question: "Can I extract text from PDF files?",
          answer:
            "Yes, our PDF Tools Suite includes a text extraction feature that can extract text content from PDF files, making it searchable and editable.",
        },
      ],
    },
    {
      category: "Image Tools",
      items: [
        {
          question: "How do I compress images without losing quality?",
          answer:
            "Our Image Compressor tool uses advanced algorithms to reduce file size while maintaining visual quality. You can adjust compression settings to find the perfect balance between size and quality.",
        },
        {
          question: "What image formats can I convert?",
          answer:
            "Our image tools support JPG, PNG, GIF, BMP, and WebP formats. You can convert between these formats and compress them for web use.",
        },
        {
          question: "Can I resize images online?",
          answer:
            "Yes, the Image Compressor tool allows you to resize images to specific dimensions while maintaining aspect ratio or cropping as needed.",
        },
      ],
    },
    {
      category: "Text & Conversion Tools",
      items: [
        {
          question: "How do I convert text case?",
          answer:
            "Use our Text Case Converter to transform text to uppercase, lowercase, title case, camelCase, snake_case, and more. Simply paste your text and select the desired format.",
        },
        {
          question: "Can I generate QR codes for any content?",
          answer:
            "Yes, our QR Code Generator can create QR codes for text, URLs, contact information, or any other data. You can also scan QR codes using the built-in scanner.",
        },
        {
          question: "How accurate is the unit converter?",
          answer:
            "Our Unit Converter provides accurate conversions for length, weight, temperature, area, volume, and speed. All conversions use standard conversion factors.",
        },
      ],
    },
    {
      category: "Privacy & Security",
      items: [
        {
          question: "Is my data secure when using these tools?",
          answer:
            "Yes, all processing happens locally in your browser. Your files never leave your device, ensuring complete privacy and security. We don't store or access your data.",
        },
        {
          question: "Do you collect any personal information?",
          answer:
            "No, we don't collect any personal information. Our tools work entirely in your browser without requiring any data transmission to our servers.",
        },
        {
          question: "Can I use these tools for sensitive documents?",
          answer:
            "Yes, since all processing happens locally in your browser, your sensitive documents remain completely private and secure.",
        },
      ],
    },
    {
      category: "Technical Support",
      items: [
        {
          question: "What browsers are supported?",
          answer:
            "Our tools work on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your browser for optimal performance.",
        },
        {
          question: "Do the tools work on mobile devices?",
          answer:
            "Yes, all tools are mobile-friendly and work on smartphones and tablets. The interface automatically adapts to different screen sizes.",
        },
        {
          question: "What if a tool isn't working properly?",
          answer:
            "Try refreshing the page or clearing your browser cache. If the issue persists, check that you're using a supported file format and that your file size is within limits.",
        },
        {
          question: "Can I use these tools offline?",
          answer:
            "Currently, our tools require an internet connection to load initially, but once loaded, some basic functionality may work offline depending on your browser's caching.",
        },
      ],
    },
  ];

  return (
    <>
      <SEOHead config={seoConfig} />

      <div className="min-h-screen bg-gradient-subtle">
        <Header />

        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-muted-foreground">
                Find answers to common questions about our free online tools
              </p>
            </div>

            <div className="space-y-8">
              {faqData.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      {category.category}
                    </CardTitle>
                    <CardDescription>
                      Common questions about {category.category.toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.items.map((item, itemIndex) => (
                        <AccordionItem
                          key={itemIndex}
                          value={`item-${categoryIndex}-${itemIndex}`}
                        >
                          <AccordionTrigger className="text-left">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-12">
              <CardHeader>
                <CardTitle>Still Need Help?</CardTitle>
                <CardDescription>
                  Can't find the answer you're looking for? Here are some
                  additional resources:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Tool-Specific Help</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Each tool page includes detailed instructions</li>
                      <li>• Look for the "How to use" section</li>
                      <li>
                        • Check the tool description for supported formats
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Best Practices</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Use supported file formats for best results</li>
                      <li>
                        • Keep file sizes under 10MB for optimal performance
                      </li>
                      <li>• Use modern browsers for full functionality</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
