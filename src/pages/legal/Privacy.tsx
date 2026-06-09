import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Shield, Eye, Lock, Server, Cookie, ExternalLink } from "lucide-react";

const Privacy = () => {
  const seoConfig = {
    title: "Privacy Policy - Toolzaply | Your Data Security",
    description:
      "Learn how Toolzaply protects your privacy. All tools work locally in your browser — your files never leave your device.",
    keywords: [
      "privacy policy",
      "data security",
      "local processing",
      "browser tools",
      "no data collection",
      "cookie policy",
      "GDPR",
    ],
    canonical: "https://toolzaply.com/privacy",
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
              <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Privacy Policy
              </h1>
              <p className="text-xl text-muted-foreground">
                Your privacy is our priority. Learn how we protect your data.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Effective date: <strong>June 1, 2025</strong> &nbsp;|&nbsp; Last updated:{" "}
                <strong>June 10, 2025</strong>
              </p>
            </div>

            <div className="space-y-8">
              {/* Data Processing */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-6 w-6 text-primary" />
                    Data Processing &amp; Storage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    <strong>Local Processing Only:</strong> All tools on Toolzaply work entirely
                    within your browser using client-side JavaScript. Your files, documents, images,
                    and any data you process never leave your device or get uploaded to our servers.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>No Data Storage:</strong> We do not store, save, or have access to any
                    files or content you process using our tools. Everything happens locally on your
                    computer and is automatically cleared when you close the browser or navigate
                    away.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Temporary Browser Storage:</strong> Some tools (such as the Markdown
                    Editor) use your browser's <code>localStorage</code> to save work-in-progress
                    content between sessions. This data stays entirely on your device and can be
                    cleared at any time via your browser settings.
                  </p>
                </CardContent>
              </Card>

              {/* Information We Collect */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-6 w-6 text-primary" />
                    Information We Collect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    <strong>No Personal Data:</strong> We do not collect names, email addresses,
                    phone numbers, or any other personally identifiable information. No account
                    registration is required to use our tools.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Anonymous Analytics:</strong> We may use privacy-respecting analytics
                    to understand aggregate usage patterns (e.g., which tools are most popular).
                    This data is fully anonymised and cannot be traced back to an individual user.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Server Logs:</strong> Standard web server logs automatically record
                    basic technical data such as IP addresses, browser type, referring URLs, and
                    page access times. These logs are used solely for security and performance
                    monitoring and are retained for no longer than 30 days.
                  </p>
                </CardContent>
              </Card>

              {/* Cookie Policy */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cookie className="h-6 w-6 text-primary" />
                    Cookie Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Toolzaply uses cookies and similar tracking technologies. Below is a breakdown
                    of the categories of cookies we use:
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 bg-muted/40 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-1">
                        Strictly Necessary Cookies
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        These cookies are essential for the website to function. They include your
                        theme preference (light/dark mode) and cookie consent status stored in
                        <code> localStorage</code>. These cannot be disabled.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/40 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-1">
                        Advertising Cookies (Google AdSense)
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        We display advertisements via <strong>Google AdSense</strong>. Google may
                        use cookies (including the <code>_ga</code>, <code>IDE</code>, and{" "}
                        <code>NID</code> cookies) to show you personalised ads based on your
                        browsing history and interests. These cookies are set by Google's domains
                        and are governed by{" "}
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                          Google's Privacy Policy
                          <ExternalLink className="h-3 w-3" />
                        </a>
                        .
                      </p>
                    </div>
                    <div className="p-4 bg-muted/40 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-1">Analytics Cookies</h4>
                      <p className="text-sm text-muted-foreground">
                        We may use analytics cookies to collect aggregate data about site traffic
                        and usage. All data is anonymised before processing.
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    You can manage or opt out of personalised advertising at any time by visiting{" "}
                    <a
                      href="https://adssettings.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Google Ad Settings
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    . You can also opt out via the{" "}
                    <a
                      href="https://optout.aboutads.info/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Digital Advertising Alliance
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    .
                  </p>
                </CardContent>
              </Card>

              {/* Third-Party Services */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-6 w-6 text-primary" />
                    Third-Party Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    <strong>Google AdSense:</strong> We partner with Google AdSense to display
                    advertisements that help fund the free operation of Toolzaply. Google uses
                    cookies and device identifiers to serve ads relevant to your interests. For
                    more information, please review{" "}
                    <a
                      href="https://policies.google.com/technologies/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      How Google uses information from sites that use its services
                    </a>
                    .
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Content Delivery Networks (CDN):</strong> We use CDNs to ensure fast
                    loading times globally. These services may log basic access information for
                    performance monitoring purposes.
                  </p>
                </CardContent>
              </Card>

              {/* GDPR / CCPA */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Your Rights (GDPR &amp; CCPA)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    If you are located in the European Economic Area (EEA) or California, you have
                    specific privacy rights:
                  </p>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                    <li>
                      <strong>Right to Access:</strong> You can request a copy of the personal
                      data we hold about you (note: we hold none beyond server logs).
                    </li>
                    <li>
                      <strong>Right to Erasure:</strong> You may request deletion of any personal
                      data we hold. Server logs are automatically purged after 30 days.
                    </li>
                    <li>
                      <strong>Right to Object:</strong> You may opt out of personalised
                      advertising via{" "}
                      <a
                        href="https://adssettings.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Google Ad Settings
                      </a>
                      .
                    </li>
                    <li>
                      <strong>Cookie Withdrawal:</strong> You can withdraw your cookie consent at
                      any time by clearing your browser's localStorage and cookies.
                    </li>
                  </ul>
                  <p className="text-muted-foreground">
                    To exercise any of these rights, please{" "}
                    <a href="/contact" className="text-primary hover:underline">
                      contact us
                    </a>
                    .
                  </p>
                </CardContent>
              </Card>

              {/* Your Rights & Choices */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Your Choices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Since we don't collect or store personal data, there is no personal information
                    to access, modify, or delete on our end. You maintain complete control over
                    any data you process using our tools.
                  </p>
                  <p className="text-muted-foreground">
                    You can clear your browser's local storage at any time to remove any saved
                    preferences or draft content. You can also install a browser ad blocker or
                    adjust your browser's cookie settings to control advertising cookies, noting
                    that some features may behave differently.
                  </p>
                </CardContent>
              </Card>

              {/* Security */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Security Measures</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our website is served over HTTPS (TLS encryption) to protect data in transit.
                    All tool processing happens client-side, meaning your data is inherently more
                    secure than cloud-based alternatives where files are uploaded to remote
                    servers. We apply standard security practices including regular dependency
                    updates and Content Security Policy headers.
                  </p>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    If you have any questions, concerns, or requests regarding this Privacy Policy
                    or our data practices, please reach out through our{" "}
                    <a href="/contact" className="text-primary hover:underline">
                      Contact page
                    </a>
                    . We aim to respond within 48 hours.
                  </p>
                </CardContent>
              </Card>

              <div className="text-center mt-12 p-6 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  This Privacy Policy may be updated periodically. We will update the "Last
                  updated" date at the top of this page when changes are made. Continued use of
                  Toolzaply after changes constitutes acceptance of the updated policy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Privacy;
