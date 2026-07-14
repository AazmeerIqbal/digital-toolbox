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
  const guide = toolGuides[guideKey];
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
        <h3>Pro Tips</h3>
        <ul>${guide.tips.map((t) => `<li>${esc(t)}</li>`).join("\n          ")}</ul>
      </section>
      <section>
        <h3>Common Mistakes to Avoid</h3>
        <ul>${guide.mistakes.map((m) => `<li>${esc(m)}</li>`).join("\n          ")}</ul>
      </section>
    </article>`
    : "";

  const related = tools.filter((t) => t.id !== tool.id && t.category === tool.category).slice(0, 4);

  routes.push({
    path: tool.route,
    title: seo?.title ?? `${tool.title} — Free Online Tool | Toolzaply`,
    description: seo?.description ?? tool.description,
    keywords: seo?.keywords,
    structuredData: seo?.structuredData,
    body: page(`
    <h1>${esc(tool.title)}</h1>
    <p>${esc(tool.description)}. Free, no registration, and your files never leave your device —
    all processing happens locally in your browser.</p>
    ${guideHtml}
    ${
      related.length
        ? `<section><h2>Related Tools</h2><ul>${related
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
    ${faqItems.map((f) => `<h2>${esc(f.q)}</h2><p>${esc(f.a)}</p>`).join("\n    ")}
    <p>Still have a question? <a href="/contact">Contact us</a>.</p>
  `),
});

// ---- Legal / company pages (static crawler-visible summaries; the React app
// renders the full interactive versions) ----
const aboutSeo = seoConfigs["about"];
routes.push({
  path: "/about",
  title: aboutSeo?.title ?? "About Us | Toolzaply",
  description: aboutSeo?.description ?? "About Toolzaply — free browser-based tools.",
  body: page(`
    <h1>About Toolzaply</h1>
    <p>Toolzaply started with a simple frustration: needing to convert a document or compress an
    image, and finding only websites that demanded sign-ups, watermarked results, or uploaded your
    private files to unknown servers. We believed everyday digital tasks shouldn't cost money,
    time, or privacy — so we built a collection of tools that run entirely in your browser.</p>
    <h2>What Makes Us Different</h2>
    <ul>
      <li><strong>Local processing:</strong> every tool runs on your device. Your files are never uploaded anywhere.</li>
      <li><strong>Genuinely free:</strong> no premium tiers, no trial limits, no locked features.</li>
      <li><strong>No accounts:</strong> we don't want your email address. Just use the tools.</li>
      <li><strong>Fast:</strong> no upload/download round-trips — processing starts instantly.</li>
    </ul>
    <h2>Our Tools</h2>
    <ul>
      ${tools.map((t) => `<li><a href="${t.route}">${esc(t.title)}</a> — ${esc(t.description)}</li>`).join("\n      ")}
    </ul>
    <h2>How We Build Our Tools</h2>
    <p>Each tool is built with modern web technologies (React, TypeScript, and browser-native
    APIs like Canvas and Web Workers) so heavy work like PDF generation and image compression can
    run at native speed inside your browser. We test every tool across Chrome, Firefox, Safari,
    and Edge, on both desktop and mobile.</p>
    <p>Have feedback or a feature request? <a href="/contact">Get in touch</a>.</p>
  `),
});

const privacySeo = seoConfigs["privacy"];
routes.push({
  path: "/privacy",
  title: privacySeo?.title ?? "Privacy Policy | Toolzaply",
  description: privacySeo?.description ?? "Toolzaply privacy policy.",
  body: page(`
    <h1>Privacy Policy</h1>
    <p>Toolzaply is designed around a simple privacy principle: <strong>your files never leave
    your device.</strong> All tools process data locally in your browser. We do not receive,
    store, or have any access to the files you work with.</p>
    <h2>What We Collect</h2>
    <p>We do not require accounts and do not collect names, email addresses, or file contents.
    Like most websites, we use analytics and advertising services (Google AdSense) which may use
    cookies to serve relevant ads. You can manage cookie preferences through our consent banner
    and your browser settings.</p>
    <h2>Advertising</h2>
    <p>We display ads via Google AdSense to keep our tools free. Google may use cookies to
    personalize ads. See Google's advertising policies for details on how ad data is handled, and
    use our cookie consent controls to opt out of personalized advertising.</p>
    <h2>Your Rights</h2>
    <p>Under GDPR and CCPA you have rights to access, correct, and delete personal data. Because
    we don't collect personal data through our tools, there is typically nothing to delete — but
    you can contact us any time with privacy questions at our <a href="/contact">contact page</a>.</p>
    <p>Read the complete policy on this page in your browser, or contact us for a copy.</p>
  `),
});

const termsSeo = seoConfigs["terms"];
routes.push({
  path: "/terms",
  title: termsSeo?.title ?? "Terms of Service | Toolzaply",
  description: termsSeo?.description ?? "Toolzaply terms of service.",
  body: page(`
    <h1>Terms of Service</h1>
    <p>By using Toolzaply you agree to these terms. Our tools are provided free of charge for
    personal and commercial use.</p>
    <h2>Use of the Tools</h2>
    <p>You may use all tools for lawful purposes without restriction. Output you create (PDFs,
    compressed images, QR codes, resumes) belongs to you. You may not attempt to disrupt the
    service, scrape it at abusive volumes, or use it to process unlawful content.</p>
    <h2>No Warranty</h2>
    <p>Tools are provided "as is" without warranties of any kind. While we test carefully, we
    cannot guarantee that conversions are error-free for every possible file. Always review
    output before relying on it for important purposes.</p>
    <h2>Liability</h2>
    <p>Because all processing happens on your device and we never receive your files, our
    liability is limited to the maximum extent permitted by law.</p>
    <p>Questions about these terms? <a href="/contact">Contact us</a>.</p>
  `),
});

const contactSeo = seoConfigs["contact"];
routes.push({
  path: "/contact",
  title: contactSeo?.title ?? "Contact Us | Toolzaply",
  description: contactSeo?.description ?? "Contact Toolzaply.",
  body: page(`
    <h1>Contact Us</h1>
    <p>We'd love to hear from you — bug reports, feature requests, feedback, or questions about
    any of our ${tools.length} free tools.</p>
    <h2>Email</h2>
    <p>Reach us at <a href="mailto:support@toolzaply.com">support@toolzaply.com</a>. We typically
    respond within 24–48 hours.</p>
    <h2>What to Contact Us About</h2>
    <ul>
      <li>Bug reports and technical issues</li>
      <li>Feature requests and suggestions</li>
      <li>General feedback and questions</li>
      <li>Help with using specific tools</li>
    </ul>
    <p>Common questions are answered on our <a href="/faq">FAQ page</a>.</p>
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
