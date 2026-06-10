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

  "image-to-pdf": {
    title: "JPG to PDF Converter — Free, Instant, No Upload Required",
    description:
      "Convert JPG, PNG, or GIF images to PDF in seconds. Merge multiple images into one PDF document. 100% free, works in your browser, no file uploads to any server.",
    keywords: [
      "jpg to pdf",
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
      "combine images into one pdf free",
      "convert photo to pdf without app",
      "batch image to pdf converter",
      "gif to pdf converter",
    ],
    ogTitle: "Free JPG to PDF Converter — No Upload, Instant Download",
    ogDescription:
      "Convert JPG, PNG, GIF images to PDF instantly. Merge multiple photos into one PDF. No file size limit, no sign-up.",
    ogImage: siteConfig.ogImage,
    canonical: `${siteConfig.url}/tools/image-to-pdf`,
    structuredData: [
      softwareApp(
        "Image to PDF Converter",
        "Convert JPG, PNG, and GIF images to PDF online for free. Merge multiple images into a single PDF document instantly in your browser.",
        "/tools/image-to-pdf",
        "UtilityApplication",
        ["Convert JPG to PDF", "Convert PNG to PDF", "Merge multiple images into PDF", "No file upload required", "Instant PDF download", "Supports JPG, PNG, GIF, WebP"]
      ),
      breadcrumb("Image to PDF Converter", "/tools/image-to-pdf"),
      faqSchema([
        { q: "How do I convert a JPG image to PDF for free?", a: "Upload your JPG image on the Image to PDF page at Toolzaply, then click 'Convert to PDF'. The PDF downloads instantly in your browser — no account or payment needed." },
        { q: "Can I merge multiple images into one PDF?", a: "Yes. Select multiple image files at once. Toolzaply will combine all of them into a single PDF in the order you choose." },
        { q: "Is there a file size limit for converting images to PDF?", a: "There is no hard server limit because all processing happens in your browser. Performance depends on your device, but images up to 50MB each work well." },
        { q: "Does converting images to PDF require an account?", a: "No. Toolzaply's Image to PDF converter requires no registration, no email, and no login. Just open the page and convert." },
        { q: "Which image formats can be converted to PDF?", a: "Toolzaply supports JPG/JPEG, PNG, GIF, and WebP images for PDF conversion." },
      ]),
    ],
  },

  "pdf-tools": {
    title: "PDF Tools — Merge, Split, Compress & Rotate PDF Free Online",
    description:
      "All-in-one free PDF tools: merge multiple PDFs into one, split PDF pages, rotate pages, compress PDF file size, and extract text — all in your browser.",
    keywords: [
      "merge pdf online free",
      "pdf merger free",
      "split pdf online",
      "compress pdf online free",
      "rotate pdf pages",
      "combine pdf files free",
      "pdf tools free",
      "pdf editor online free",
      "extract text from pdf",
      "reduce pdf file size online",
      "how to merge pdf files",
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
        ["Merge PDF files", "Split PDF pages", "Rotate PDF documents", "Compress PDF size", "Extract text from PDF", "No software install required"]
      ),
      breadcrumb("PDF Tools", "/tools/pdf-tools"),
      faqSchema([
        { q: "How do I merge multiple PDF files into one for free?", a: "Go to PDF Tools on Toolzaply, select the 'Merge PDF' tab, upload your PDF files, arrange their order, and click Merge. The combined PDF downloads instantly — no account needed." },
        { q: "Can I compress a PDF file to reduce its size online?", a: "Yes. Use the Compress PDF tab on Toolzaply's PDF Tools page. Upload your PDF and the tool reduces its file size while preserving readability, all in your browser." },
        { q: "How do I split a PDF into separate pages?", a: "Select the Split PDF tab, upload your file, choose which pages to extract or specify a page range, and download the resulting PDF(s) instantly." },
        { q: "Does compressing a PDF reduce its quality?", a: "Compression removes redundant data and optimises internal structures. Text quality stays intact. Very high-resolution images may see minor quality reduction, but documents remain readable." },
        { q: "Do I need to install software to use these PDF tools?", a: "No installation is needed. All PDF tools on Toolzaply run entirely in your web browser using JavaScript." },
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
    title: "QR Code Generator Free — Create QR Code for URL, Text, WiFi",
    description:
      "Generate QR codes for any URL, text, WiFi password, or contact info instantly. Download as PNG. Free online QR code generator — no watermark, no sign-up.",
    keywords: [
      "qr code generator free",
      "create qr code for url",
      "free qr code generator no watermark",
      "qr code maker online",
      "generate qr code for website",
      "qr code generator for wifi",
      "qr code for text",
      "qr code creator online",
      "download qr code png",
      "custom qr code generator",
      "qr code generator no sign up",
      "how to create a qr code for free",
      "qr code for link",
      "free qr code no expiry",
      "qr code generator for business",
    ],
    ogTitle: "Free QR Code Generator — URL, Text, WiFi, No Watermark",
    ogDescription:
      "Create QR codes for URLs, text, WiFi passwords and more. Download as PNG instantly. No watermark, no expiry, no account needed.",
    ogImage: siteConfig.ogImage,
    canonical: `${siteConfig.url}/tools/qr-tools`,
    structuredData: [
      softwareApp(
        "QR Code Generator",
        "Free online QR code generator. Create QR codes for URLs, text, WiFi, and contact info. Download as PNG instantly with no watermark.",
        "/tools/qr-tools",
        "UtilityApplication",
        ["URL to QR code", "Text to QR code", "WiFi QR code", "Contact card QR code", "PNG download", "No watermark", "No expiry date"]
      ),
      breadcrumb("QR Code Generator", "/tools/qr-tools"),
      faqSchema([
        { q: "How do I create a QR code for a website URL for free?", a: "Go to the QR Code Generator on Toolzaply, paste your URL into the input field, and your QR code generates instantly. Click Download to save it as a PNG image — no account needed." },
        { q: "Do QR codes generated on Toolzaply expire?", a: "No. Because Toolzaply generates QR codes entirely in your browser without any server tracking, the QR codes never expire and are completely free." },
        { q: "Can I generate a QR code for WiFi so guests can connect easily?", a: "Yes. Select the WiFi option, enter your network name (SSID) and password, and the tool creates a QR code that guests can scan to join your network automatically." },
        { q: "Is there a watermark on QR codes generated by Toolzaply?", a: "No. QR codes downloaded from Toolzaply have no watermark and are free to use for personal or commercial purposes." },
        { q: "What size should my QR code be for printing?", a: "For print, a QR code should be at least 2 cm × 2 cm (about 0.8 inches). Download the PNG from Toolzaply at high resolution and scale it up in your design software without quality loss." },
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
    title: "Compress Image Online Free — Reduce JPG, PNG Size Without Quality Loss",
    description:
      "Compress JPG, PNG, and WebP images online for free. Reduce image file size by up to 90% without visible quality loss. No upload to server — runs in your browser.",
    keywords: [
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
      "image compression tool free",
      "shrink image file size online",
    ],
    ogTitle: "Free Image Compressor — Reduce JPG & PNG Size Online",
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
        ["JPG/JPEG compression", "PNG compression", "WebP compression", "Up to 90% size reduction", "Batch compression", "Quality slider control", "No file upload to server"]
      ),
      breadcrumb("Image Compressor", "/tools/image-compressor"),
      faqSchema([
        { q: "How do I compress an image without losing quality?", a: "Upload your image to the Image Compressor on Toolzaply and use the quality slider to find the best balance between file size and visual quality. Compression of 60–80% quality typically reduces file size by 50–80% with no visible difference." },
        { q: "What image formats can I compress on Toolzaply?", a: "Toolzaply supports JPG/JPEG, PNG, and WebP image compression. All processing happens in your browser — your images are never uploaded to any server." },
        { q: "How much can I reduce an image file size?", a: "Typically 40–90% depending on the original image and the quality setting. A 5MB JPG can often be reduced to under 500KB with minimal visible quality change." },
        { q: "Can I compress multiple images at once?", a: "Yes. Select multiple images when uploading and the tool compresses each one individually, allowing you to download them all." },
        { q: "Is my image data private when using Toolzaply's compressor?", a: "Yes. All image compression happens locally in your browser using JavaScript. Your images are never sent to any server, ensuring complete privacy." },
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
  return seoConfigs[toolId] || seoConfigs.home;
};
