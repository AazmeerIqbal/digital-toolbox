import { useEffect } from "react";

const AD_CLIENT = "ca-pub-1763845209260560";
const AD_SLOT = "6111602804"; // Vertical manual ad slot

type Side = "left" | "right";

function SideAd({ side }: { side: Side }) {
  useEffect(() => {
    if (!import.meta.env.PROD) return;
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (_) {
      // no-op
    }
  }, []);

  if (!import.meta.env.PROD) return null;

  const positionClass = side === "left" ? "left-2" : "right-2";

  return (
    <div
      className={`fixed ${positionClass} top-1/2 -translate-y-1/2 hidden xl:block`}
      style={{ zIndex: 20 }}
      aria-hidden="false"
    >
      <div className="w-[160px] 2xl:w-[300px]">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={AD_SLOT}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

export default function SideAds() {
  if (!import.meta.env.PROD) return null;
  return (
    <>
      <SideAd side="left" />
      <SideAd side="right" />
    </>
  );
}
