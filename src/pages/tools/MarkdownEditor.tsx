import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, Eye, Download, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/ToolLayout";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";
import { ToolExplanation } from "@/components/ToolExplanation";

export default function MarkdownEditor() {
  const seoConfig = getSEOConfig("markdown-editor");
  const [markdown, setMarkdown] = useState("");
  const [preview, setPreview] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Load saved content from localStorage
    const saved = localStorage.getItem("markdown-content");
    if (saved) {
      setMarkdown(saved);
    }
  }, []);

  useEffect(() => {
    // Simple markdown to HTML conversion
    const convertMarkdown = (text: string) => {
      return text
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
        .replace(/\*(.*)\*/gim, "<em>$1</em>")
        .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2">$1</a>')
        .replace(/\n/gim, "<br>");
    };

    setPreview(convertMarkdown(markdown));
  }, [markdown]);

  const saveToLocalStorage = () => {
    localStorage.setItem("markdown-content", markdown);
    toast({
      title: "Saved!",
      description: "Your markdown content has been saved locally",
    });
  };

  const downloadAsMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAsText = () => {
    const blob = new Blob([markdown], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEOHead config={seoConfig} />

      <ToolLayout>
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Markdown Notepad
              </h1>
              <p className="text-xl text-muted-foreground">
                Write and preview markdown with live rendering
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Editor */}
              <Card className="h-[600px]">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Edit3 className="h-5 w-5" />
                    Editor
                  </CardTitle>
                  <CardDescription>
                    Write your markdown content here
                  </CardDescription>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={saveToLocalStorage}>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={downloadAsMarkdown}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      .md
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={downloadAsText}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      .txt
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="h-full pb-6">
                  <Textarea
                    placeholder="# Welcome to Markdown Notepad

Write your markdown here...

## Features
- **Bold text**
- *Italic text*
- [Links](https://example.com)
- Headers"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    className="h-full resize-none font-mono text-sm"
                  />
                </CardContent>
              </Card>

              {/* Preview */}
              <Card className="h-[600px]">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Preview
                  </CardTitle>
                  <CardDescription>
                    Live preview of your markdown
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-full pb-6">
                  <div
                    className="h-full overflow-auto p-4 bg-muted/30 rounded-lg prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html:
                        preview ||
                        "<p class='text-muted-foreground'>Your preview will appear here...</p>",
                    }}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Markdown Reference */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Markdown Quick Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Headers</h4>
                    <code className="text-xs">
                      # H1
                      <br />
                      ## H2
                      <br />
                      ### H3
                    </code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Emphasis</h4>
                    <code className="text-xs">
                      **bold**
                      <br />
                      *italic*
                    </code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Links</h4>
                    <code className="text-xs">[text](url)</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ToolExplanation
              title="Markdown Notepad"
              description="Toolzaply's free online Markdown Notepad is a browser-based writing environment that renders Markdown syntax into live HTML preview in real time. It is ideal for developers writing documentation, technical bloggers drafting posts, and students taking structured notes. Your work is auto-saved to your local browser storage between sessions, so you never lose progress. There is no account, no cloud sync, and no data tracking — your drafts stay completely private on your device."
              howToUse={[
                "Start typing in the left-hand 'Editor' panel using standard Markdown syntax.",
                "Watch the right-hand 'Preview' panel render your formatted document live.",
                "Click 'Save' to persist your current content into your browser's local storage.",
                "Click '.md' to export a standard Markdown file, or '.txt' to save as plain text.",
                "Content is automatically reloaded from local storage when you revisit the page."
              ]}
              features={[
                "Live dual-pane rendering: editor on the left, real-time preview on the right.",
                "Supports headings (H1–H3), bold, italic, and hyperlinks out of the box.",
                "Persistent local browser storage so your drafts survive page refreshes.",
                "Export to .md or .txt format with a single click.",
                "No account required, no cloud upload, zero data collection."
              ]}
              faqs={[
                {
                  question: "Does the Markdown Notepad support tables and code blocks?",
                  answer: "The built-in renderer currently supports headings, bold, italic, links, and line breaks. For advanced Markdown features like tables and fenced code blocks, you can export the file and render it in a full Markdown engine like VS Code or GitHub."
                },
                {
                  question: "Will I lose my content if I close the browser tab?",
                  answer: "Not if you click 'Save' first. Your content is stored using the browser's localStorage API, which persists between sessions on the same device and browser."
                },
                {
                  question: "Can I import an existing .md file into the editor?",
                  answer: "Currently the editor accepts manual input or pasting. You can open your .md file in any text editor, copy its contents, and paste them directly into the Toolzaply Markdown Notepad."
                }
              ]}
            />
          </motion.div>
        </div>
      </ToolLayout>
    </>
  );
}
