import { useState } from "react";
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
import { Copy, Type, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/ToolLayout";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";
import { ToolExplanation } from "@/components/ToolExplanation";

export default function TextConverter() {
  const seoConfig = getSEOConfig("text-converter");
  const [inputText, setInputText] = useState("");
  const { toast } = useToast();

  const transformations = [
    { name: "UPPERCASE", fn: (text: string) => text.toUpperCase() },
    { name: "lowercase", fn: (text: string) => text.toLowerCase() },
    {
      name: "Title Case",
      fn: (text: string) =>
        text.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
        ),
    },
    {
      name: "camelCase",
      fn: (text: string) =>
        text
          .trim()
          .split(/[\s\-_]+/)
          .filter(Boolean)
          .map((word, index) => {
            const lower = word.toLowerCase();
            return index === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
          })
          .join(""),
    },
    {
      name: "snake_case",
      fn: (text: string) =>
        text.trim().toLowerCase().replace(/[\s\-]+/g, "_").replace(/[^a-z0-9_]/g, ""),
    },
    {
      name: "kebab-case",
      fn: (text: string) =>
        text.trim().toLowerCase().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, ""),
    },
    {
      name: "Sentence case",
      fn: (text: string) =>
        text
          .toLowerCase()
          .replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase()),
    },
    {
      name: "aLtErNaTiNg CaSe",
      fn: (text: string) =>
        text
          .split("")
          .map((char, i) =>
            i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
          )
          .join(""),
    },
  ];

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} text copied to clipboard`,
    });
  };

  const getWordCount = (text: string) =>
    text.trim() ? text.trim().split(/\s+/).length : 0;
  const getCharCount = (text: string) => text.length;
  const removeExtraSpaces = (text: string) => text.replace(/\s+/g, " ").trim();

  return (
    <>
      <SEOHead config={seoConfig} />

      <ToolLayout>
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Text Case Converter
              </h1>
              <p className="text-xl text-muted-foreground">
                Transform your text into any case format
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Input Text
                </CardTitle>
                <CardDescription>
                  Enter or paste your text below to convert to different cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter your text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[120px] mb-4"
                />

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <span>Words: {getWordCount(inputText)}</span>
                  <span>Characters: {getCharCount(inputText)}</span>
                  <span>
                    Characters (no spaces):{" "}
                    {getCharCount(inputText.replace(/\s/g, ""))}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setInputText(removeExtraSpaces(inputText))}
                    disabled={!inputText}
                  >
                    Remove Extra Spaces
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setInputText("")}
                    disabled={!inputText}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {inputText && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {transformations.map((transform, index) => (
                  <motion.div
                    key={transform.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">
                          {transform.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted p-3 rounded-lg mb-3 min-h-[60px] font-mono text-sm">
                          {transform.fn(inputText)}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(
                              transform.fn(inputText),
                              transform.name
                            )
                          }
                          className="w-full"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            <ToolExplanation
              title="Text Case Converter"
              description="Toolzaply's free Text Case Converter is an instant text transformation tool that converts any input string into eight different case formats: UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, Sentence case, and aLtErNaTiNg CaSe. It also provides live word and character count statistics and includes a utility to strip extra whitespace from messy copied text. All transformations run entirely in your browser without submitting any data to a server."
              howToUse={[
                "Paste or type any text into the large input box at the top of the page.",
                "Observe the word count, character count, and character count without spaces update live.",
                "Scroll down to see all eight conversion output cards rendered instantly.",
                "Click the 'Copy' button on any card to copy that specific format to your clipboard.",
                "Use 'Remove Extra Spaces' to clean up messy pasted text, or 'Clear' to start fresh."
              ]}
              features={[
                "Eight case formats: UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, Sentence case, and aLtErNaTiNg CaSe.",
                "Live word and character count statistics including count without whitespace.",
                "Whitespace cleanup utility to normalize multi-space pasted text.",
                "Per-result clipboard copy button for instant use in your code or documents.",
                "Completely client-side processing with no data sent to any server."
              ]}
              faqs={[
                {
                  question: "What is the difference between camelCase and PascalCase?",
                  answer: "camelCase starts with a lowercase letter (e.g., myVariableName) and is used in JavaScript variables and function names. PascalCase (also called UpperCamelCase) starts with an uppercase letter (e.g., MyVariableName) and is used for class names and React components."
                },
                {
                  question: "What is kebab-case used for?",
                  answer: "kebab-case joins words with hyphens and uses all lowercase letters (e.g., my-css-class). It is the standard format for CSS class names, HTML attributes, and URL slugs."
                },
                {
                  question: "Is there a character limit on the input?",
                  answer: "No strict limit is enforced. However, for very large texts (e.g., tens of thousands of characters), browser rendering performance may affect the speed of live updates."
                }
              ]}
            />
          </motion.div>
        </div>
      </ToolLayout>
    </>
  );
}
