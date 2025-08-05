import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Tool imports
import ImageToPdf from "./pages/tools/ImageToPdf";
import PdfTools from "./pages/tools/PdfTools";
import TextConverter from "./pages/tools/TextConverter";
import UnitConverter from "./pages/tools/UnitConverter";
import QrTools from "./pages/tools/QrTools";
import MarkdownEditor from "./pages/tools/MarkdownEditor";
import ColorTools from "./pages/tools/ColorTools";
import TimerTools from "./pages/tools/TimerTools";
import ResumeBuilder from "./pages/tools/ResumeBuilder";
import FakeDataGenerator from "./pages/tools/FakeDataGenerator";
import ImageCompressor from "./pages/tools/ImageCompressor";
import AgeCalculator from "./pages/tools/AgeCalculator";
import TypingTest from "./pages/tools/TypingTest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="tools-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />

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

              {/* Catch-all for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
