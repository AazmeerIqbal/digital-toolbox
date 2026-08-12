export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  structuredData?: object | object[];
  additionalMeta?: Array<{ name: string; content: string }>;
}

export const siteConfig = {
  name: "Toolzaply",
  url: "https://toolzaply.com",
  description: "Free online tools for productivity, PDF conversion, image compression, QR codes, and more. No registration, no uploads — everything runs in your browser.",
  ogImage: "https://toolzaply.com/og-image.png",
  keywords: [
    "free online tools",
    "browser tools no upload",
    "productivity tools online",
    "pdf converter free",
    "image tools online",
    "text tools online",
    "no registration tools",
  ],
};

const breadcrumb = (name: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${siteConfig.url}/tools` },
    { "@type": "ListItem", position: 3, name: name, item: `${siteConfig.url}${path}` },
  ],
});

const softwareApp = (name: string, desc: string, path: string, category: string, features: string[]) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name,
  description: desc,
  url: `${siteConfig.url}${path}`,
  applicationCategory: category,
  operatingSystem: "Web Browser",
  browserRequirements: "Requires JavaScript",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: features,
  author: { "@type": "Organization", name: "Toolzaply", url: siteConfig.url },
});

const faqSchema = (faqs: Array<{ q: string; a: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

export const seoConfigs: Record<string, SEOConfig> = {
  home: {
    title: "Toolzaply — Free Online Tools: PDF, Image, Text, QR & More",
    description:
      "13+ free browser-based tools: convert images to PDF, compress images, generate QR codes, check typing speed, build resumes, and more. No sign-up. No uploads.",
    keywords: [
      "free online tools",
      "image to pdf converter",
      "compress image online",
      "qr code generator",
      "typing speed test",
      "unit converter",
      "resume builder free",
      "text case converter",
      "color picker online",
      "pomodoro timer",
      "age calculator",
      "markdown editor online",
      "fake data generator",
      "browser tools no registration",
      "online productivity tools",
    ],
    ogTitle: "Toolzaply — 13+ Free Online Tools, No Sign-Up Required",
    ogDescription:
      "Convert PDFs, compress images, generate QR codes, test typing speed, and more — all free, all in your browser.",
    ogImage: siteConfig.ogImage,
    canonical: siteConfig.url,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Toolzaply",
        url: siteConfig.url,
        description: siteConfig.description,
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${siteConfig.url}/?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Toolzaply",
        url: siteConfig.url,
        logo: `${siteConfig.url}/favicon.svg`,
        sameAs: [],
      },
    ],
  },

  "word-to-pdf": {
    title: "Word to PDF Converter — Free, 100% Private, No Upload | Toolzaply",
    description:
      "Convert Word documents (.docx) to PDF instantly in your browser without uploading to any server. 100% private local processing, preserves formatting, zero registration.",
    keywords: [
      "convert docx to pdf without uploading",
      "word to pdf no upload",
      "free word to pdf converter online",
      "convert word document to pdf private",
      "docx to pdf browser",
      "convert .docx to pdf",
      "word document to pdf download",
      "microsoft word to pdf free",
      "word to pdf without microsoft office",
      "online word to pdf converter",
      "docx pdf converter no registration",
      "local data processing word to pdf",
    ],
    ogTitle: "Word to PDF Converter — Free, 100% Private, No Upload",
    ogDescription:
      "Convert .docx files to PDF in seconds without uploading to any cloud server. Your files stay on your device. Free, instant download.",
    ogImage: siteConfig.ogImage,
    canonical: `${siteConfig.url}/tools/word-to-pdf`,
    structuredData: [
      softwareApp(
        "Word to PDF Converter",
        "Convert Microsoft Word .docx documents to PDF format directly in your browser without uploading files to any server.",
        "/tools/word-to-pdf",
        "UtilitiesApplication",
        [
          "DOCX to PDF conversion",
          "Document preview",
          "Formatting preserved",
          "100% browser-based local processing",
          "No file upload to server",
          "No registration required",
        ]
      ),
      breadcrumb("Word to PDF Converter", "/tools/word-to-pdf"),
      faqSchema([
        {
          q: "How can I convert Word to PDF without uploading my document to a server?",
          a: "Toolzaply runs DOCX to PDF conversion entirely in your browser using client-side JavaScript. Your document is processed in local memory on your device and is never uploaded across the internet.",
        },
        {
          q: "Can I convert .docx files to PDF on mobile or tablet?",
          a: "Yes. Toolzaply's Word to PDF tool works directly on mobile browsers (Safari, Chrome, Firefox) on iOS and Android without installing any app.",
        },
        {
          q: "Does it preserve fonts, tables, and headings?",
          a: "Yes — headings, bold/italic formatting, paragraphs, lists, and tables are preserved in the generated PDF.",
        },
        {
          q: "Is there a limit on how many Word documents I can convert?",
          a: "No. You can convert unlimited documents for free without subscriptions, account sign-ups, or daily caps.",
        },
      ]),
    ],
  },

  "image-to-pdf": {
    title: "Image to PDF Converter — Combine JPG & PNG to PDF Free | Toolzaply",
    description:
      "Convert JPG, PNG, and WebP images to PDF in seconds. Combine multiple photos into a single PDF document. 100% free, works offline in browser, no server upload.",
    keywords: [
      "convert multiple images to pdf free",
      "jpg to pdf no upload no sign up",
      "combine images to pdf offline",
      "image to pdf converter",
      "png to pdf online free",
      "convert jpg to pdf",
      "jpeg to pdf converter",
      "merge images into pdf",
      "photos to pdf online",
      "multiple images to pdf",
      "image to pdf no upload",
      "free jpg to pdf converter",
      "how to convert image to pdf online",
      "batch image to pdf converter",
    ],
    ogTitle: "Image to PDF Converter — Combine JPG & PNG to PDF Free",
    ogDescription:
      "Convert JPG, PNG, and WebP images to PDF instantly. Merge multiple photos into one PDF. No file size limit, no sign-up.",
    ogImage: siteConfig.ogImage,
    canonical: `${siteConfig.url}/tools/image-to-pdf`,
    structuredData: [
      softwareApp(
        "Image to PDF Converter",
        "Convert JPG, PNG, and WebP images to PDF online for free. Merge multiple images into a single PDF document instantly in your browser.",
        "/tools/image-to-pdf",
        "UtilityApplication",
        [
          "Convert JPG to PDF",
          "Convert PNG to PDF",
          "Merge multiple images into PDF",
          "No file upload required",
          "Instant PDF download",
          "Supports JPG, PNG, GIF, WebP",
        ]
      ),
      breadcrumb("Image to PDF Converter", "/tools/image-to-pdf"),
      faqSchema([
        {
          q: "How do I convert multiple images to PDF for free without uploading?",
          a: "Select your JPG, PNG, or WebP images on Toolzaply's Image to PDF page. All files are merged locally in your browser memory into a clean PDF document without uploading to external servers.",
        },
        {
          q: "Can I rearrange the order of images before generating the PDF?",
          a: "Yes. You can select and arrange images in your desired sequence before clicking Convert to PDF.",
        },
        {
          q: "Is there any file size or conversion limit?",
          a: "No. Because the conversion executes directly on your device, there are no artificial file size caps or daily conversion quotas.",
        },
        {
          q: "Does this Image to PDF tool work on iPhone and Android?",
          a: "Yes, it works directly inside any mobile browser without requiring app installations or subscriptions.",
        },
      ]),
    ],
  },

  "pdf-tools": {
    title: "Free PDF Tools — Merge, Split & Compress PDF Locally | Toolzaply",
    description:
      "All-in-one free browser PDF tools: merge multiple PDFs into one, split pages, rotate documents, compress file size, and extract text — 100% private.",
    keywords: [
      "merge pdf files locally in browser",
      "split pdf no upload private",
      "rotate pdf pages free",
      "merge pdf online free",
      "pdf merger free",
      "split pdf online",
      "compress pdf online free",
      "combine pdf files free",
      "pdf tools free",
      "pdf editor online free",
      "extract text from pdf",
      "reduce pdf file size online",
      "merge pdf without adobe",
      "pdf splitter online",
      "compress pdf without losing quality",
      "online pdf tools no registration",
    ],
    ogTitle: "Free PDF Tools — Merge, Split, Compress, Rotate PDFs Online",
    ogDescription:
      "Complete PDF toolkit: merge, split, rotate, compress and extract text from PDFs. Free, no sign-up, no software to install.",
    ogImage: siteConfig.ogImage,
    canonical: `${siteConfig.url}/tools/pdf-tools`,
    structuredData: [
      softwareApp(
        "PDF Tools Suite",
        "Complete free online PDF tools: merge PDFs, split PDF pages, rotate PDFs, compress PDF file size, and extract text — all in your browser.",
        "/tools/pdf-tools",
        "UtilityApplication",
        [
          "Merge PDF files",
          "Split PDF pages",
          "Rotate PDF documents",
          "Compress PDF size",
          "Extract text from PDF",
          "No software install required",
        ]
      ),
      breadcrumb("PDF Tools", "/tools/pdf-tools"),
      faqSchema([
        {
          q: "How do I merge multiple PDF files into one for free?",
          a: "Go to PDF Tools on Toolzaply, select the 'Merge PDF' tab, upload your PDF files, arrange their order, and click Merge. The combined PDF downloads instantly — no account needed.",
        },
        {
          q: "Can I compress a PDF file to reduce its size online?",
          a: "Yes. Use the Compress PDF tab on Toolzaply's PDF Tools page. Upload your PDF and the tool reduces its file size while preserving readability, all in your browser.",
        },
        {
          q: "How do I split a PDF into separate pages?",
          a: "Select the Split PDF tab, upload your file, choose which pages to extract or specify a page range, and download the resulting PDF(s) instantly.",
        },
        {
          q: "Are my PDF documents uploaded to your server?",
          a: "No. All PDF operations run locally in your web browser using WebAssembly and JavaScript. Your documents never leave your computer or phone.",
        },
      ]),
    ],
  },


  "text-converter": {
    title: "Text Case Converter — UPPERCASE, lowercase, camelCase, snake_case Free",
    description:
      "Instantly convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and more. Free online text case changer — paste and convert in one click.",
    keywords: [
      "text case converter",
      "uppercase converter online",
      "lowercase converter",
      "title case converter",
      "camelcase converter online",
      "snake case converter",
      "kebab case converter",
      "convert text to uppercase",
      "sentence case converter",
      "text transformer online",
      "change text case online free",
      "string case converter",
      "capitalize text online",
      "toggle case converter",
      "text case changer tool",
    ],
    ogTitle: "Text Case Converter — UPPER, lower, camelCase, snake_case & More",
    ogDescription:
      "Convert text case online in one click: uppercase, lowercase, title case, camelCase, snake_case, kebab-case. Free, instant, no sign-up.",
    ogImage: siteConfig.ogImage,
    canonical: `${siteConfig.url}/tools/text-converter`,
    structuredData: [
      softwareApp(
        "Text Case Converter",
        "Free online text case converter. Transform text to uppercase, lowercase, title case, camelCase, snake_case, kebab-case, and more in one click.",
        "/tools/text-converter",
        "UtilityApplication",
        ["UPPERCASE converter", "lowercase converter", "Title Case converter", "camelCase converter", "snake_case converter", "kebab-case converter", "Sentence case converter"]
      ),
      breadcrumb("Text Case Converter", "/tools/text-converter"),
      faqSchema([
        { q: "How do I convert text to uppercase online?", a: "Paste your text into the Text Case Converter on Toolzaply and click 'UPPERCASE'. Your text converts instantly — no sign-up required." },
        { q: "What is the difference between camelCase and snake_case?", a: "camelCase writes compound words with no spaces and each new word capitalised (e.g. helloWorld). snake_case uses underscores between words in lowercase (e.g. hello_world). Both are common in programming." },
        { q: "Can I convert a full paragraph to title case?", a: "Yes. Paste any length of text and select 'Title Case'. Every major word will be capitalised according to standard title-case rules." },
        { q: "Does the text converter work with special characters?", a: "Yes. The converter handles Unicode text including accented characters, numbers, and punctuation, and only changes the alphabetical casing." },
        { q: "How do I convert a variable name from camelCase to snake_case?", a: "Paste the camelCase text into the converter and select snake_case. The tool splits on capital letters and word boundaries, then joins with underscores in lowercase." },
      ]),
    ],
  },

  "unit-converter": {
    title: "Unit Converter — Length, Weight, Temperature, Volume & More Free",
    description:
      "Free online unit converter for length, weight, temperature, area, volume, speed, and data. Convert meters to feet, kg to lbs, Celsius to Fahrenheit instantly.",
    keywords: [
      "unit converter online free",
      "length converter",
      "weight converter kg to lbs",
      "temperature converter celsius to fahrenheit",
      "meters to feet converter",
      "km to miles converter",
      "metric to imperial converter",
      "volume converter",
      "speed converter",
      "area converter",
      "data size converter",
      "how to convert celsius to fahrenheit",
      "convert kg to pounds online",
      "online measurement converter",
      "unit conversion calculator",
    ],
    ogTitle: "Free Unit Converter — Length, Weight, Temp, Volume & More",
    ogDescription:
      "Convert any unit instantly: metres to feet, kg to lbs, °C to °F, litres to gallons and more. Free online unit converter, no sign-up.",
    ogImage: siteConfig.ogImage,
    canonical: `${siteConfig.url}/tools/unit-converter`,
    structuredData: [
      softwareApp(
        "Unit Converter",
        "Free online unit converter for length, weight, temperature, area, volume, speed, and digital data. Supports metric and imperial units.",
        "/tools/unit-converter",
        "UtilityApplication",
        ["Length converter (meters, feet, miles, km)", "Weight converter (kg, lbs, oz)", "Temperature converter (°C, °F, K)", "Volume converter", "Speed converter", "Area converter", "Data size converter"]
      ),
      breadcrumb("Unit Converter", "/tools/unit-converter"),
      faqSchema([
        { q: "How do I convert Celsius to Fahrenheit online?", a: "Open the Unit Converter on Toolzaply, select the Temperature category, enter your Celsius value, and the Fahrenheit equivalent appears instantly. The formula is °F = (°C × 9/5) + 32." },
        { q: "How many feet are in a meter?", a: "1 meter equals 3.28084 feet. Use Toolzaply's Unit Converter to convert any length value between metres and feet instantly." },
        { q: "How do I convert kilograms to pounds?", a: "1 kilogram equals 2.20462 pounds. Enter your kg value in the Weight category of the Unit Converter to get the exact lbs result." },
        { q: "Can I convert miles to kilometres?", a: "Yes. Select the Length category, choose miles as the source unit and kilometres as the target unit, then type your value. 1 mile = 1.60934 km." },
        { q: "Does the unit converter support data sizes like GB to MB?", a: "Yes. The Data category supports bits, bytes, kilobytes, megabytes, gigabytes, and terabytes." },
      ]),
    ],
  },

  "qr-tools": {
    title: "Free QR Code Generator from URL & Text — Scannable & Instant | Toolzaply",
    description:
      "Generate high-resolution, scannable QR codes from any URL, link, or text instantly. Download as PNG with no watermark. Free online QR code creator & camera scanner — 100% private.",
    keywords: [
      "create qr code from url",
      "scannable qr code",
      "qr code url",
      "qr url",
      "link to qr code generator online",
      "text to qr code online",
      "scan code generator",
      "make qr code from url",
      "create qr code to url",
      "generate qr code for url",
      "qr from url",
      "qr code generator free",
      "free qr code generator no watermark",
      "qr code maker online",
      "qr code for link",
      "free qr code no expiry",
      "how to create a scan code",
      "word to qr code",
      "link to scanner",
      "qr code website",
    ],
    ogTitle: "Free QR Code Generator from URL & Text — Scannable & Instant",
    ogDescription:
      "Create high-resolution scannable QR codes for URLs, links, text, and WiFi passwords. Download PNG with no watermark, no expiry, and no account needed.",
    ogImage: siteConfig.ogImage,
    canonical: `${siteConfig.url}/tools/qr-tools`,
    structuredData: [
      softwareApp(
        "QR Code Generator & Scanner",
        "Free online QR code generator and scanner. Create scannable QR codes from URLs, links, text, WiFi, and contact info. Download PNG instantly with no watermark.",
        "/tools/qr-tools",
        "UtilityApplication",
        [
          "Create QR code from URL or link",
          "Text to QR code generator",
          "Scan QR codes online with camera",
          "WiFi and Contact QR codes",
          "High-resolution PNG download",
          "No watermark and no expiration",
          "100% client-side private generation",
        ]
      ),
      breadcrumb("QR Code Generator", "/tools/qr-tools"),
      faqSchema([
        {
          q: "How do I create a scannable QR code from a website URL for free?",
          a: "Paste your website link or URL into the Toolzaply QR Code Generator input box. A high-resolution, scannable QR code generates instantly in real time. Click Download to save the PNG image with zero watermark and no sign-up.",
        },
        {
          q: "Can I convert plain text, email, or messages into a QR code?",
          a: "Yes. You can paste plain text, email addresses, SMS messages, or WiFi credentials into the input field. Any modern smartphone camera can scan the resulting QR code to view the text or action.",
        },
        {
          q: "Do QR codes generated on Toolzaply ever expire?",
          a: "No. All QR codes created on Toolzaply are static and permanent. The encoded data is embedded directly into the QR code pattern, so it works forever without redirects or subscriptions.",
        },
        {
          q: "How do I scan a QR code online without an app?",
          a: "Select the 'Scan QR Code' tab on Toolzaply and click 'Start Camera Scanner'. Point your webcam or mobile camera at any QR code to instantly decode and copy the underlying link or text.",
        },
        {
          q: "Are Toolzaply QR codes free for commercial and print use?",
          a: "Yes. All generated QR codes are 100% free with no watermarks, branding, or usage limits. You can print them on business cards, menus, posters, or flyers for personal and commercial projects.",
        },
      ]),
    ],
  },

  "markdown-editor": {
    title: "Markdown Editor Online — Live Preview, Free, No Login",
    description:
      "Free online Markdown editor with real-time live preview. Write Markdown and see HTML output instantly. Auto-saves to browser, export to HTML. No account needed.",
    keywords: [
      "markdown editor online",
      "markdown live preview",
      "online markdown editor free",
      "markdown to html online",
      "write markdown online",
      "markdown preview tool",
      "free markdown editor no login",
      "real time markdown preview",
      "markdown notepad online",
      "markdown converter online",
      "markdown cheat sheet editor",
      "github flavored markdown editor",
      "markdown wysiwyg online",
      "best online markdown editor",
      "markdown text editor browser",
    ],
    ogTitle: "Free Online Markdown Editor with Live Preview — No Login",
    ogDescription:
      "Write Markdown and see the HTML preview in real time. Auto-saves in your browser. Free, no account, no ads on the writing surface.",
    ogImage: siteConfig.ogImage,
    canonical: `${siteConfig.url}/tools/markdown-editor`,
    structuredData: [
      softwareApp(
        "Markdown Editor",
        "Free online Markdown editor with real-time live preview, auto-save to localStorage, and HTML export. No registration required.",
        "/tools/markdown-editor",
        "ProductivityApplication",
        ["Real-time Markdown preview", "Auto-save to browser storage", "Export to HTML", "Supports GFM (GitHub Flavored Markdown)", "Syntax: headings, bold, italic, tables, code blocks, lists"]
      ),
      breadcrumb("Markdown Editor", "/tools/markdown-editor"),
      faqSchema([
        { q: "What is a Markdown editor and why use one?", a: "A Markdown editor lets you write plain text with simple formatting symbols (like # for headings, **text** for bold) and see it rendered as formatted HTML in real time. It's used for README files, documentation, blog posts, and notes." },
        { q: "Does the online Markdown editor save my work?", a: "Yes. Toolzaply's Markdown editor automatically saves your content to your browser's localStorage, so your text is preserved when you refresh or reopen the page." },
        { q: "Can I export my Markdown as HTML?", a: "Yes. Click the Export button to download your Markdown rendered as an HTML file that you can open in any browser or integrate into a website." },
        { q: "Does the Markdown editor support tables and code blocks?", a: "Yes. The editor supports GitHub Flavored Markdown (GFM) including fenced code blocks (```), tables, task lists, strikethrough, blockquotes, and inline code." },
        { q: "Is this Markdown editor free to use without an account?", a: "Yes. No sign-up, no email, no password required. Open the page and start writing immediately." },
      ]),
    ],
  },

  "color-tools": {
    title: "Color Picker & RGB to HEX Converter — Free Online Color Tools",
    description:
      "Free online color tools: visual color picker, RGB ↔ HEX ↔ HSL converter, color palette generator, gradient builder, and color contrast checker. Perfect for designers and developers.",
    keywords: [
      "color picker online",
      "rgb to hex converter",
      "hex to rgb converter",
      "hsl to hex converter",
      "color palette generator",
      "gradient generator online",
      "css color picker",
      "color code converter",
      "web color picker free",
      "hex color picker",
      "color scheme generator",
      "complementary color finder",
      "color contrast checker",
      "pantone to hex converter",
      "color tools for designers",
    ],
    ogTitle: "Free Color Picker & RGB to HEX Converter — Color Tools Online",
    ogDescription:
      "Pick colors visually, convert RGB/HEX/HSL, generate palettes and gradients. Free online color tools for designers and developers.",
    ogImage: siteConfig.ogImage,
    canonical: `${siteConfig.url}/tools/color-tools`,
    structuredData: [
      softwareApp(
        "Color Tools Suite",
        "Free online color tools for designers and developers: color picker, RGB/HEX/HSL converter, color palette generator, and gradient builder.",
        "/tools/color-tools",
        "DesignApplication",
        ["Visual color picker", "RGB to HEX converter", "HEX to RGB converter", "HSL color support", "Color palette generator", "CSS gradient builder", "Color history"]
      ),
      breadcrumb("Color Tools", "/tools/color-tools"),
      faqSchema([
        { q: "How do I convert an RGB color to HEX?", a: "Open Color Tools on Toolzaply, enter your R, G, B values (0–255 each), and the HEX code is shown instantly. For example, RGB(255, 99, 72) converts to #FF6348." },
        { q: "How do I convert a HEX color code to RGB?", a: "Enter the HEX code (e.g. #FF6348) in the converter and the RGB values are displayed immediately — no manual calculation needed." },
        { q: "What is the difference between RGB and HSL color models?", a: "RGB defines colors by Red, Green, and Blue channel intensities. HSL uses Hue (0–360°), Saturation (%), and Lightness (%) — which is often more intuitive for picking color variations." },
        { q: "Can I generate a color palette for my website design?", a: "Yes. Use the Palette Generator tab in Color Tools to create harmonious color schemes including complementary, triadic, and analogous palettes based on a chosen base color." },
        { q: "Is there a CSS gradient generator on Toolzaply?", a: "Yes. The Gradient Builder lets you set colors and direction, and outputs the ready-to-use CSS gradient code (background: linear-gradient(...)) you can paste directly into your stylesheet." },
      ]),
    ],
  },

  "timer-tools": {
    title: "Pomodoro Timer Online — Free Countdown Timer & Stopwatch",
    description:
      "Free online Pomodoro timer (25/5 min), countdown timer, and stopwatch. Boost focus with timed work sessions. No app install, works in any browser tab.",
    keywords: [
      "pomodoro timer online free",
      "25 minute timer",
      "online stopwatch free",
      "countdown timer online",
      "pomodoro technique timer",
      "focus timer online",
      "study timer pomodoro",
      "work timer free",
      "online timer no download",
      "pomodoro timer 25 minutes",
      "5 minute break timer",
      "productivity timer online",
      "free countdown clock online",
      "interval timer online",
      "time management tool online",
    ],
    ogTitle: "Free Pomodoro Timer, Countdown & Stopwatch Online",
    ogDescription:
      "Boost your focus with the Pomodoro technique (25 min work / 5 min break), countdown timer, and stopwatch — free in your browser, no install.",
    ogImage: siteConfig.ogImage,
    canonical: `${siteConfig.url}/tools/timer-tools`,
    structuredData: [
      softwareApp(
        "Pomodoro Timer & Stopwatch",
        "Free online Pomodoro timer, countdown timer, and stopwatch for focused work sessions and time tracking. No installation required.",
        "/tools/timer-tools",
        "ProductivityApplication",
        ["Pomodoro timer (25 min work / 5 min break)", "Custom countdown timer", "Stopwatch with lap times", "Audio notification on completion", "Works offline in browser"]
      ),
      breadcrumb("Pomodoro Timer", "/tools/timer-tools"),
      faqSchema([
        { q: "What is the Pomodoro Technique?", a: "The Pomodoro Technique is a time management method where you work for 25 minutes, then take a 5-minute break. After 4 'Pomodoros' you take a longer 15–30 minute break. It improves focus and reduces mental fatigue." },
        { q: "How do I use the Pomodoro timer on Toolzaply?", a: "Open the Timer Tools page, select the Pomodoro tab, and click Start. The timer counts down 25 minutes and alerts you when it's time for a break. Click again to start the 5-minute break timer." },
        { q: "Can I set a custom countdown duration?", a: "Yes. Switch to the Countdown tab, enter any duration in hours, minutes, and seconds, and click Start. An alert sounds when the time is up." },
        { q: "Does the stopwatch support lap times?", a: "Yes. The stopwatch records lap times each time you press the Lap button so you can track split times during workouts, races, or timed tasks." },
        { q: "Will the timer work if I switch to another browser tab?", a: "Yes. The timer continues running in the background and will alert you when the session ends, even if you are viewing a different tab." },
      ]),
    ],
  },

  "resume-builder": {
    title: "Free Resume Builder Online — Create & Download PDF Resume",
    description:
      "Build a professional resume online for free. Choose a template, fill in your details, and download as a print-ready PDF. No account required, no watermarks.",
    keywords: [
      "free resume builder online",
      "resume builder no sign up",
      "create resume online free",
      "resume maker free download pdf",
      "professional resume template free",
      "cv builder online free",
      "resume generator free",
      "ats friendly resume builder",
      "online resume creator pdf",
      "resume builder no watermark",
      "free cv maker online",
      "how to make a resume online for free",
      "resume template download free",
      "job resume builder free",
      "resume builder no registration",
    ],
    ogTitle: "Free Online Resume Builder — Download PDF, No Sign-Up",
    ogDescription:
      "Create a professional, ATS-friendly resume with our free builder. Pick a template, add your info, download PDF — no account, no watermark.",
    ogImage: siteConfig.ogImage,
    canonical: `${siteConfig.url}/tools/resume-builder`,
    structuredData: [
      softwareApp(
        "Resume Builder",
        "Free online resume builder with professional templates and PDF export. Create an ATS-friendly resume in minutes without registration or watermarks.",
        "/tools/resume-builder",
        "ProductivityApplication",
        ["Multiple professional templates", "PDF download", "No watermark", "ATS-friendly formatting", "Skills, experience, education sections", "No account required"]
      ),
      breadcrumb("Resume Builder", "/tools/resume-builder"),
      faqSchema([
        { q: "How do I build a resume online for free?", a: "Go to the Resume Builder on Toolzaply, select a template, fill in your personal info, work experience, education, and skills, then click Download PDF. Your resume is ready in minutes." },
        { q: "Is there a watermark on resumes created with Toolzaply?", a: "No. Resumes built and downloaded from Toolzaply are completely free of watermarks and logos." },
        { q: "Are the resume templates ATS-compatible?", a: "Yes. The templates use clean, single-column layouts with standard section headings that Applicant Tracking Systems (ATS) can parse easily, improving your chances of passing automated screening." },
        { q: "Can I download my resume as a PDF?", a: "Yes. After filling in your details, click the Download PDF button to get a print-ready PDF of your resume instantly." },
        { q: "Do I need to create an account to build a resume?", a: "No. The Resume Builder on Toolzaply works entirely in your browser with no account, no email, and no password required." },
      ]),
    ],
  },

  "fake-data-generator": {
    title: "Fake Data Generator — Random Names, Emails, Addresses & JSON Free",
    description:
      "Generate realistic fake data for testing and development: random names, emails, phone numbers, addresses, and JSON objects. Free, instant, no login needed.",
    keywords: [
      "fake data generator online",
      "random name generator",
      "fake email address generator",
      "random address generator",
      "mock data generator",
      "test data generator free",
      "generate fake json data",
      "random user data generator",
      "dummy data generator",
      "fake person generator",
      "synthetic data generator",
      "random phone number generator",
      "fake data for testing",
      "sample data generator",
      "placeholder data generator",
    ],
    ogTitle: "Free Fake Data Generator — Names, Emails, Addresses, JSON",
    ogDescription:
      "Generate random fake names, emails, addresses, phone numbers, and JSON for testing. Free, instant, no sign-up required.",
    ogImage: siteConfig.ogImage,
    canonical: `${siteConfig.url}/tools/fake-data-generator`,
    structuredData: [
      softwareApp(
        "Fake Data Generator",
        "Free online fake data generator for developers and testers. Generate random names, emails, addresses, phone numbers, and JSON objects instantly.",
        "/tools/fake-data-generator",
        "DeveloperApplication",
        ["Random name generator", "Fake email generator", "Random address generator", "Fake phone number generator", "JSON data generator", "Bulk data export", "Up to 100 records at once"]
      ),
      breadcrumb("Fake Data Generator", "/tools/fake-data-generator"),
      faqSchema([
        { q: "How do I generate fake data for software testing?", a: "Open the Fake Data Generator on Toolzaply, choose the data types you need (names, emails, addresses, etc.), set the quantity (up to 100), and click Generate. Copy or export the results for use in your tests." },
        { q: "Can I generate fake JSON data for API testing?", a: "Yes. Select JSON as the output format and the generator produces structured JSON objects with realistic field values suitable for API development, database seeding, or UI prototyping." },
        { q: "Is the fake data generated on Toolzaply GDPR-safe?", a: "Yes. All data is randomly generated locally in your browser and is entirely fictitious — no real personal information is used, making it GDPR-safe for testing and development." },
        { q: "How many fake records can I generate at once?", a: "You can generate up to 100 records at a time, which covers most testing and prototyping use cases." },
        { q: "Can I use the generated fake data commercially?", a: "Yes. The generated data is random and fictional, with no copyright attached, so you can use it freely in personal or commercial projects." },
      ]),
    ],
  },

  "image-compressor": {
    title: "Free Image Compressor — Compress PNG, JPG, WebP Locally | Toolzaply",
    description:
      "Compress and reduce image file sizes by up to 90% without visible quality loss. Runs 100% locally in your browser — zero server uploads, no file size limits.",
    keywords: [
      "compress image locally in browser",
      "compress image online free",
      "reduce image size online",
      "image compressor without quality loss",
      "jpg compressor online free",
      "png compressor online",
      "reduce photo size online free",
      "image optimizer online",
      "compress image for web",
      "bulk image compressor",
      "reduce jpeg size online free",
      "webp image compressor",
      "compress image file size",
      "photo size reducer online",
      "local data processing image compression",
      "shrink image file size online",
    ],
    ogTitle: "Free Image Compressor — Compress PNG, JPG, WebP Locally",
    ogDescription:
      "Compress JPG, PNG, WebP images online without losing quality. Reduce file size by up to 90%. No upload, no sign-up, instant download.",
    ogImage: siteConfig.ogImage,
    canonical: `${siteConfig.url}/tools/image-compressor`,
    structuredData: [
      softwareApp(
        "Image Compressor",
        "Free online image compressor. Reduce JPG, PNG, and WebP file sizes by up to 90% without visible quality loss, entirely in your browser.",
        "/tools/image-compressor",
        "UtilityApplication",
        [
          "JPG/JPEG compression",
          "PNG compression",
          "WebP compression",
          "Up to 90% size reduction",
          "Batch compression",
          "Quality slider control",
          "100% local client-side processing",
          "No file upload to server",
        ]
      ),
      breadcrumb("Image Compressor", "/tools/image-compressor"),
      faqSchema([
        {
          q: "How do I compress an image without losing quality or uploading it to a server?",
          a: "Upload your image to the Image Compressor on Toolzaply. All compression algorithms execute inside your browser's memory without sending bytes across the web, preserving maximum visual fidelity while reducing file size by 50–90%.",
        },
        {
          q: "What image formats can I compress on Toolzaply?",
          a: "Toolzaply supports JPG/JPEG, PNG, and WebP image compression. All processing happens in your browser — your images are never uploaded to any server.",
        },
        {
          q: "How much can I reduce an image file size?",
          a: "Typically 40–90% depending on the original image and the quality setting. A 5MB JPG can often be reduced to under 500KB with minimal visible quality change.",
        },
        {
          q: "Can I compress multiple images at once?",
          a: "Yes. Select multiple images when uploading and the tool compresses each one individually, allowing you to download them all.",
        },
        {
          q: "Is my image data private when using Toolzaply's compressor?",
          a: "Yes. All image compression happens locally in your browser using JavaScript. Your images are never sent to any server, ensuring complete privacy.",
        },
      ]),
    ],
  },


  "age-calculator": {
    title: "Age Calculator — How Old Am I? Calculate Exact Age Free",
    description:
      "Calculate your exact age in years, months, days, hours, and minutes from your date of birth. Find your zodiac sign and days until your next birthday. Free, instant.",
    keywords: [
      "age calculator",
      "how old am i calculator",
      "age from date of birth",
      "exact age calculator",
      "calculate age in years months days",
      "birthday age calculator",
      "date of birth calculator",
      "how many days old am i",
      "zodiac sign calculator by birthday",
      "days until my birthday",
      "age difference calculator",
      "how old will i be calculator",
      "calculate age online free",
      "age calculator years and months",
      "age finder by date of birth",
    ],
    ogTitle: "Age Calculator — How Old Am I? Exact Age in Years, Months & Days",
    ogDescription:
      "Enter your date of birth and instantly find out your exact age, zodiac sign, days until your next birthday, and more. Free online age calculator.",
    ogImage: siteConfig.ogImage,
    canonical: `${siteConfig.url}/tools/age-calculator`,
    structuredData: [
      softwareApp(
        "Age Calculator",
        "Free online age calculator. Find your exact age in years, months, days, hours, and minutes from your date of birth, along with your zodiac sign and days to next birthday.",
        "/tools/age-calculator",
        "UtilityApplication",
        ["Exact age in years, months, days", "Age in total hours and minutes", "Zodiac sign calculation", "Days until next birthday", "Works for any date of birth", "Instant result"]
      ),
      breadcrumb("Age Calculator", "/tools/age-calculator"),
      faqSchema([
        { q: "How do I calculate my exact age from my date of birth?", a: "Enter your date of birth in the Age Calculator on Toolzaply and click Calculate. You'll instantly see your age broken down into years, months, days, hours, and even minutes." },
        { q: "Can the age calculator tell me how many days old I am?", a: "Yes. The calculator shows your age in total days (and hours/minutes) in addition to years, months, and days." },
        { q: "How do I find my zodiac sign by birthday?", a: "The Age Calculator automatically displays your Western zodiac sign based on your date of birth. For example, born between March 21 – April 19 means you are an Aries." },
        { q: "How many days are left until my next birthday?", a: "The calculator shows a countdown in days to your next birthday after you enter your date of birth." },
        { q: "Can I calculate the age of someone born in a different year?", a: "Yes. The calculator works for any date of birth — past or future — and handles leap years automatically." },
      ]),
    ],
  },

  "typing-test": {
    title: "Typing Speed Test — Free WPM Test Online, Check Your Typing Speed",
    description:
      "Test your typing speed and accuracy for free. Get your WPM (words per minute), accuracy %, and error analysis. Take the test multiple times to track improvement.",
    keywords: [
      "typing speed test",
      "free typing test online",
      "wpm typing test",
      "words per minute test",
      "typing speed test free",
      "online typing test no registration",
      "how fast can i type test",
      "typing accuracy test",
      "keyboard speed test",
      "typing practice test online",
      "typing test 1 minute",
      "wpm calculator online",
      "touch typing test",
      "improve typing speed test",
      "typing test for beginners",
    ],
    ogTitle: "Free Typing Speed Test — Check Your WPM & Accuracy Online",
    ogDescription:
      "Find out how fast you type with our free WPM test. Get your words per minute, accuracy %, and error breakdown. No sign-up, unlimited tests.",
    ogImage: siteConfig.ogImage,
    canonical: `${siteConfig.url}/tools/typing-test`,
    structuredData: [
      softwareApp(
        "Typing Speed Test",
        "Free online typing speed test. Measure your WPM (words per minute), accuracy percentage, and error analysis. No registration required.",
        "/tools/typing-test",
        "EducationalApplication",
        ["WPM (words per minute) measurement", "Accuracy percentage", "Error and mistake analysis", "Multiple difficulty levels", "Unlimited practice tests", "Real-time feedback"]
      ),
      breadcrumb("Typing Speed Test", "/tools/typing-test"),
      faqSchema([
        { q: "What is a good typing speed in WPM?", a: "The average typing speed is around 40 WPM. Professional typists typically reach 65–75 WPM, and fast typists exceed 100 WPM. Beginners usually start at 20–30 WPM." },
        { q: "How is WPM (words per minute) calculated?", a: "WPM is calculated by dividing the total number of characters typed by 5 (the standard word length) and dividing by the number of minutes elapsed. Only correctly typed words count toward your final score." },
        { q: "How can I improve my typing speed?", a: "Practice daily using the Toolzaply Typing Test. Focus on accuracy first — speed follows naturally. Learn touch typing (using all 10 fingers without looking) to significantly boost your WPM over time." },
        { q: "Does the typing test work on mobile devices?", a: "Yes. The typing test works on any device with a keyboard — desktop, laptop, or tablet with a physical or Bluetooth keyboard." },
        { q: "How long is the typing test?", a: "The default test is 1 minute. You can retake it as many times as you like to track improvement and practice consistency." },
      ]),
    ],
  },

  // Legal Pages
  about: {
    title: "About Toolzaply — Free Online Tools for Everyone",
    description:
      "Toolzaply provides 13+ free browser-based tools for productivity, PDF work, image editing, and more. No accounts, no uploads, no cost — just open and use.",
    keywords: ["about toolzaply", "free online tools", "privacy-focused browser tools", "no upload tools", "toolzaply mission"],
    canonical: `${siteConfig.url}/about`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Toolzaply",
      url: `${siteConfig.url}/about`,
      mainEntity: {
        "@type": "Organization",
        name: "Toolzaply",
        url: siteConfig.url,
        description: "Provider of free browser-based online productivity and utility tools",
      },
    },
  },

  privacy: {
    title: "Privacy Policy — Toolzaply",
    description: "Toolzaply's privacy policy. Your files never leave your device — all tools process data locally in your browser. Learn what data we collect and why.",
    keywords: ["privacy policy", "data security", "local processing", "no data collection", "browser tools privacy"],
    canonical: `${siteConfig.url}/privacy`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Privacy Policy — Toolzaply",
      url: `${siteConfig.url}/privacy`,
    },
  },

  terms: {
    title: "Terms of Service — Toolzaply",
    description: "Read Toolzaply's Terms of Service. Learn the rules and guidelines for using our free online tools and website.",
    keywords: ["terms of service", "terms and conditions", "user agreement", "toolzaply terms"],
    canonical: `${siteConfig.url}/terms`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Terms of Service — Toolzaply",
      url: `${siteConfig.url}/terms`,
    },
  },

  contact: {
    title: "Contact Toolzaply — Support, Feedback & Feature Requests",
    description: "Get in touch with Toolzaply for support, bug reports, or feature suggestions. We're here to help improve your experience with our free tools.",
    keywords: ["contact toolzaply", "support", "feedback", "bug report", "feature request"],
    canonical: `${siteConfig.url}/contact`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Toolzaply",
      url: `${siteConfig.url}/contact`,
    },
  },

  // Blog Posts
  "blog-10-essential-productivity-tools-2024": {
    title: "10 Essential Free Productivity Tools Every Professional Needs in 2025 | Toolzaply",
    description: "Discover the top 10 free online productivity tools that will transform your workflow in 2025. From PDF converters to Pomodoro timers — all in your browser.",
    keywords: ["free productivity tools 2025", "best online tools for professionals", "workflow tools free", "productivity tips", "free browser tools"],
    canonical: `${siteConfig.url}/blog/essential-productivity-tools-2024`,
    ogTitle: "10 Essential Free Productivity Tools Every Professional Needs in 2025",
    ogDescription: "Boost your workflow with these 10 free browser-based tools — no installs, no accounts.",
    ogImage: siteConfig.ogImage,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "10 Essential Free Productivity Tools Every Professional Needs in 2025",
      description: "Discover the top 10 free online productivity tools that will transform your workflow in 2025.",
      url: `${siteConfig.url}/blog/essential-productivity-tools-2024`,
      author: { "@type": "Organization", name: "Toolzaply" },
      publisher: { "@type": "Organization", name: "Toolzaply", url: siteConfig.url },
      datePublished: "2025-01-20",
      dateModified: "2025-06-10",
    },
  },

  "blog-best-free-pdf-tools-guide": {
    title: "Best Free PDF Tools Online in 2025 — Merge, Split, Compress & Convert | Toolzaply",
    description: "A complete guide to the best free PDF tools available in 2025. Learn how to merge, split, compress, and convert PDFs without paying for Adobe Acrobat.",
    keywords: ["best free pdf tools", "pdf tools online 2025", "merge pdf free", "split pdf free", "compress pdf online", "adobe acrobat alternative"],
    canonical: `${siteConfig.url}/blog/best-free-pdf-tools-guide`,
    ogTitle: "Best Free PDF Tools Online 2025 — No Adobe Needed",
    ogDescription: "Merge, split, compress and convert PDFs for free. A complete guide to the best browser-based PDF tools in 2025.",
    ogImage: siteConfig.ogImage,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Best Free PDF Tools Online in 2025 — Merge, Split, Compress & Convert",
      description: "A complete guide to the best free PDF tools available in 2025.",
      url: `${siteConfig.url}/blog/best-free-pdf-tools-guide`,
      author: { "@type": "Organization", name: "Toolzaply" },
      publisher: { "@type": "Organization", name: "Toolzaply", url: siteConfig.url },
      datePublished: "2025-01-25",
      dateModified: "2025-06-10",
    },
  },

  "blog-markdown-editor-guide": {
    title: "Markdown Editor Guide: Write Better Docs Faster in 2025 | Toolzaply",
    description: "Learn how to use a Markdown editor to write documentation, README files, and blog posts faster. Includes syntax cheat sheet and live preview tips.",
    keywords: ["markdown editor guide", "how to use markdown", "markdown syntax", "markdown cheat sheet", "write documentation markdown"],
    canonical: `${siteConfig.url}/blog/markdown-editor-guide`,
    ogTitle: "Markdown Editor Guide: Write Better Docs Faster",
    ogDescription: "Master Markdown syntax and live preview editing. A practical guide for writers, developers, and bloggers.",
    ogImage: siteConfig.ogImage,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Markdown Editor Guide: Write Better Docs Faster in 2025",
      description: "Learn how to use a Markdown editor to write documentation, README files, and blog posts faster.",
      url: `${siteConfig.url}/blog/markdown-editor-guide`,
      author: { "@type": "Organization", name: "Toolzaply" },
      publisher: { "@type": "Organization", name: "Toolzaply", url: siteConfig.url },
      datePublished: "2025-02-05",
      dateModified: "2025-06-10",
    },
  },

  "blog-image-optimization-web-performance": {
    title: "Image Optimization Guide: Reduce File Size for Faster Web Pages | Toolzaply",
    description: "Learn how to compress and optimize images for faster page loads and better Core Web Vitals scores. Covers JPG, PNG, WebP best practices and free tools.",
    keywords: ["image optimization guide", "compress images for web", "reduce image file size", "web performance images", "core web vitals images", "webp vs jpg"],
    canonical: `${siteConfig.url}/blog/image-optimization-web-performance`,
    ogTitle: "Image Optimization Guide: Faster Pages with Smaller Images",
    ogDescription: "Compress images correctly for better Core Web Vitals. Practical guide covering JPG, PNG, WebP formats and free compression tools.",
    ogImage: siteConfig.ogImage,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Image Optimization Guide: Reduce File Size for Faster Web Pages",
      description: "Learn how to compress and optimize images for faster page loads and better Core Web Vitals scores.",
      url: `${siteConfig.url}/blog/image-optimization-web-performance`,
      author: { "@type": "Organization", name: "Toolzaply" },
      publisher: { "@type": "Organization", name: "Toolzaply", url: siteConfig.url },
      datePublished: "2025-02-10",
      dateModified: "2025-06-10",
    },
  },

  "blog-privacy-first-tools-local-processing": {
    title: "Why Privacy-First Tools Matter: Local Browser Processing Explained | Toolzaply",
    description: "Understand why tools that process files locally in your browser are safer than cloud-based alternatives. Learn what 'no upload' really means for your data.",
    keywords: ["privacy first tools", "local browser processing", "no upload tools", "data privacy online tools", "browser based tools safe"],
    canonical: `${siteConfig.url}/blog/privacy-first-tools-local-processing`,
    ogTitle: "Privacy-First Tools: Why Local Browser Processing Protects Your Data",
    ogDescription: "Learn why 'no upload' tools are safer for sensitive files — and how local browser processing protects your privacy.",
    ogImage: siteConfig.ogImage,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Why Privacy-First Tools Matter: Local Browser Processing Explained",
      description: "Understand why tools that process files locally in your browser are safer than cloud-based alternatives.",
      url: `${siteConfig.url}/blog/privacy-first-tools-local-processing`,
      author: { "@type": "Organization", name: "Toolzaply" },
      publisher: { "@type": "Organization", name: "Toolzaply", url: siteConfig.url },
      datePublished: "2025-02-18",
      dateModified: "2025-06-10",
    },
  },

  "blog-optimize-resume-for-ats": {
    title: "How to Optimize Your Resume for ATS in 2025 — Pass the Bots | Toolzaply",
    description: "Learn how to format your resume to pass Applicant Tracking Systems (ATS). Includes keyword tips, formatting rules, and common mistakes to avoid.",
    keywords: ["ats resume tips", "optimize resume for ats", "ats friendly resume", "resume keywords", "applicant tracking system resume"],
    canonical: `${siteConfig.url}/blog/optimize-resume-for-ats`,
    ogTitle: "How to Make an ATS-Friendly Resume in 2025",
    ogDescription: "Beat the bots with an ATS-optimized resume. Formatting rules, keyword tips, and mistakes to avoid.",
    ogImage: siteConfig.ogImage,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "How to Optimize Your Resume for ATS in 2025 — Pass the Bots",
      description: "Learn how to format your resume to pass Applicant Tracking Systems (ATS).",
      url: `${siteConfig.url}/blog/optimize-resume-for-ats`,
      author: { "@type": "Organization", name: "Toolzaply" },
      publisher: { "@type": "Organization", name: "Toolzaply", url: siteConfig.url },
      datePublished: "2025-03-01",
      dateModified: "2025-06-10",
    },
  },

  "blog-developer-guide-color-theory-css-gradients": {
    title: "Color Theory for Developers: RGB, HEX, HSL & CSS Gradients Explained | Toolzaply",
    description: "A practical guide for front-end developers on color models (RGB, HEX, HSL), color harmony, and creating beautiful CSS gradients for modern web design.",
    keywords: ["color theory for developers", "css gradients guide", "rgb hex hsl explained", "web design color theory", "tailwind css colors", "color picker for developers"],
    canonical: `${siteConfig.url}/blog/developer-guide-color-theory-css-gradients`,
    ogTitle: "Color Theory for Developers: RGB, HEX, HSL & CSS Gradients",
    ogDescription: "Understand color models and create CSS gradients that work. A practical guide for front-end developers.",
    ogImage: siteConfig.ogImage,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Color Theory for Developers: RGB, HEX, HSL & CSS Gradients Explained",
      description: "A practical guide for front-end developers on color models and CSS gradients.",
      url: `${siteConfig.url}/blog/developer-guide-color-theory-css-gradients`,
      author: { "@type": "Organization", name: "Toolzaply" },
      publisher: { "@type": "Organization", name: "Toolzaply", url: siteConfig.url },
      datePublished: "2025-03-05",
      dateModified: "2025-06-10",
    },
  },

  "blog-fake-data-generation-software-testing": {
    title: "Fake Data Generation for Software Testing: A Developer's Guide | Toolzaply",
    description: "Learn why generating realistic fake data is essential for unit tests, UI prototyping, and database seeding. Includes best practices and free tools.",
    keywords: ["fake data for testing", "test data generation", "mock data software testing", "synthetic data developer", "database seeding fake data"],
    canonical: `${siteConfig.url}/blog/fake-data-generation-software-testing`,
    ogTitle: "Fake Data Generation for Software Testing: Why & How",
    ogDescription: "Generate realistic fake data for unit tests, prototypes, and database seeds. A developer's practical guide.",
    ogImage: siteConfig.ogImage,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Fake Data Generation for Software Testing: A Developer's Guide",
      description: "Learn why generating realistic fake data is essential for software testing and how to do it.",
      url: `${siteConfig.url}/blog/fake-data-generation-software-testing`,
      author: { "@type": "Organization", name: "Toolzaply" },
      publisher: { "@type": "Organization", name: "Toolzaply", url: siteConfig.url },
      datePublished: "2025-03-10",
      dateModified: "2025-06-10",
    },
  },

  "blog-mastering-markdown-guide": {
    title: "Mastering Markdown: The Complete Syntax Guide for 2025 | Toolzaply",
    description: "The definitive Markdown syntax guide: headings, bold, italic, tables, code blocks, links, and more. Perfect for GitHub README files, docs, and blogging.",
    keywords: ["markdown syntax guide", "markdown cheat sheet 2025", "markdown headings bold italic", "github markdown", "markdown tables code blocks", "learn markdown"],
    canonical: `${siteConfig.url}/blog/mastering-markdown-guide`,
    ogTitle: "Mastering Markdown: Complete Syntax Reference 2025",
    ogDescription: "The complete Markdown syntax cheat sheet — headings, bold, italic, tables, code, links, and more explained with examples.",
    ogImage: siteConfig.ogImage,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Mastering Markdown: The Complete Syntax Guide for 2025",
      description: "The definitive Markdown syntax guide covering all common and advanced syntax elements.",
      url: `${siteConfig.url}/blog/mastering-markdown-guide`,
      author: { "@type": "Organization", name: "Toolzaply" },
      publisher: { "@type": "Organization", name: "Toolzaply", url: siteConfig.url },
      datePublished: "2025-03-15",
      dateModified: "2025-06-10",
    },
  },

  "blog-ultimate-guide-pdf-management": {
    title: "The Ultimate Guide to PDF Management: Merge, Split, Compress & More | Toolzaply",
    description: "Master PDF management with our complete guide. Learn how to merge, split, compress, rotate, and extract content from PDF files — all for free in your browser.",
    keywords: ["pdf management guide", "merge pdf", "split pdf", "compress pdf", "pdf tips", "pdf best practices"],
    canonical: `${siteConfig.url}/blog/ultimate-guide-pdf-management`,
    ogTitle: "The Ultimate PDF Management Guide — Free Browser Tools",
    ogDescription: "Merge, split, compress and extract from PDFs for free. The complete PDF management guide.",
    ogImage: siteConfig.ogImage,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "The Ultimate Guide to PDF Management: Merge, Split, Compress & More",
      description: "Master PDF management with our complete guide covering every major PDF operation.",
      url: `${siteConfig.url}/blog/ultimate-guide-pdf-management`,
      author: { "@type": "Organization", name: "Toolzaply" },
      publisher: { "@type": "Organization", name: "Toolzaply", url: siteConfig.url },
      datePublished: "2024-01-22",
      dateModified: "2025-06-10",
    },
  },

  "blog-pomodoro-technique-science-focus": {
    title: "The Pomodoro Technique: Science, Benefits & How to Start Today | Toolzaply",
    description: "Discover the science behind the Pomodoro Technique. Learn how 25-minute work intervals improve focus, reduce burnout, and boost daily productivity.",
    keywords: ["pomodoro technique", "time management", "focus productivity", "25 minute timer", "work intervals", "concentration tips"],
    canonical: `${siteConfig.url}/blog/pomodoro-technique-science-focus`,
    ogTitle: "The Pomodoro Technique: Science-Backed Focus Method",
    ogDescription: "Learn how 25-minute focused sessions can transform your productivity. The science and practice of the Pomodoro Technique.",
    ogImage: siteConfig.ogImage,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "The Pomodoro Technique: Science, Benefits & How to Start Today",
      description: "Discover the science behind the Pomodoro Technique and how 25-minute work intervals improve focus.",
      url: `${siteConfig.url}/blog/pomodoro-technique-science-focus`,
      author: { "@type": "Organization", name: "Toolzaply" },
      publisher: { "@type": "Organization", name: "Toolzaply", url: siteConfig.url },
      datePublished: "2024-02-01",
      dateModified: "2025-06-10",
    },
  },

  "blog-how-to-convert-images-to-pdf-guide": {
    title: "How to Convert Images to PDF: A Complete Step-by-Step Guide | Toolzaply",
    description: "Learn how to convert JPG, PNG, and other images to PDF correctly. Covers file preparation, quality settings, and best practices for professional results.",
    keywords: ["how to convert images to pdf", "jpg to pdf guide", "png to pdf", "image to pdf tutorial", "combine images pdf", "pdf conversion tips"],
    canonical: `${siteConfig.url}/blog/how-to-convert-images-to-pdf-guide`,
    ogTitle: "How to Convert Images to PDF: Step-by-Step Guide",
    ogDescription: "Convert JPG, PNG, and other images to PDF like a pro. File prep tips, quality settings, and common mistakes to avoid.",
    ogImage: siteConfig.ogImage,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "How to Convert Images to PDF: A Complete Step-by-Step Guide",
      description: "Learn how to convert images to PDF correctly with tips on file preparation, quality settings, and best practices.",
      url: `${siteConfig.url}/blog/how-to-convert-images-to-pdf-guide`,
      author: { "@type": "Organization", name: "Toolzaply" },
      publisher: { "@type": "Organization", name: "Toolzaply", url: siteConfig.url },
      datePublished: "2024-04-01",
      dateModified: "2025-06-10",
    },
  },

  "blog-understanding-color-formats-hex-rgb-hsl": {
    title: "HEX vs RGB vs HSL: Understanding Color Formats for Web Design | Toolzaply",
    description: "A clear explanation of HEX, RGB, RGBA, HSL, and HSLA color formats. Learn when to use each one and how to convert between them for web design and CSS.",
    keywords: ["hex vs rgb vs hsl", "color formats explained", "css color values", "rgba vs hsla", "web design color formats", "when to use hex rgb hsl"],
    canonical: `${siteConfig.url}/blog/understanding-color-formats-hex-rgb-hsl`,
    ogTitle: "HEX vs RGB vs HSL: Which Color Format Should You Use?",
    ogDescription: "Clear guide to web color formats — when to use HEX, RGB, RGBA, HSL, and HSLA in your CSS and design work.",
    ogImage: siteConfig.ogImage,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "HEX vs RGB vs HSL: Understanding Color Formats for Web Design",
      description: "A clear explanation of HEX, RGB, RGBA, HSL, and HSLA color formats and when to use each.",
      url: `${siteConfig.url}/blog/understanding-color-formats-hex-rgb-hsl`,
      author: { "@type": "Organization", name: "Toolzaply" },
      publisher: { "@type": "Organization", name: "Toolzaply", url: siteConfig.url },
      datePublished: "2024-04-10",
      dateModified: "2025-06-10",
    },
  },

  "blog-qr-codes-explained-how-they-work": {
    title: "How QR Codes Work: Technology, Structure & Real-World Uses | Toolzaply",
    description: "A deep dive into QR code technology — how they store data, error correction levels, capacity limits, and practical applications across industries.",
    keywords: ["how qr codes work", "qr code technology", "qr code structure", "qr code error correction", "qr code use cases", "quick response code explained"],
    canonical: `${siteConfig.url}/blog/qr-codes-explained-how-they-work`,
    ogTitle: "How QR Codes Work: A Complete Technical Guide",
    ogDescription: "Discover how QR codes store data, what error correction means, and how they're used across industries from payments to healthcare.",
    ogImage: siteConfig.ogImage,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "How QR Codes Work: Technology, Structure & Real-World Uses",
      description: "A deep dive into QR code technology — how they store data, error correction levels, and real-world applications.",
      url: `${siteConfig.url}/blog/qr-codes-explained-how-they-work`,
      author: { "@type": "Organization", name: "Toolzaply" },
      publisher: { "@type": "Organization", name: "Toolzaply", url: siteConfig.url },
      datePublished: "2024-04-20",
      dateModified: "2025-06-10",
    },
  },

  "blog-complete-guide-unit-conversion": {
    title: "Unit Conversion Guide: Metric, Imperial & Common Conversions Explained | Toolzaply",
    description: "A complete guide to unit conversion covering metric vs imperial systems, essential conversion factors for length, weight, temperature, and volume, plus common mistakes.",
    keywords: ["unit conversion guide", "metric to imperial", "kg to lbs conversion", "celsius to fahrenheit", "measurement systems", "unit converter reference"],
    canonical: `${siteConfig.url}/blog/complete-guide-unit-conversion`,
    ogTitle: "Unit Conversion Guide: Metric vs Imperial — All You Need to Know",
    ogDescription: "Essential conversion factors for length, weight, temperature, and volume. Avoid common mistakes with this complete unit conversion reference.",
    ogImage: siteConfig.ogImage,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Unit Conversion Guide: Metric, Imperial & Common Conversions Explained",
      description: "A complete guide to unit conversion covering metric vs imperial systems and essential conversion factors.",
      url: `${siteConfig.url}/blog/complete-guide-unit-conversion`,
      author: { "@type": "Organization", name: "Toolzaply" },
      publisher: { "@type": "Organization", name: "Toolzaply", url: siteConfig.url },
      datePublished: "2024-05-01",
      dateModified: "2025-06-10",
    },
  },

  "blog-improve-typing-speed-accuracy-30-days": {
    title: "How to Improve Typing Speed in 30 Days: From 40 WPM to 70+ WPM | Toolzaply",
    description: "Actionable 30-day plan to increase your typing speed and accuracy. Daily exercises, touch typing tips, ergonomic advice, and how to track your WPM progress.",
    keywords: ["improve typing speed", "how to type faster", "increase wpm", "touch typing tips", "typing speed in 30 days", "typing accuracy improvement"],
    canonical: `${siteConfig.url}/blog/improve-typing-speed-accuracy-30-days`,
    ogTitle: "Improve Your Typing Speed in 30 Days: 40 WPM to 70+ WPM",
    ogDescription: "A practical 30-day plan to boost your WPM and accuracy — daily exercises, touch typing tips, and progress tracking.",
    ogImage: siteConfig.ogImage,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "How to Improve Typing Speed in 30 Days: From 40 WPM to 70+ WPM",
      description: "Actionable 30-day plan to increase your typing speed and accuracy with daily exercises and touch typing tips.",
      url: `${siteConfig.url}/blog/improve-typing-speed-accuracy-30-days`,
      author: { "@type": "Organization", name: "Toolzaply" },
      publisher: { "@type": "Organization", name: "Toolzaply", url: siteConfig.url },
      datePublished: "2025-03-20",
      dateModified: "2025-06-10",
    },
  },
};

export const getSEOConfig = (toolId: string): SEOConfig => {
  const normalized = toolId.toLowerCase().replace(/_/g, "-");
  if (seoConfigs[normalized]) return seoConfigs[normalized];
  if (normalized === "imagecompressor") return seoConfigs["image-compressor"];
  if (normalized === "wordtopdf") return seoConfigs["word-to-pdf"];
  if (normalized === "imagetopdf") return seoConfigs["image-to-pdf"];
  if (normalized === "pdftools") return seoConfigs["pdf-tools"];
  if (normalized === "qrtools" || normalized === "qr-generator") return seoConfigs["qr-tools"];
  return seoConfigs.home;
};

