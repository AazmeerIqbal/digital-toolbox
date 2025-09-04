import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";
import { Mail, MessageCircle, HelpCircle, Bug, Lightbulb } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const seoConfig = {
    title: "Contact Us - Digital Toolbox | Get in Touch",
    description: "Contact Digital Toolbox for support, feedback, bug reports, or feature requests. We're here to help improve your experience.",
    keywords: ["contact digital toolbox", "support", "feedback", "bug report", "feature request", "help"],
    canonical: "https://digitaltoolbox.com/contact"
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we'll just show an alert. In a real implementation,
    // you'd send this to your backend or email service
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
              <Mail className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-muted-foreground">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us more about your question, feedback, or issue..."
                        rows={6}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-6 w-6 text-primary" />
                      Common Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Are the tools really free?</h4>
                      <p className="text-sm text-muted-foreground">
                        Yes! All tools are completely free with no hidden costs or limitations.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Is my data safe?</h4>
                      <p className="text-sm text-muted-foreground">
                        Absolutely. All processing happens locally in your browser - your files never leave your device.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Can I use tools for commercial purposes?</h4>
                      <p className="text-sm text-muted-foreground">
                        Yes, you can use our tools for both personal and commercial projects.
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
                        <Bug className="h-5 w-5 text-red-500" />
                        <span className="text-sm">Bug reports and technical issues</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        <span className="text-sm">Feature requests and suggestions</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MessageCircle className="h-5 w-5 text-blue-500" />
                        <span className="text-sm">General feedback and questions</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-green-500" />
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
                        We typically respond to messages within 24-48 hours. For urgent issues, 
                        please mention "URGENT" in your subject line.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;
