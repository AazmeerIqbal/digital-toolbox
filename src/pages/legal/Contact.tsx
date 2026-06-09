import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Mail, MessageCircle, HelpCircle, Bug, Lightbulb, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const seoConfig = {
    title: "Contact Us - Toolzaply | Get in Touch",
    description:
      "Contact Toolzaply for support, feedback, bug reports, or feature requests. We're here to help improve your experience.",
    keywords: [
      "contact toolzaply",
      "support",
      "feedback",
      "bug report",
      "feature request",
      "help",
    ],
    canonical: "https://toolzaply.com/contact",
  };

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate async send (replace with a real email service like EmailJS / Formspree)
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. We'll get back to you within 24–48 hours.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <Mail className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Contact Us</h1>
              <p className="text-xl text-muted-foreground">
                We'd love to hear from you. Send us a message and we'll respond as soon as
                possible.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Contact Form */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          disabled={submitting}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Email <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          disabled={submitting}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Subject <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="What's this about?"
                        disabled={submitting}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Message <span className="text-destructive">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us more about your question, feedback, or issue..."
                        rows={6}
                        disabled={submitting}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={submitting}>
                      <Send className="h-4 w-4 mr-2" />
                      {submitting ? "Sending…" : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Info Side */}
              <div className="space-y-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      Direct Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Prefer to write directly? Email us at:
                    </p>
                    <a
                      href="mailto:support@toolzaply.com"
                      className="text-primary font-medium hover:underline"
                    >
                      support@toolzaply.com
                    </a>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-6 w-6 text-primary" />
                      Common Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        Are the tools really free?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Yes — all tools are completely free with no hidden costs or limits.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Is my data safe?</h4>
                      <p className="text-sm text-muted-foreground">
                        Absolutely. All processing happens locally in your browser. Your files
                        never leave your device.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        Can I use tools for commercial purposes?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Yes, you're free to use our tools for both personal and commercial projects.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>What to Contact Us About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Bug className="h-5 w-5 text-red-500 flex-shrink-0" />
                        <span className="text-sm">Bug reports and technical issues</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Lightbulb className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                        <span className="text-sm">Feature requests and suggestions</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MessageCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                        <span className="text-sm">General feedback and questions</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">Help with using specific tools</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h4 className="font-semibold text-foreground mb-2">Response Time</h4>
                      <p className="text-sm text-muted-foreground">
                        We typically respond within <strong>24–48 hours</strong>. For urgent
                        issues, please include "URGENT" in your subject line.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
