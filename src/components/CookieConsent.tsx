import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "toolzaply-cookie-consent";

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      // Small delay so it doesn't pop on first paint
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t border-border shadow-lg animate-in slide-in-from-bottom-4 duration-300"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="flex-1 text-sm text-muted-foreground">
            We use cookies to improve your experience and to serve relevant advertisements through
            Google AdSense. By clicking "Accept", you consent to our use of cookies as described in
            our{" "}
            <a href="/privacy" className="text-primary underline underline-offset-2 hover:text-primary/80">
              Privacy Policy
            </a>
            . You can manage your preferences at any time.
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              size="sm"
              variant="outline"
              onClick={decline}
              className="gap-1"
            >
              <X className="h-3.5 w-3.5" />
              Decline
            </Button>
            <Button size="sm" onClick={accept} className="bg-primary text-primary-foreground">
              Accept Cookies
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
