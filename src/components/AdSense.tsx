import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Extend Window interface for AdSense
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSenseProps {
  adSlot: string;
  adFormat:
    | "auto"
    | "fluid"
    | "rectangle"
    | "banner"
    | "leaderboard"
    | "sidebar";
  className?: string;
  style?: React.CSSProperties;
}

export const AdSense = ({
  adSlot,
  adFormat,
  className = "",
  style = {},
}: AdSenseProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only load ads in production and when the component is mounted
    if (process.env.NODE_ENV === "production" && adRef.current) {
      try {
        // Create the AdSense ad
        const adElement = document.createElement("ins");
        adElement.className = "adsbygoogle";
        adElement.style.display = "block";
        adElement.setAttribute("data-ad-client", "ca-pub-1763845209260560");
        adElement.setAttribute("data-ad-slot", adSlot);
        adElement.setAttribute("data-ad-format", adFormat);
        adElement.setAttribute("data-full-width-responsive", "true");

        // Clear the container and append the ad
        if (adRef.current) {
          adRef.current.innerHTML = "";
          adRef.current.appendChild(adElement);
        }

        // Push the ad to AdSense
        if (window.adsbygoogle) {
          window.adsbygoogle.push({});
        }
      } catch (error) {
        console.warn("AdSense error:", error);
      }
    }
  }, [adSlot, adFormat]);

  // In development, show a placeholder
  if (process.env.NODE_ENV === "development") {
    return (
      <Card className={`border-dashed border-2 ${className}`} style={style}>
        <CardContent className="p-4 text-center">
          <div className="text-sm text-muted-foreground">
            <div className="font-medium mb-2">AdSense Placeholder</div>
            <div className="text-xs">
              Slot: {adSlot} | Format: {adFormat}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div ref={adRef} className={`ad-container ${className}`} style={style} />
  );
};

// Predefined ad components for common placements
export const TopBannerAd = () => (
  <div className="w-full mb-6">
    <AdSense
      adSlot="1234567890"
      adFormat="banner"
      className="w-full"
      style={{ minHeight: "90px" }}
    />
  </div>
);

export const SidebarAd = () => (
  <div className="mb-6">
    <AdSense
      adSlot="0987654321"
      adFormat="rectangle"
      className="w-full"
      style={{ minHeight: "250px" }}
    />
  </div>
);

export const InContentAd = () => (
  <div className="my-8">
    <AdSense
      adSlot="1122334455"
      adFormat="auto"
      className="w-full"
      style={{ minHeight: "100px" }}
    />
  </div>
);

export const BottomBannerAd = () => (
  <div className="w-full mt-8">
    <AdSense
      adSlot="5566778899"
      adFormat="leaderboard"
      className="w-full"
      style={{ minHeight: "90px" }}
    />
  </div>
);
