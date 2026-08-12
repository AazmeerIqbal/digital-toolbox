/**
 * Post-build prerender: generates static HTML for every route so that
 * crawlers (Google Search, AdSense review) see full page content without
 * executing JavaScript. React hydrates over the static content on load.
 *
 * Runs after `vite build` — see the "build" script in package.json.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

import { tools } from "../src/data/tools";
import { toolGuides } from "../src/data/tool-guides";
import { blogs } from "../src/data/blogs";
import { faqItems } from "../src/data/faq";
import { seoConfigs, siteConfig } from "../src/lib/seo-config";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");

const template = readFileSync(join(DIST, "index.html"), "utf-8");

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ---------------------------------------------------------------------------
// Shared page chrome (crawler-visible header / footer with internal links)
// ---------------------------------------------------------------------------

const headerHtml = `
<header>
  <nav aria-label="Main navigation">
    <a href="/">Toolzaply</a>
    <a href="/#tools">All Tools</a>
    <a href="/blog">Blog</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
</header>`;

const footerHtml = `
<footer>
  <section>
    <h2>Toolzaply</h2>
    <p>Free browser-based tools for PDF conversion, image compression, QR codes, and more.
    All processing happens locally on your device — your files never leave your computer.</p>
  </section>
  <nav aria-label="Tools">
    <h2>Popular Tools</h2>
    <ul>
      ${tools.slice(0, 8).map((t) => `<li><a href="${t.route}">${esc(t.title)}</a></li>`).join("\n      ")}
    </ul>
  </nav>
  <nav aria-label="Site">
    <h2>Site</h2>
    <ul>
      <li><a href="/about">About Us</a></li>
      <li><a href="/blog">Blog &amp; Guides</a></li>
      <li><a href="/faq">FAQ</a></li>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms of Service</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</footer>`;

const page = (main: string) => `${headerHtml}\n<main>${main}</main>\n${footerHtml}`;

// ---------------------------------------------------------------------------
// Route content builders
// ---------------------------------------------------------------------------

interface RouteDef {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  structuredData?: object | object[];
  body: string;
}

const routes: RouteDef[] = [];

// ---- Home ----
const homeSeo = seoConfigs["home"];
routes.push({
  path: "/",
  title: homeSeo.title,
  description: homeSeo.description,
  keywords: homeSeo.keywords,
  structuredData: homeSeo.structuredData,
  body: page(`
    <h1>Toolzaply — Free Online Tools for Everyday Digital Tasks</h1>
    <p>Toolzaply is a collection of ${tools.length} free browser-based tools designed to simplify
    everyday digital tasks. Convert Word documents and images to PDF, compress photos, generate QR
    codes, test your typing speed, build a resume, and more — all completely free, with no
    registration and no file uploads.</p>
    <p>Every tool runs entirely in your browser using client-side processing. Your files and data
    never leave your device, which means maximum privacy and lightning-fast performance. Whether
    you're a professional, student, or casual user, our tools save you time without compromising
    your security.</p>

    <h2>All Tools</h2>
    <ul>
      ${tools.map((t) => `<li><a href="${t.route}"><strong>${esc(t.title)}</strong></a> — ${esc(t.description)}</li>`).join("\n      ")}
    </ul>

    <h2>Why Choose Toolzaply</h2>
    <ul>
      <li><strong>Lightning fast:</strong> all processing happens locally in your browser.</li>
      <li><strong>100% private:</strong> your files never leave your device.</li>
      <li><strong>No registration:</strong> start using any tool immediately.</li>
      <li><strong>Mobile friendly:</strong> responsive design works on all devices.</li>
      <li><strong>Always free:</strong> no hidden costs, subscriptions, or limits.</li>
    </ul>

    <h2>Frequently Asked Questions</h2>
    ${faqItems.slice(0, 5).map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("\n    ")}

    <h2>Latest Guides from Our Blog</h2>
    <ul>
      ${blogs.slice(0, 6).map((b) => `<li><a href="/blog/${b.slug}">${esc(b.title)}</a> — ${esc(b.excerpt)}</li>`).join("\n      ")}
    </ul>
    <p><a href="/blog">View all ${blogs.length} articles</a></p>
  `),
});

// ---- Tool pages ----
for (const tool of tools) {
  const guideKey = tool.id === "image-compressor" ? "imagecompressor" : tool.id;
  const guide = toolGuides[guideKey] || toolGuides[tool.id];
  const seo = seoConfigs[tool.id];

  const guideHtml = guide
    ? `
    <article>
      <h2>${esc(guide.headline)}</h2>
      <p>${esc(guide.intro)}</p>
      ${guide.sections
        .map(
          (s) => `
      <section>
        <h3>${esc(s.heading)}</h3>
        ${s.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("\n        ")}
      </section>`
        )
        .join("\n")}
      <section>
        <h3>Pro Tips &amp; Best Practices</h3>
        <ul>${guide.tips.map((t) => `<li>${esc(t)}</li>`).join("\n          ")}</ul>
      </section>
      <section>
        <h3>Common Mistakes to Avoid</h3>
        <ul>${guide.mistakes.map((m) => `<li>${esc(m)}</li>`).join("\n          ")}</ul>
      </section>
    </article>`
    : "";

  // Extract FAQs from structuredData if present
  let toolFaqHtml = "";
  if (seo?.structuredData && Array.isArray(seo.structuredData)) {
    const faqBlock = seo.structuredData.find(
      (b: any) => b["@type"] === "FAQPage" && Array.isArray(b.mainEntity)
    ) as any;
    if (faqBlock?.mainEntity?.length) {
      toolFaqHtml = `
      <section>
        <h2>Frequently Asked Questions about ${esc(tool.title)}</h2>
        ${faqBlock.mainEntity
          .map(
            (item: any) => `
        <div class="faq-item">
          <h3>${esc(item.name)}</h3>
          <p>${esc(item.acceptedAnswer?.text || "")}</p>
        </div>`
          )
          .join("\n        ")}
      </section>`;
    }
  }

  const related = tools.filter((t) => t.id !== tool.id && t.category === tool.category).slice(0, 4);

  routes.push({
    path: tool.route,
    title: seo?.title ?? `${tool.title} — Free Online Tool | Toolzaply`,
    description: seo?.description ?? tool.description,
    keywords: seo?.keywords,
    structuredData: seo?.structuredData,
    body: page(`
    <h1>${esc(tool.title)}</h1>
    <p>${esc(tool.description)}. Free, instant, no registration required, and your files never leave your device — all processing happens locally in your web browser.</p>
    
    <section>
      <h2>Why Use Toolzaply's ${esc(tool.title)}?</h2>
      <ul>
        <li><strong>100% Client-Side Privacy:</strong> Your documents and images are never uploaded to any remote server.</li>
        <li><strong>Instant Processing:</strong> Zero upload and download queue times — native JavaScript processing runs directly in your browser tab.</li>
        <li><strong>Completely Free:</strong> No subscriptions, no hidden watermarks, and no usage limits.</li>
        <li><strong>Cross-Platform:</strong> Works seamlessly on Windows, macOS, Linux, iOS, and Android.</li>
      </ul>
    </section>

    ${guideHtml}
    ${toolFaqHtml}

    ${
      related.length
        ? `<section><h2>Related Tools in ${esc(tool.category)}</h2><ul>${related
            .map((r) => `<li><a href="${r.route}">${esc(r.title)}</a> — ${esc(r.description)}</li>`)
            .join("")}</ul></section>`
        : ""
    }
  `),
  });
}

// ---- Blog listing ----
routes.push({
  path: "/blog",
  title: "Blog & Guides — Productivity Tips and Tool Tutorials | Toolzaply",
  description:
    "Practical guides, productivity tips, and in-depth tutorials on PDF management, image optimization, typing speed, color theory, and more.",
  keywords: ["productivity blog", "tool guides", "pdf tips", "image optimization guide"],
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Toolzaply Blog",
    url: `${siteConfig.url}/blog`,
  },
  body: page(`
    <h1>Blog &amp; Guides</h1>
    <p>Practical guides and tutorials to help you get the most out of digital tools — from PDF
    management and image optimization to productivity techniques and typing skills.</p>
    ${[...blogs]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(
        (b) => `
    <article>
      <h2><a href="/blog/${b.slug}">${esc(b.title)}</a></h2>
      <p>${esc(b.excerpt)}</p>
      <p><small>${esc(b.category)} · ${esc(b.date)} · ${esc(b.readTime)}</small></p>
    </article>`
      )
      .join("\n")}
  `),
});

// ---- Blog posts ----
for (const blog of blogs) {
  const contentHtml = marked.parse(blog.content, { async: false }) as string;
  routes.push({
    path: `/blog/${blog.slug}`,
    title: `${blog.title} | Toolzaply Blog`,
    description: blog.description,
    keywords: blog.keywords,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.description,
      datePublished: blog.date,
      author: { "@type": "Organization", name: blog.author || "Toolzaply" },
      publisher: { "@type": "Organization", name: "Toolzaply", url: siteConfig.url },
      mainEntityOfPage: `${siteConfig.url}/blog/${blog.slug}`,
    },
    body: page(`
    <article>
      ${contentHtml}
      <p><small>Published ${esc(blog.date)} · ${esc(blog.category)} · ${esc(blog.readTime)}</small></p>
    </article>
    <p><a href="/blog">← All articles</a></p>
  `),
  });
}

// ---- FAQ ----
routes.push({
  path: "/faq",
  title: "FAQ — Frequently Asked Questions | Toolzaply",
  description:
    "Answers to common questions about Toolzaply's free online tools: privacy, file handling, supported formats, size limits, browser support, and more.",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  body: page(`
    <h1>Frequently Asked Questions</h1>
    <p>Everything you need to know about using Toolzaply's free browser-based tools.</p>
    <section>
      <h2>Common Questions &amp; Answers</h2>
      ${faqItems.map((f) => `<div class="faq-entry"><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join("\n    ")}
    </section>
    <section>
      <h2>Still Have Questions?</h2>
      <p>Can't find the answer you're looking for? Reach out to us at <a href="/contact">our contact page</a> or email <a href="mailto:support@toolzaply.com">support@toolzaply.com</a>.</p>
    </section>
  `),
});

// ---- Legal / company pages (Comprehensive static HTML for crawlers and review bots) ----
const aboutSeo = seoConfigs["about"];
routes.push({
  path: "/about",
  title: aboutSeo?.title ?? "About Us | Toolzaply",
  description: aboutSeo?.description ?? "About Toolzaply — free browser-based tools.",
  structuredData: aboutSeo?.structuredData,
  body: page(`
    <h1>About Toolzaply — Free Online Tools Built for Privacy &amp; Speed</h1>
    <p>Toolzaply is a free, privacy-first collection of browser-based digital tools designed to make everyday tasks faster, easier, and more secure — without requiring uploads, accounts, or software installations.</p>
    
    <h2>Our Mission</h2>
    <p>Our mission is to democratize access to powerful digital tools. We believe that professional-grade utilities — PDF editors, image processors, resume builders, and more — should be available to everyone, free of charge and free of complexity.</p>
    <p>Every tool on Toolzaply is designed to solve a real problem efficiently. We focus on building tools that work exactly as expected the first time you use them, without dark patterns, paywalls, or forced subscriptions.</p>

    <h2>Privacy by Design: Zero Uploads</h2>
    <p>Privacy is the architectural foundation of Toolzaply. Every single tool on this platform processes your data entirely within your web browser using client-side JavaScript and modern Web APIs (Canvas, Web Workers, Typed Arrays).</p>
    <p>This means your files, documents, images, and personal data are <strong>never uploaded to our servers</strong>, never stored in the cloud, and never visible to us or any third party. You retain complete custody and control over your data at all times.</p>

    <h2>Our Story</h2>
    <p>Toolzaply was born out of a simple frustration: many online conversion and editing websites demand sign-ups, watermark user downloads, or transmit private files to remote servers without clear retention policies. Professionals and everyday users working with sensitive documents shouldn't have to sacrifice their privacy for convenience.</p>
    <p>We built Toolzaply to prove that modern browsers are powerful enough to handle heavy file operations locally. Today, Toolzaply provides a comprehensive suite of ${tools.length} free digital utilities spanning PDF management, image optimization, text manipulation, design, and developer tools.</p>
    <p>The platform is supported by Google AdSense advertising, which funds our hosting and maintenance while allowing all tools to remain completely free for everyone.</p>

    <h2>What Makes Toolzaply Different</h2>
    <ul>
      <li><strong>No Uploads, Ever:</strong> All computations execute locally on your device.</li>
      <li><strong>Instant Results:</strong> No waiting in server upload queues or conversion pipelines.</li>
      <li><strong>Cross-Platform Compatibility:</strong> Works smoothly in Chrome, Firefox, Safari, Edge, and mobile browsers.</li>
      <li><strong>No Account Required:</strong> No registration, email collection, or passwords.</li>
      <li><strong>100% Free Forever:</strong> No premium tiers, usage caps, or paywalls.</li>
    </ul>

    <h2>Our Tools Directory</h2>
    <ul>
      ${tools.map((t) => `<li><a href="${t.route}"><strong>${esc(t.title)}</strong></a> — ${esc(t.description)}</li>`).join("\n      ")}
    </ul>

    <h2>Technical Architecture</h2>
    <p>Toolzaply is built as a lightweight single-page application using React and TypeScript. Individual tools utilize optimized browser libraries: <code>pdf-lib</code> and <code>pdfjs-dist</code> for document manipulation, native Canvas APIs for graphic operations, and client-side compression algorithms.</p>
    <p>Have feedback or a tool suggestion? <a href="/contact">Contact our team</a>.</p>
  `),
});

const privacySeo = seoConfigs["privacy"];
routes.push({
  path: "/privacy",
  title: privacySeo?.title ?? "Privacy Policy | Toolzaply",
  description: privacySeo?.description ?? "Toolzaply privacy policy.",
  structuredData: privacySeo?.structuredData,
  body: page(`
    <h1>Privacy Policy — Toolzaply</h1>
    <p><em>Effective Date: June 1, 2025 | Last Updated: June 10, 2025</em></p>
    <p>Toolzaply is designed around a fundamental principle: <strong>your files and private data never leave your device.</strong> All tools execute locally in your web browser. We do not receive, store, or have access to any documents or images you process.</p>

    <h2>1. Data Processing &amp; Storage</h2>
    <p><strong>Local Client-Side Processing:</strong> When you convert a file, compress an image, or format text, the processing is performed entirely by JavaScript running on your computer or phone. No file data is transmitted across the internet to our servers.</p>
    <p><strong>No File Retention:</strong> Because we never receive your files, we do not store, copy, or retain any user content.</p>
    <p><strong>Browser LocalStorage:</strong> Some tools (such as the Markdown Editor) save your work-in-progress drafts to your browser's local storage (<code>localStorage</code>) so your work is preserved across refreshes. This data remains strictly on your device and can be cleared via browser settings at any time.</p>

    <h2>2. Information We Collect</h2>
    <p><strong>No Account or Personal Data:</strong> We do not require accounts, logins, names, email addresses, or phone numbers to use any of our tools.</p>
    <p><strong>Anonymous Server Logs:</strong> Standard web server logs record basic network details (such as IP addresses, browser types, requesting URLs, and timestamps) for security monitoring and abuse prevention. Server logs are automatically purged after 30 days.</p>

    <h2>3. Advertising &amp; Cookie Policy (Google AdSense)</h2>
    <p>Toolzaply is supported by advertising to keep our tools free for everyone. We partner with <strong>Google AdSense</strong> to display advertisements.</p>
    <p>Google and its advertising partners use cookies (such as <code>_ga</code>, <code>IDE</code>, <code>NID</code>, and DoubleClick cookies) and device identifiers to serve relevant ads based on prior visits to our website and other websites across the internet.</p>
    <p>You can learn more about how Google handles advertising data by reviewing <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google's Advertising Policies</a>.</p>
    <p><strong>Managing Your Ad Preferences:</strong> You can opt out of personalized advertising at any time by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a> or via <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">AboutAds.info</a>.</p>

    <h2>4. Your Rights Under GDPR &amp; CCPA</h2>
    <p>Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you have rights regarding access, deletion, and control of your personal data:</p>
    <ul>
      <li><strong>Right to Know / Access:</strong> You may inquire about any personal data we hold (we do not collect personal data beyond temporary server logs).</li>
      <li><strong>Right to Deletion:</strong> You may request deletion of server access logs associated with your IP address.</li>
      <li><strong>Right to Opt-Out:</strong> You may opt out of personalized ad tracking through Google Ad Settings and our cookie consent banner.</li>
    </ul>

    <h2>5. Security &amp; Contact</h2>
    <p>Our website enforces HTTPS with TLS encryption for all traffic. For privacy questions, requests, or inquiries, please contact us at <a href="mailto:support@toolzaply.com">support@toolzaply.com</a> or visit our <a href="/contact">Contact page</a>.</p>
  `),
});

const termsSeo = seoConfigs["terms"];
routes.push({
  path: "/terms",
  title: termsSeo?.title ?? "Terms of Service | Toolzaply",
  description: termsSeo?.description ?? "Toolzaply terms of service.",
  structuredData: termsSeo?.structuredData,
  body: page(`
    <h1>Terms of Service — Toolzaply</h1>
    <p><em>Last Updated: 2025</em></p>
    <p>By accessing and using Toolzaply, you accept and agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use our website or tools.</p>

    <h2>1. Description of Service</h2>
    <p>Toolzaply provides a collection of free online utilities for file conversion, image manipulation, text formatting, QR code generation, and productivity. All tools operate via client-side processing in your web browser.</p>

    <h2>2. Permitted Use</h2>
    <ul>
      <li>You are granted a non-exclusive license to use all tools for personal and commercial purposes.</li>
      <li>You retain full ownership and intellectual property rights in any content you create or process using our tools.</li>
      <li>You may share links to our website and tools freely.</li>
    </ul>

    <h2>3. Prohibited Conduct</h2>
    <ul>
      <li>You may not use our services for unlawful activities or to generate abusive, malicious, or infringing content.</li>
      <li>You may not attempt to disrupt the operation of the website through automated scraping, denial of service, or unauthorized vulnerability testing.</li>
    </ul>

    <h2>4. Disclaimers &amp; Limitation of Liability</h2>
    <p>Toolzaply is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. While we strive for high accuracy and reliability, we do not guarantee that file conversions or outputs will be error-free for every file type. Users should independently review important files before relying on them.</p>
    <p>To the fullest extent permitted by applicable law, Toolzaply shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our tools.</p>

    <h2>5. Governing Law &amp; Contact</h2>
    <p>These terms are governed by standard applicable legal frameworks. If you have questions about these Terms of Service, please contact us at <a href="/contact">our Contact page</a> or via email at <a href="mailto:support@toolzaply.com">support@toolzaply.com</a>.</p>
  `),
});

const contactSeo = seoConfigs["contact"];
routes.push({
  path: "/contact",
  title: contactSeo?.title ?? "Contact Us | Toolzaply",
  description: contactSeo?.description ?? "Contact Toolzaply.",
  structuredData: contactSeo?.structuredData,
  body: page(`
    <h1>Contact Us — Toolzaply</h1>
    <p>We welcome your questions, bug reports, feature suggestions, and feedback regarding any of our free online tools.</p>

    <h2>How to Reach Us</h2>
    <p><strong>Direct Email:</strong> <a href="mailto:support@toolzaply.com">support@toolzaply.com</a></p>
    <p><strong>Response Time:</strong> We aim to reply to all inquiries within 24 to 48 business hours.</p>

    <h2>What We Can Help With</h2>
    <ul>
      <li><strong>Bug Reports:</strong> Encountered an unexpected issue or conversion error? Let us know the browser and file details.</li>
      <li><strong>Feature Requests:</strong> Suggest new tools, export formats, or options you'd like to see.</li>
      <li><strong>General Inquiries:</strong> Questions about tool capabilities, privacy, or technical details.</li>
    </ul>

    <h2>Frequently Asked Questions</h2>
    <p>Before reaching out, check our <a href="/faq">FAQ page</a> for immediate answers to common questions regarding privacy, supported file formats, and device compatibility.</p>
  `),
});


// ---------------------------------------------------------------------------
// HTML generation
// ---------------------------------------------------------------------------

function buildHtml(route: RouteDef): string {
  let html = template;

  const canonical = `${siteConfig.url}${route.path === "/" ? "/" : route.path}`;

  // Title
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`);

  // Meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="description" content="${esc(route.description)}" />`
  );

  // Keywords (replace if provided)
  if (route.keywords?.length) {
    html = html.replace(
      /<meta\s+name="keywords"\s+content="[\s\S]*?"\s*\/>/,
      `<meta name="keywords" content="${esc(route.keywords.join(", "))}" />`
    );
  }

  // OG/Twitter title, description, url
  html = html
    .replace(
      /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="og:title" content="${esc(route.title)}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="og:description" content="${esc(route.description)}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="og:url" content="${canonical}" />`
    )
    .replace(
      /<meta\s+property="twitter:title"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="twitter:title" content="${esc(route.title)}" />`
    )
    .replace(
      /<meta\s+property="twitter:description"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="twitter:description" content="${esc(route.description)}" />`
    );

  // Canonical link + structured data appended to <head>
  let headExtras = `<link rel="canonical" href="${canonical}" />`;
  if (route.structuredData) {
    const blocks = Array.isArray(route.structuredData) ? route.structuredData : [route.structuredData];
    for (const block of blocks) {
      headExtras += `\n<script type="application/ld+json">${JSON.stringify(block)}</script>`;
    }
  }
  html = html.replace("</head>", `${headExtras}\n</head>`);

  // Inject static content into #root (React replaces it on hydration)
  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    `<div id="root">${route.body}</div>`
  );

  return html;
}

let count = 0;
for (const route of routes) {
  const html = buildHtml(route);
  if (route.path === "/") {
    writeFileSync(join(DIST, "index.html"), html, "utf-8");
  } else {
    const rel = route.path.replace(/^\//, "");
    // Directory index: served for /route/ (and /route on most hosts)
    const dirPath = join(DIST, rel, "index.html");
    mkdirSync(dirname(dirPath), { recursive: true });
    writeFileSync(dirPath, html, "utf-8");
    // Flat file: with Vercel cleanUrls, /route serves route.html directly
    writeFileSync(join(DIST, `${rel}.html`), html, "utf-8");
  }
  count++;
}

console.log(`✓ Prerendered ${count} routes into dist/`);
