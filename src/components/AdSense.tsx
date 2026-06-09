import { useEffect, useRef } from "react";

// Extend Window interface for AdSense
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const CLIENT_ID = "ca-pub-1763845209260560";

interface AdSenseProps {
  adSlot: string;
  adFormat?: "auto" | "fluid" | "rectangle" | "banner" | "leaderboard" | "sidebar";
  className?: string;
  style?: React.CSSProperties;
}

export const AdSense = ({
  adSlot,
  adFormat = "auto",
  className = "",
  style = {},
}: AdSenseProps) => {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    // Only push once per mount and only in production
    if (
      process.env.NODE_ENV !== "production" ||
      pushed.current ||
      !insRef.current
    ) {
      return;
    }
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      // Gracefully ignore AdSense errors
    }
  }, []);

  // In development, show a labelled placeholder
  if (process.env.NODE_ENV !== "production") {
    return (
      <div
        className={`flex items-center justify-center border-2 border-dashed border-muted rounded-lg bg-muted/20 text-xs text-muted-foreground ${className}`}
        style={{ minHeight: 90, ...style }}
      >
        Ad placeholder — slot {adSlot}
      </div>
    );
  }

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle ${className}`}
      style={{ display: "block", ...style }}
      data-ad-client={CLIENT_ID}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
};

// ─── Predefined placements ────────────────────────────────────────────────────

export const TopBannerAd = () => (
  <div className="w-full mb-6">
    <AdSense adSlot="1234567890" adFormat="banner" className="w-full" style={{ minHeight: 90 }} />
  </div>
);

export const SidebarAd = () => (
  <div className="mb-6">
    <AdSense adSlot="0987654321" adFormat="rectangle" className="w-full" style={{ minHeight: 250 }} />
  </div>
);

export const InContentAd = () => (
  <div className="my-8">
    <AdSense adSlot="1122334455" adFormat="auto" className="w-full" style={{ minHeight: 100 }} />
  </div>
);

export const BottomBannerAd = () => (
  <div className="w-full mt-8">
    <AdSense adSlot="5566778899" adFormat="leaderboard" className="w-full" style={{ minHeight: 90 }} />
  </div>
);
