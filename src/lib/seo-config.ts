export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  structuredData?: object;
  additionalMeta?: Array<{ name: string; content: string }>;
}

export const siteConfig = {
  name: "Digital Toolbox",
  url: "https://digitaltoolbox.com", // Replace with your actual domain
  description:
    "Free online tools for productivity, conversion, and utility tasks",
  keywords: [
    "free online tools",
    "productivity tools",
    "pdf converter",
    "image tools",
    "text converter",
    "online utilities",
    "browser tools",
    "no registration tools",
  ],
};

export const seoConfigs: Record<string, SEOConfig> = {
  // Homepage
  home: {
    title: "Digital Toolbox - Free Online Tools for Productivity & Conversion",
    description:
      "Collection of 13+ free online tools for PDF conversion, image processing, text manipulation, color tools, timers and more. No registration required.",
    keywords: [
      "free online tools",
      "pdf converter",
      "image tools",
      "text converter",
      "color picker",
      "productivity tools",
      "online utilities",
      "browser tools",
      "no registration",
      "free tools",
    ],
    ogTitle: "Digital Toolbox - Free Online Tools",
    ogDescription:
      "13+ powerful free tools for PDF conversion, image processing, text manipulation and more. All in your browser.",
    canonical: siteConfig.url,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Digital Toolbox",
      description:
        "Collection of free online tools for productivity and conversion",
      url: siteConfig.url,
      applicationCategory: "ProductivityApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  },

  // Image to PDF Converter
  "image-to-pdf": {
    title: "Image to PDF Converter - Convert Images to PDF Online Free",
    description:
      "Convert multiple images to PDF online for free. Merge JPG, PNG, GIF images into a single PDF document instantly. No registration required, works in browser.",
    keywords: [
      "image to pdf converter",
      "convert images to pdf",
      "jpg to pdf",
      "png to pdf",
      "merge images to pdf",
      "online pdf converter",
      "free image to pdf",
      "photo to pdf converter",
      "image pdf converter",
      "convert photos to pdf",
    ],
    ogTitle: "Image to PDF Converter - Free Online Tool",
    ogDescription:
      "Convert multiple images to PDF online for free. Merge JPG, PNG, GIF images into a single PDF document instantly.",
    canonical: `${siteConfig.url}/tools/image-to-pdf`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Image to PDF Converter",
      description: "Convert multiple images to PDF online for free",
      url: `${siteConfig.url}/tools/image-to-pdf`,
      applicationCategory: "ProductivityApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Convert JPG to PDF",
        "Convert PNG to PDF",
        "Merge multiple images",
        "No registration required",
        "Works in browser",
      ],
    },
  },

  // PDF Tools Suite
  "pdf-tools": {
    title: "PDF Tools Suite - Merge, Split, Rotate PDF Files Online Free",
    description:
      "Complete PDF tools suite. Merge multiple PDFs, split PDF pages, rotate PDF files, compress PDF size, and extract text from PDF online. Free and secure.",
    keywords: [
      "pdf tools",
      "merge pdf",
      "split pdf",
      "rotate pdf",
      "compress pdf",
      "pdf merger",
      "pdf splitter",
      "online pdf tools",
      "free pdf tools",
      "pdf editor online",
      "extract text from pdf",
    ],
    ogTitle: "PDF Tools Suite - Free Online PDF Tools",
    ogDescription:
      "Merge, split, rotate, compress and extract content from PDFs online for free.",
    canonical: `${siteConfig.url}/tools/pdf-tools`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "PDF Tools Suite",
      description:
        "Complete PDF tools suite for merging, splitting, rotating and compressing PDFs",
      url: `${siteConfig.url}/tools/pdf-tools`,
      applicationCategory: "ProductivityApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Merge PDF files",
        "Split PDF pages",
        "Rotate PDF documents",
        "Compress PDF size",
        "Extract text from PDF",
      ],
    },
  },

  // Text Converter
  "text-converter": {
    title: "Text Case Converter - Convert Text Case Online Free",
    description:
      "Convert text case online for free. Transform text to uppercase, lowercase, title case, camelCase, snake_case and more. No registration required.",
    keywords: [
      "text case converter",
      "uppercase converter",
      "lowercase converter",
      "title case converter",
      "camelcase converter",
      "text transformer",
      "case converter online",
      "free text converter",
      "text case changer",
      "string case converter",
    ],
    ogTitle: "Text Case Converter - Free Online Tool",
    ogDescription:
      "Convert text case online for free. Transform text to uppercase, lowercase, title case, camelCase and more.",
    canonical: `${siteConfig.url}/tools/text-converter`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Text Case Converter",
      description: "Convert text case online for free",
      url: `${siteConfig.url}/tools/text-converter`,
      applicationCategory: "ProductivityApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Uppercase converter",
        "Lowercase converter",
        "Title case converter",
        "CamelCase converter",
        "Snake_case converter",
      ],
    },
  },

  // Unit Converter
  "unit-converter": {
    title: "Unit Converter - Convert Units Online Free",
    description:
      "Free online unit converter. Convert between length, weight, temperature, area, volume, speed, and more units. Accurate and easy to use.",
    keywords: [
      "unit converter",
      "length converter",
      "weight converter",
      "temperature converter",
      "area converter",
      "volume converter",
      "speed converter",
      "online converter",
      "free unit converter",
      "measurement converter",
    ],
    ogTitle: "Unit Converter - Free Online Tool",
    ogDescription:
      "Convert between length, weight, temperature, area, volume, speed, and more units online for free.",
    canonical: `${siteConfig.url}/tools/unit-converter`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Unit Converter",
      description: "Convert between different units of measurement online",
      url: `${siteConfig.url}/tools/unit-converter`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Length converter",
        "Weight converter",
        "Temperature converter",
        "Area converter",
        "Volume converter",
        "Speed converter",
      ],
    },
  },

  // QR Tools
  "qr-tools": {
    title: "QR Code Generator & Scanner - Create & Scan QR Codes Online Free",
    description:
      "Generate QR codes from text, URLs, or contact information. Scan QR codes using your camera. Free online QR code generator and scanner.",
    keywords: [
      "qr code generator",
      "qr code scanner",
      "create qr code",
      "scan qr code",
      "qr code maker",
      "free qr generator",
      "online qr code",
      "qr code reader",
      "generate qr code",
      "qr code creator",
    ],
    ogTitle: "QR Code Generator & Scanner - Free Online Tool",
    ogDescription:
      "Generate QR codes from text/URLs and scan QR codes using your camera. Free online tool.",
    canonical: `${siteConfig.url}/tools/qr-tools`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "QR Code Generator & Scanner",
      description: "Generate and scan QR codes online for free",
      url: `${siteConfig.url}/tools/qr-tools`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "QR code generator",
        "QR code scanner",
        "Text to QR code",
        "URL to QR code",
        "Contact QR code",
        "Camera scanner",
      ],
    },
  },

  // Markdown Editor
  "markdown-editor": {
    title: "Markdown Editor - Write & Preview Markdown Online Free",
    description:
      "Free online markdown editor with live preview. Write markdown content and see real-time rendering. Save locally and export to various formats.",
    keywords: [
      "markdown editor",
      "markdown preview",
      "online markdown",
      "markdown writer",
      "free markdown editor",
      "markdown notepad",
      "live markdown preview",
      "markdown converter",
      "write markdown online",
      "markdown tool",
    ],
    ogTitle: "Markdown Editor - Free Online Tool",
    ogDescription:
      "Write and preview markdown with live rendering and local storage. Free online markdown editor.",
    canonical: `${siteConfig.url}/tools/markdown-editor`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Markdown Editor",
      description: "Write and preview markdown with live rendering",
      url: `${siteConfig.url}/tools/markdown-editor`,
      applicationCategory: "ProductivityApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Live markdown preview",
        "Local storage",
        "Export to HTML",
        "Export to PDF",
        "Syntax highlighting",
        "Auto-save",
      ],
    },
  },

  // Color Tools
  "color-tools": {
    title: "Color Tools Suite - Color Picker, Converter & Palette Generator",
    description:
      "Complete color tools suite. Color picker, RGB to HEX converter, color palette generator, gradient maker, and color scheme creator. Free online color tools.",
    keywords: [
      "color picker",
      "color converter",
      "rgb to hex",
      "hex to rgb",
      "color palette generator",
      "gradient generator",
      "color scheme creator",
      "online color tools",
      "free color picker",
      "color tools suite",
    ],
    ogTitle: "Color Tools Suite - Free Online Color Tools",
    ogDescription:
      "Color picker, converter, palette and gradient generator all in one place. Free online color tools.",
    canonical: `${siteConfig.url}/tools/color-tools`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Color Tools Suite",
      description: "Complete color tools suite for designers and developers",
      url: `${siteConfig.url}/tools/color-tools`,
      applicationCategory: "DesignApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Color picker",
        "RGB to HEX converter",
        "Color palette generator",
        "Gradient generator",
        "Color scheme creator",
        "Color harmony tools",
      ],
    },
  },

  // Timer Tools
  "timer-tools": {
    title: "Pomodoro Timer & Stopwatch - Productivity Timer Online Free",
    description:
      "Free online productivity timers including Pomodoro technique timer, countdown timer, and stopwatch. Boost your productivity with focused work sessions.",
    keywords: [
      "pomodoro timer",
      "stopwatch",
      "countdown timer",
      "productivity timer",
      "focus timer",
      "work timer",
      "online timer",
      "free timer",
      "pomodoro technique",
      "time management tool",
    ],
    ogTitle: "Pomodoro Timer & Stopwatch - Free Online Tool",
    ogDescription:
      "Productivity timers including Pomodoro technique, countdown and stopwatch. Free online timer tools.",
    canonical: `${siteConfig.url}/tools/timer-tools`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Pomodoro Timer & Stopwatch",
      description: "Productivity timers for focused work sessions",
      url: `${siteConfig.url}/tools/timer-tools`,
      applicationCategory: "ProductivityApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Pomodoro timer",
        "Countdown timer",
        "Stopwatch",
        "Productivity tracking",
        "Focus sessions",
        "Time management",
      ],
    },
  },

  // Resume Builder
  "resume-builder": {
    title: "Resume Builder - Create Professional Resume Online Free",
    description:
      "Create professional resumes online for free. Choose from multiple templates, customize content, and export to PDF. No registration required.",
    keywords: [
      "resume builder",
      "create resume",
      "professional resume",
      "resume template",
      "cv builder",
      "free resume maker",
      "online resume builder",
      "resume creator",
      "job application resume",
      "resume generator",
    ],
    ogTitle: "Resume Builder - Free Online Tool",
    ogDescription:
      "Create professional resumes with customizable templates and PDF export. Free online resume builder.",
    canonical: `${siteConfig.url}/tools/resume-builder`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Resume Builder",
      description: "Create professional resumes with customizable templates",
      url: `${siteConfig.url}/tools/resume-builder`,
      applicationCategory: "ProductivityApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Professional templates",
        "Customizable content",
        "PDF export",
        "No registration",
        "Multiple formats",
        "Print ready",
      ],
    },
  },

  // Fake Data Generator
  "fake-data-generator": {
    title: "Fake Data Generator - Generate Test Data Online Free",
    description:
      "Generate fake data for testing and development. Create names, emails, addresses, phone numbers, and JSON objects. Perfect for developers and testers.",
    keywords: [
      "fake data generator",
      "test data generator",
      "generate fake names",
      "fake email generator",
      "fake address generator",
      "json data generator",
      "test data creator",
      "mock data generator",
      "fake user data",
      "development data",
    ],
    ogTitle: "Fake Data Generator - Free Online Tool",
    ogDescription:
      "Generate placeholder data including names, emails, addresses and JSON objects. Perfect for developers and testers.",
    canonical: `${siteConfig.url}/tools/fake-data-generator`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Fake Data Generator",
      description: "Generate fake data for testing and development",
      url: `${siteConfig.url}/tools/fake-data-generator`,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Generate fake names",
        "Generate fake emails",
        "Generate fake addresses",
        "Generate JSON data",
        "Customizable data",
        "Export options",
      ],
    },
  },

  // Image Compressor
  "image-compressor": {
    title: "Image Compressor - Compress Images Online Free",
    description:
      "Compress and resize images online for free. Reduce image file size without losing quality. Support for JPG, PNG, WebP formats. No registration required.",
    keywords: [
      "image compressor",
      "compress images",
      "reduce image size",
      "image optimizer",
      "jpg compressor",
      "png compressor",
      "webp converter",
      "online image compression",
      "free image compressor",
      "image resizer",
    ],
    ogTitle: "Image Compressor - Free Online Tool",
    ogDescription:
      "Compress and resize images directly in your browser without quality loss. Free online image compression.",
    canonical: `${siteConfig.url}/tools/image-compressor`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Image Compressor",
      description: "Compress and resize images online for free",
      url: `${siteConfig.url}/tools/image-compressor`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Image compression",
        "Image resizing",
        "Quality control",
        "Batch processing",
        "Multiple formats",
        "No quality loss",
      ],
    },
  },

  // Age Calculator
  "age-calculator": {
    title: "Age Calculator - Calculate Age from Birth Date Online Free",
    description:
      "Calculate exact age from birth date. Get age in years, months, days, and even zodiac sign. Free online age calculator with detailed breakdown.",
    keywords: [
      "age calculator",
      "calculate age",
      "birth date calculator",
      "age from date of birth",
      "zodiac sign calculator",
      "age in years months days",
      "online age calculator",
      "free age calculator",
      "birthday calculator",
      "age finder",
    ],
    ogTitle: "Age Calculator - Free Online Tool",
    ogDescription:
      "Calculate exact age, zodiac sign and interesting facts from birth date. Free online age calculator.",
    canonical: `${siteConfig.url}/tools/age-calculator`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Age Calculator",
      description: "Calculate exact age from birth date",
      url: `${siteConfig.url}/tools/age-calculator`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Age calculation",
        "Zodiac sign",
        "Detailed breakdown",
        "Years, months, days",
        "Interesting facts",
        "Birthday calculator",
      ],
    },
  },

  // Typing Test
  "typing-test": {
    title: "Typing Speed Test - Test Your Typing Speed Online Free",
    description:
      "Test your typing speed and accuracy online for free. Get detailed performance analytics including WPM, accuracy, and error analysis. Improve your typing skills.",
    keywords: [
      "typing speed test",
      "typing test",
      "wpm test",
      "typing speed calculator",
      "typing accuracy test",
      "online typing test",
      "free typing test",
      "typing practice",
      "keyboard speed test",
      "typing wpm calculator",
    ],
    ogTitle: "Typing Speed Test - Free Online Tool",
    ogDescription:
      "Test your typing speed and accuracy with detailed performance analytics. Free online typing test.",
    canonical: `${siteConfig.url}/tools/typing-test`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Typing Speed Test",
      description: "Test your typing speed and accuracy online",
      url: `${siteConfig.url}/tools/typing-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Typing speed test",
        "WPM calculation",
        "Accuracy measurement",
        "Error analysis",
        "Performance tracking",
        "Typing practice",
      ],
    },
  },
};

export const getSEOConfig = (toolId: string): SEOConfig => {
  return seoConfigs[toolId] || seoConfigs.home;
};
