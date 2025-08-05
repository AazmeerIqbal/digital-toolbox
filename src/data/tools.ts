import { 
  FileImage, 
  FileText, 
  Type, 
  Calculator, 
  QrCode, 
  Edit3, 
  Palette, 
  Timer, 
  FileUser, 
  Database, 
  ImageIcon, 
  Calendar, 
  Keyboard 
} from "lucide-react";

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: any;
  route: string;
  category: "productivity" | "conversion" | "generation" | "utility";
  featured: boolean;
}

export const tools: Tool[] = [
  {
    id: "image-to-pdf",
    title: "Image to PDF Converter",
    description: "Convert multiple images into a single PDF document instantly",
    icon: FileImage,
    route: "/tools/image-to-pdf",
    category: "conversion",
    featured: true
  },
  {
    id: "pdf-tools",
    title: "PDF Tools Suite",
    description: "Merge, split, rotate, compress and extract content from PDFs",
    icon: FileText,
    route: "/tools/pdf-tools",
    category: "productivity",
    featured: true
  },
  {
    id: "text-converter",
    title: "Text Case Converter",
    description: "Convert text to uppercase, lowercase, title case, camelCase and more",
    icon: Type,
    route: "/tools/text-converter",
    category: "conversion",
    featured: false
  },
  {
    id: "unit-converter",
    title: "Unit Converter",
    description: "Convert between different units of measurement including length, weight, temperature",
    icon: Calculator,
    route: "/tools/unit-converter",
    category: "utility",
    featured: false
  },
  {
    id: "qr-tools",
    title: "QR Code Generator & Scanner",
    description: "Generate QR codes from text/URLs and scan QR codes using your camera",
    icon: QrCode,
    route: "/tools/qr-tools",
    category: "generation",
    featured: true
  },
  {
    id: "markdown-editor",
    title: "Markdown Notepad",
    description: "Write and preview markdown with live rendering and local storage",
    icon: Edit3,
    route: "/tools/markdown-editor",
    category: "productivity",
    featured: false
  },
  {
    id: "color-tools",
    title: "Color Tools Suite",
    description: "Color picker, converter, palette and gradient generator all in one place",
    icon: Palette,
    route: "/tools/color-tools",
    category: "generation",
    featured: true
  },
  {
    id: "timer-tools",
    title: "Pomodoro Timer & Stopwatch",
    description: "Productivity timers including Pomodoro technique, countdown and stopwatch",
    icon: Timer,
    route: "/tools/timer-tools",
    category: "productivity",
    featured: false
  },
  {
    id: "resume-builder",
    title: "Resume Builder",
    description: "Create professional resumes with customizable templates and PDF export",
    icon: FileUser,
    route: "/tools/resume-builder",
    category: "generation",
    featured: true
  },
  {
    id: "fake-data-generator",
    title: "Fake Data Generator",
    description: "Generate placeholder data including names, emails, addresses and JSON objects",
    icon: Database,
    route: "/tools/fake-data-generator",
    category: "generation",
    featured: false
  },
  {
    id: "image-compressor",
    title: "Image Compressor",
    description: "Compress and resize images directly in your browser without quality loss",
    icon: ImageIcon,
    route: "/tools/image-compressor",
    category: "utility",
    featured: false
  },
  {
    id: "age-calculator",
    title: "Age Calculator",
    description: "Calculate exact age, zodiac sign and interesting facts from birth date",
    icon: Calendar,
    route: "/tools/age-calculator",
    category: "utility",
    featured: false
  },
  {
    id: "typing-test",
    title: "Typing Speed Test",
    description: "Test your typing speed and accuracy with detailed performance analytics",
    icon: Keyboard,
    route: "/tools/typing-test",
    category: "utility",
    featured: false
  }
];

export const featuredTools = tools.filter(tool => tool.featured);
export const toolsByCategory = tools.reduce((acc, tool) => {
  if (!acc[tool.category]) {
    acc[tool.category] = [];
  }
  acc[tool.category].push(tool);
  return acc;
}, {} as Record<string, Tool[]>);