export interface FaqItem {
  q: string;
  a: string;
}

export const faqItems: FaqItem[] = [
  {
    q: "Are all Toolzaply tools completely free to use?",
    a: "Yes, every tool on Toolzaply is completely free with no hidden costs, subscription fees, usage limits, or premium tiers. We are supported by advertising, which lets us keep every tool free for everyone. You can use any tool as many times as you want.",
  },
  {
    q: "Do I need to create an account or register?",
    a: "No. None of our tools require registration, sign-up, or any personal information. Visit the tool you need and start using it immediately. This is a deliberate design choice — it protects your privacy and saves your time.",
  },
  {
    q: "How is my data handled? Are my files uploaded to your servers?",
    a: "Your files never leave your device. All our tools run entirely in your browser using client-side JavaScript — when you convert a Word document to PDF or compress an image, the processing happens on your own computer. We have no servers that receive, store, or process your files. This makes Toolzaply fundamentally more private than converter sites that upload your files.",
  },
  {
    q: "Which file formats do the tools support?",
    a: "It depends on the tool. Images: JPG, PNG, GIF, WebP, BMP. Documents: DOCX (Word), PDF, TXT, and Markdown. Data: JSON and CSV. Each tool page lists its exact supported formats and any size limits.",
  },
  {
    q: "Can I use the tools on my phone or tablet?",
    a: "Yes. Every tool is built with a responsive layout that adapts to phones, tablets, laptops, and desktops. Some heavy operations (like converting very large documents) are faster on a computer, but everything works on mobile.",
  },
  {
    q: "Is there a file size limit?",
    a: "Most tools accept files up to 20–50 MB depending on the tool. Because processing happens on your device, the practical limit depends on your device's memory. The limit for each tool is shown on its page.",
  },
  {
    q: "Can I use Toolzaply for commercial or business purposes?",
    a: "Yes. Everything you create with our tools — PDFs, compressed images, QR codes, resumes, color palettes — is yours to use for personal or commercial projects without attribution or licensing fees.",
  },
  {
    q: "Why do some conversions look slightly different from the original?",
    a: "Browser-based conversion uses your browser's rendering engine, which can differ slightly from desktop software like Microsoft Word. For everyday documents the output is visually equivalent. For documents with advanced features (SmartArt, embedded charts), we surface a warning so you can check the preview before downloading.",
  },
  {
    q: "Do the tools work offline?",
    a: "After a tool page has loaded, most tools continue working without an internet connection, since all processing is local. You need a connection only to load the page initially.",
  },
  {
    q: "How do you make money if everything is free?",
    a: "Toolzaply is supported by advertising. We show ads alongside tools, which covers our development and hosting costs. We never sell user data — we don't collect your files or personal information in the first place.",
  },
  {
    q: "Which browsers are supported?",
    a: "All modern browsers: Chrome, Firefox, Safari, Edge, and Chromium-based browsers like Brave and Opera. We recommend keeping your browser updated for the best performance, especially for heavier tools like the PDF suite and Word to PDF converter.",
  },
  {
    q: "I found a bug or have a feature request. How do I contact you?",
    a: "Use our contact page or email us directly. We read every message and typically respond within 24–48 hours. Bug reports with the file type and browser you used help us fix issues faster.",
  },
];
