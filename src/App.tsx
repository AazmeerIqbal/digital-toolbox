import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import SideAds from "@/components/SideAds";
import { CookieConsent } from "@/components/CookieConsent";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load Legal pages
const About = lazy(() => import("./pages/legal/About"));
const Privacy = lazy(() => import("./pages/legal/Privacy"));
const Terms = lazy(() => import("./pages/legal/Terms"));
const Contact = lazy(() => import("./pages/legal/Contact"));
const Faq = lazy(() => import("./pages/legal/Faq"));

// Lazy load Tool pages (dramatically reduces initial JS bundle size and eliminates FOUC)
const ImageToPdf = lazy(() => import("./pages/tools/ImageToPdf"));
const PdfTools = lazy(() => import("./pages/tools/PdfTools"));
const TextConverter = lazy(() => import("./pages/tools/TextConverter"));
const UnitConverter = lazy(() => import("./pages/tools/UnitConverter"));
const QrTools = lazy(() => import("./pages/tools/QrTools"));
const MarkdownEditor = lazy(() => import("./pages/tools/MarkdownEditor"));
const ColorTools = lazy(() => import("./pages/tools/ColorTools"));
const TimerTools = lazy(() => import("./pages/tools/TimerTools"));
const ResumeBuilder = lazy(() => import("./pages/tools/ResumeBuilder"));
const FakeDataGenerator = lazy(() => import("./pages/tools/FakeDataGenerator"));
const ImageCompressor = lazy(() => import("./pages/tools/ImageCompressor"));
const AgeCalculator = lazy(() => import("./pages/tools/AgeCalculator"));
const TypingTest = lazy(() => import("./pages/tools/TypingTest"));
const WordToPdf = lazy(() => import("./pages/tools/WordToPdf"));

// Lazy load Blog pages
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Blog = lazy(() => import("./pages/Blog"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="tools-theme">
        <TooltipProvider>
          <SideAds />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CookieConsent />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />

                {/* Legal Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<Faq />} />

                {/* Tool Routes */}
                <Route path="/tools/image-to-pdf" element={<ImageToPdf />} />
                <Route path="/tools/pdf-tools" element={<PdfTools />} />
                <Route path="/tools/text-converter" element={<TextConverter />} />
                <Route path="/tools/unit-converter" element={<UnitConverter />} />
                <Route path="/tools/qr-tools" element={<QrTools />} />
                <Route
                  path="/tools/markdown-editor"
                  element={<MarkdownEditor />}
                />
                <Route path="/tools/color-tools" element={<ColorTools />} />
                <Route path="/tools/timer-tools" element={<TimerTools />} />
                <Route path="/tools/resume-builder" element={<ResumeBuilder />} />
                <Route
                  path="/tools/fake-data-generator"
                  element={<FakeDataGenerator />}
                />
                <Route
                  path="/tools/image-compressor"
                  element={<ImageCompressor />}
                />
                <Route path="/tools/age-calculator" element={<AgeCalculator />} />
                <Route path="/tools/typing-test" element={<TypingTest />} />
                <Route path="/tools/word-to-pdf" element={<WordToPdf />} />

                {/* Blog Routes */}
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />

                {/* Catch-all for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;

