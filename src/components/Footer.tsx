import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const toolLinks = [
    { label: "Image to PDF", href: "/tools/image-to-pdf" },
    { label: "PDF Tools", href: "/tools/pdf-tools" },
    { label: "Image Compressor", href: "/tools/image-compressor" },
    { label: "QR Code Tools", href: "/tools/qr-tools" },
    { label: "Text Converter", href: "/tools/text-converter" },
    { label: "Unit Converter", href: "/tools/unit-converter" },
    { label: "Color Tools", href: "/tools/color-tools" },
    { label: "Resume Builder", href: "/tools/resume-builder" },
    { label: "Markdown Editor", href: "/tools/markdown-editor" },
    { label: "Typing Test", href: "/tools/typing-test" },
    { label: "Timer Tools", href: "/tools/timer-tools" },
    { label: "Age Calculator", href: "/tools/age-calculator" },
    { label: "Fake Data Generator", href: "/tools/fake-data-generator" },
  ];

  const legalLinks = [
    { label: "About Us", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="border-t bg-background mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-bold text-lg text-foreground">Toolzaply</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A free, privacy-first suite of online tools. All processing runs directly in your
              browser — your files never leave your device.
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              Supported by ads. We use Google AdSense to display relevant advertisements. No
              personal data is collected or sold.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">
              Tools
            </h3>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                This site uses cookies and displays ads via Google AdSense. By using this site you
                agree to our{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Toolzaply. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
