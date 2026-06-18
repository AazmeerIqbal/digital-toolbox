import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import {
  Users,
  Target,
  Heart,
  Lightbulb,
  Shield,
  Zap,
  Globe,
  CheckCircle,
  BookOpen,
  Code,
  Lock,
  Award,
} from "lucide-react";

const seoConfig = {
  title: "About Toolzaply — Free Online Tools Built for Privacy & Speed",
  description:
    "Learn about Toolzaply: our mission, the story behind the platform, our commitment to privacy-first design, and why we built 13+ free browser-based tools for everyday digital tasks.",
  keywords: [
    "about toolzaply",
    "free online tools platform",
    "browser based tools",
    "privacy first tools",
    "no upload tools",
    "toolzaply mission",
    "free productivity tools",
  ],
  canonical: "https://toolzaply.com/about",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Toolzaply",
    description:
      "Toolzaply is a free, privacy-first suite of browser-based digital tools for everyday productivity tasks.",
    url: "https://toolzaply.com/about",
    publisher: {
      "@type": "Organization",
      name: "Toolzaply",
      url: "https://toolzaply.com",
    },
  },
};

const tools = [
  { name: "PDF Tools Suite", href: "/tools/pdf-tools", desc: "Merge, split, compress, rotate & extract" },
  { name: "Image to PDF", href: "/tools/image-to-pdf", desc: "Combine images into PDF documents" },
  { name: "Image Compressor", href: "/tools/image-compressor", desc: "Reduce file size without quality loss" },
  { name: "QR Code Tools", href: "/tools/qr-tools", desc: "Generate & scan QR codes instantly" },
  { name: "Color Tools", href: "/tools/color-tools", desc: "HEX, RGB, HSL converter & palettes" },
  { name: "Text Converter", href: "/tools/text-converter", desc: "Case, encoding & format conversion" },
  { name: "Unit Converter", href: "/tools/unit-converter", desc: "Length, weight, temperature & more" },
  { name: "Resume Builder", href: "/tools/resume-builder", desc: "Professional templates with PDF export" },
  { name: "Markdown Editor", href: "/tools/markdown-editor", desc: "Write & preview Markdown live" },
  { name: "Typing Speed Test", href: "/tools/typing-test", desc: "Measure WPM and accuracy" },
  { name: "Pomodoro Timer", href: "/tools/timer-tools", desc: "Focus timers and productivity modes" },
  { name: "Age Calculator", href: "/tools/age-calculator", desc: "Calculate exact age from birthdate" },
  { name: "Fake Data Generator", href: "/tools/fake-data-generator", desc: "Realistic test data for developers" },
];

const About = () => {
  return (
    <>
      <SEOHead config={seoConfig} />

      <div className="min-h-screen bg-gradient-subtle flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-16 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Hero */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                About Toolzaply
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Toolzaply is a free, privacy-first collection of browser-based digital tools
                designed to make everyday tasks faster, easier, and more secure — without
                requiring uploads, accounts, or software installations.
              </p>
            </div>

            {/* Mission & Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Target className="h-6 w-6 text-primary" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed space-y-3">
                  <p>
                    Our mission is to democratize access to powerful digital tools. We believe
                    that professional-grade utilities — PDF editors, image processors, resume
                    builders, and more — should be available to everyone, free of charge and
                    free of complexity.
                  </p>
                  <p>
                    Every tool on Toolzaply is designed to solve a real problem efficiently.
                    We don't add features for their own sake; we focus on building tools that
                    work exactly as expected the first time you use them.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Lock className="h-6 w-6 text-primary" />
                    Privacy by Design
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed space-y-3">
                  <p>
                    Privacy isn't an afterthought at Toolzaply — it's the architectural
                    foundation. Every single tool on this platform processes your data
                    entirely within your web browser using client-side JavaScript and
                    Web APIs.
                  </p>
                  <p>
                    This means your files, documents, images, and personal data are
                    <strong className="text-foreground"> never uploaded to our servers</strong>,
                    never stored in the cloud, and never visible to us or any third party.
                    You are in complete control of your data at all times.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Our Story */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Toolzaply was born out of a simple frustration: the best online tools for
                  everyday tasks were either paywalled, required an account sign-up, or
                  uploaded your files to a remote server — raising significant privacy concerns.
                  Professionals working with sensitive documents shouldn't have to choose
                  between convenience and security.
                </p>
                <p>
                  We set out to build a different kind of platform. One where you could open
                  a browser tab, compress an image or merge a PDF, and close the tab — without
                  ever wondering whether your file ended up on someone else's server. Modern
                  browsers are extraordinarily capable, and we leverage those capabilities fully:
                  PDF parsing and generation, image processing, real-time text conversion, and
                  more, all running locally on your device.
                </p>
                <p>
                  What started as a handful of tools has grown into a suite of{" "}
                  <strong className="text-foreground">13 fully-featured utilities</strong> spanning
                  PDF management, image processing, text conversion, productivity, design, and
                  developer tools. Each tool is actively maintained and continuously improved
                  based on user feedback and emerging browser capabilities.
                </p>
                <p>
                  The platform is supported by Google AdSense advertising, which allows us to
                  keep all tools completely free forever. We are committed to maintaining a
                  clean, non-intrusive ad experience that doesn't compromise the usability
                  of the tools.
                </p>
              </div>
            </section>

            {/* What Makes Us Different */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                What Makes Toolzaply Different
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Shield,
                    title: "No Uploads, Ever",
                    desc: "Every computation runs inside your browser tab. Your PDF, image, or document never travels over the network to our servers.",
                  },
                  {
                    icon: Zap,
                    title: "Instant Results",
                    desc: "Because processing happens locally, there's no upload wait time, no processing queue, and no download delay. Results appear in seconds.",
                  },
                  {
                    icon: Globe,
                    title: "Works Everywhere",
                    desc: "No app to install, no OS limitation. If you have a modern web browser — Chrome, Firefox, Safari, Edge — every tool works identically.",
                  },
                  {
                    icon: CheckCircle,
                    title: "No Account Required",
                    desc: "We don't want your email address. We don't send newsletters. Every tool is available immediately, to everyone, without registration.",
                  },
                  {
                    icon: Heart,
                    title: "Always Free",
                    desc: "There are no premium tiers, no trial limits, and no usage caps. All 13 tools are completely free with no strings attached.",
                  },
                  {
                    icon: Lightbulb,
                    title: "Actively Maintained",
                    desc: "We update tools regularly to fix bugs, add features, and keep up with evolving web standards and user feedback.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full border-border/50 hover:border-primary/20 transition-colors">
                      <CardContent className="pt-6 space-y-3">
                        <item.icon className="h-8 w-8 text-primary" />
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Tools Directory */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                All 13 Free Tools
              </h2>
              <p className="text-muted-foreground mb-8">
                Each tool below runs entirely in your browser. Click any tool to start using
                it immediately — no sign-up, no download, no waiting.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    to={tool.href}
                    className="flex items-start gap-3 p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                  >
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {tool.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{tool.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Technical Approach */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                How We Build Our Tools
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Toolzaply is built as a modern single-page application using React and
                  TypeScript, served as a static site with no server-side rendering required
                  for the tools themselves. This architecture choice was deliberate: it means
                  the tools work even with intermittent connectivity, load almost instantly
                  due to aggressive caching, and scale to any number of users without
                  additional infrastructure costs that we'd need to pass on to users.
                </p>
                <p>
                  Individual tools use purpose-built libraries optimized for browser execution.
                  Our PDF tools use <code>pdf-lib</code> for generation and modification, and
                  <code> pdfjs-dist</code> for rendering and text extraction. Image processing
                  relies on native <code>Canvas</code> APIs and the{" "}
                  <code>browser-image-compression</code> library. QR code generation uses the
                  <code> qrcode.react</code> library backed by a pure JavaScript QR encoder
                  that runs entirely in-memory.
                </p>
                <p>
                  We take the security of this approach seriously. We regularly audit our
                  dependencies, use Content Security Policy headers, and deliberately avoid
                  any third-party services that could intercept user data.
                </p>
              </div>
            </section>

            {/* Blog CTA */}
            <Card className="border-border/50 bg-primary/5 mb-8">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <BookOpen className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Learn More on Our Blog
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      We publish practical guides on productivity, web development, PDF management,
                      image optimization, and the tools we build. All articles are free to read.
                    </p>
                    <Link
                      to="/blog"
                      className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                    >
                      Browse all articles →
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "13+", label: "Free Tools" },
                { value: "100%", label: "Browser-Based" },
                { value: "0", label: "Uploads to Server" },
                { value: "∞", label: "Free Uses" },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-lg border border-border/50 bg-card">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
