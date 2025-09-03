import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Load Google AdSense only in production builds
if (import.meta.env.PROD) {
  const existingAdScript = document.querySelector(
    'script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
  );
  if (!existingAdScript) {
    const adScript = document.createElement("script");
    adScript.async = true;
    adScript.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1763845209260560";
    adScript.crossOrigin = "anonymous";
    document.head.appendChild(adScript);
  }
}

createRoot(document.getElementById("root")!).render(<App />);
