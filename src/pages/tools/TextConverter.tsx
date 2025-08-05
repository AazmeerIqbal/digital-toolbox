import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Type, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TextConverter() {
  const [inputText, setInputText] = useState("");
  const { toast } = useToast();

  const transformations = [
    { name: "UPPERCASE", fn: (text: string) => text.toUpperCase() },
    { name: "lowercase", fn: (text: string) => text.toLowerCase() },
    { name: "Title Case", fn: (text: string) => text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) },
    { name: "camelCase", fn: (text: string) => text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '') },
    { name: "snake_case", fn: (text: string) => text.toLowerCase().replace(/\s+/g, '_') },
    { name: "kebab-case", fn: (text: string) => text.toLowerCase().replace(/\s+/g, '-') },
    { name: "Sentence case", fn: (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() },
    { name: "aLtErNaTiNg CaSe", fn: (text: string) => text.split('').map((char, i) => i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()).join('') },
  ];

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} text copied to clipboard`,
    });
  };

  const getWordCount = (text: string) => text.trim() ? text.trim().split(/\s+/).length : 0;
  const getCharCount = (text: string) => text.length;
  const removeExtraSpaces = (text: string) => text.replace(/\s+/g, ' ').trim();

  return (
    <>
      <Helmet>
        <title>Text Case Converter - Free Online Text Tool</title>
        <meta name="description" content="Convert text to uppercase, lowercase, title case, camelCase, snake_case and more. Free online text converter with word count and character count." />
        <meta name="keywords" content="text converter, case converter, uppercase, lowercase, camelcase, snake case, text tools" />
      </Helmet>

      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">Text Case Converter</h1>
              <p className="text-xl text-muted-foreground">Transform your text into any case format</p>
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
                  <span>Characters (no spaces): {getCharCount(inputText.replace(/\s/g, ''))}</span>
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
                        <CardTitle className="text-lg">{transform.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted p-3 rounded-lg mb-3 min-h-[60px] font-mono text-sm">
                          {transform.fn(inputText)}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(transform.fn(inputText), transform.name)}
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
          </motion.div>
        </div>
      </div>
    </>
  );
}