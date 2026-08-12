import { useEffect, useRef } from "react";

// Extend Window interface for AdSense
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const CLIENT_ID = "ca-pub-1763845209260560";

// Detect dummy/placeholder slots that would cause 400 Bad Request errors during crawler reviews
const isPlaceholderSlot = (slot: string | undefined): boolean => {
  if (!slot) return true;
  const dummySlots = [
    "1234567890",
    "0987654321",
    "1122334455",
    "5566778899",
    "0000000000",
    "123456789",
  ];
  return dummySlots.includes(slot) || slot.length < 8;
};

interface AdSenseProps {
  adSlot?: string;
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

  const isDummy = isPlaceholderSlot(adSlot);

  useEffect(() => {
    // Only push once per mount, only in production, and only for valid custom ad slots
    if (
      process.env.NODE_ENV !== "production" ||
      pushed.current ||
      !insRef.current ||
      isDummy
    ) {
      return;
    }
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      // Gracefully ignore AdSense errors
    }
  }, [isDummy]);

  // In development, show a labelled placeholder
  if (process.env.NODE_ENV !== "production") {
    return (
      <div
        className={`flex items-center justify-center border-2 border-dashed border-muted rounded-lg bg-muted/20 text-xs text-muted-foreground ${className}`}
        style={{ minHeight: 90, ...style }}
      >
        Ad placeholder {adSlot ? `— slot ${adSlot}` : "(Auto Ads)"}
      </div>
    );
  }

  // If slot is dummy/unconfigured in production, render a safe container (Auto Ads will place ads automatically)
  if (isDummy || !adSlot) {
    return (
      <div
        className={`adsbygoogle-container ${className}`}
        style={{ minHeight: 0, ...style }}
        aria-hidden="true"
      />
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

// ─── Predefined placements (Safe for review, Auto Ads handles positioning) ────

export const TopBannerAd = () => (
  <div className="w-full mb-6">
    <AdSense adFormat="banner" className="w-full" style={{ minHeight: 90 }} />
  </div>
);

export const SidebarAd = () => (
  <div className="mb-6">
    <AdSense adFormat="rectangle" className="w-full" style={{ minHeight: 250 }} />
  </div>
);

export const InContentAd = () => (
  <div className="my-8">
    <AdSense adFormat="auto" className="w-full" style={{ minHeight: 100 }} />
  </div>
);

export const BottomBannerAd = () => (
  <div className="w-full mt-8">
    <AdSense adFormat="leaderboard" className="w-full" style={{ minHeight: 90 }} />
  </div>
);

