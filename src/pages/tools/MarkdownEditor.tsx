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
    const convertMarkdown = (text: string) => {
      const lines = text.split("\n");
      const html: string[] = [];
      let inUl = false;
      let inOl = false;

      const closeList = () => {
        if (inUl) { html.push("</ul>"); inUl = false; }
        if (inOl) { html.push("</ol>"); inOl = false; }
      };

      const processInline = (line: string) =>
        line
          // Code spans (before bold/italic to avoid interfering)
          .replace(/`([^`]+)`/g, "<code>$1</code>")
          // Bold (non-greedy, same line only)
          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
          // Italic (non-greedy, same line only, not adjacent to *)
          .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
          // Links
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

      for (const rawLine of lines) {
        // Fenced code block — simple single-line code (full fenced blocks need more state)
        if (/^```/.test(rawLine)) {
          closeList();
          html.push(rawLine.startsWith("```") && rawLine.length > 3
            ? `<pre><code>${rawLine.slice(3)}</code></pre>`
            : "<hr>");
          continue;
        }
        // Headings
        if (/^### /.test(rawLine)) { closeList(); html.push(`<h3>${processInline(rawLine.slice(4))}</h3>`); continue; }
        if (/^## /.test(rawLine))  { closeList(); html.push(`<h2>${processInline(rawLine.slice(3))}</h2>`); continue; }
        if (/^# /.test(rawLine))   { closeList(); html.push(`<h1>${processInline(rawLine.slice(2))}</h1>`); continue; }
        // Blockquote
        if (/^> /.test(rawLine)) { closeList(); html.push(`<blockquote>${processInline(rawLine.slice(2))}</blockquote>`); continue; }
        // Horizontal rule
        if (/^---+$/.test(rawLine.trim())) { closeList(); html.push("<hr>"); continue; }
        // Unordered list
        if (/^[-*] /.test(rawLine)) {
          if (inOl) { html.push("</ol>"); inOl = false; }
          if (!inUl) { html.push("<ul>"); inUl = true; }
          html.push(`<li>${processInline(rawLine.slice(2))}</li>`);
          continue;
        }
        // Ordered list
        if (/^\d+\. /.test(rawLine)) {
          if (inUl) { html.push("</ul>"); inUl = false; }
          if (!inOl) { html.push("<ol>"); inOl = true; }
          html.push(`<li>${processInline(rawLine.replace(/^\d+\. /, ""))}</li>`);
          continue;
        }
        // Empty line
        if (rawLine.trim() === "") {
          closeList();
          html.push("<br>");
          continue;
        }
        // Paragraph
        closeList();
        html.push(`<p>${processInline(rawLine)}</p>`);
      }

      closeList();
      return html.join("\n");
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
                      # H1<br />## H2<br />### H3
                    </code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Emphasis</h4>
                    <code className="text-xs">
                      **bold**<br />*italic*<br />`inline code`
                    </code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Links</h4>
                    <code className="text-xs">[text](url)</code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Lists</h4>
                    <code className="text-xs">
                      - item (unordered)<br />1. item (ordered)
                    </code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Blockquote</h4>
                    <code className="text-xs">{"> quoted text"}</code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Divider</h4>
                    <code className="text-xs">---</code>
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
