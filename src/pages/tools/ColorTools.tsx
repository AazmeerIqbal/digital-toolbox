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
import { Input } from "@/components/ui/input";
import { Palette, Copy, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/ToolLayout";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";

export default function ColorTools() {
  const seoConfig = getSEOConfig("color-tools");
  const [selectedColor, setSelectedColor] = useState("#3b82f6");
  const [palette, setPalette] = useState<string[]>([]);
  const { toast } = useToast();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const generatePalette = () => {
    const baseHue = Math.floor(Math.random() * 360);
    const colors = [];

    for (let i = 0; i < 5; i++) {
      const hue = (baseHue + i * 72) % 360;
      const saturation = 70 + Math.floor(Math.random() * 30);
      const lightness = 45 + Math.floor(Math.random() * 20);

      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }

    setPalette(colors);
  };

  const copyToClipboard = (value: string, format: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${format} value copied to clipboard`,
    });
  };

  const rgb = hexToRgb(selectedColor);
  const hsl = hexToHsl(selectedColor);

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
                Color Tools Suite
              </h1>
              <p className="text-xl text-muted-foreground">
                Complete toolkit for working with colors
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Color Picker */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Color Picker
                  </CardTitle>
                  <CardDescription>
                    Pick a color and get its values in different formats
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-16 h-16 rounded-lg border border-border cursor-pointer"
                      />
                      <div
                        className="flex-1 h-16 rounded-lg border border-border"
                        style={{ backgroundColor: selectedColor }}
                      />
                    </div>

                    <Input
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      placeholder="#000000"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Color Formats */}
              <Card>
                <CardHeader>
                  <CardTitle>Color Formats</CardTitle>
                  <CardDescription>
                    Color values in different formats
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">HEX</div>
                        <div className="text-sm font-mono">{selectedColor}</div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(selectedColor, "HEX")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    {rgb && (
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <div className="font-medium">RGB</div>
                          <div className="text-sm font-mono">
                            rgb({rgb.r}, {rgb.g}, {rgb.b})
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            copyToClipboard(
                              `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                              "RGB"
                            )
                          }
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {hsl && (
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <div className="font-medium">HSL</div>
                          <div className="text-sm font-mono">
                            hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            copyToClipboard(
                              `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
                              "HSL"
                            )
                          }
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Palette Generator */}
            <Card>
              <CardHeader>
                <CardTitle>Palette Generator</CardTitle>
                <CardDescription>
                  Generate random color palettes for your projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button onClick={generatePalette} className="w-full">
                    <Shuffle className="mr-2 h-4 w-4" />
                    Generate Random Palette
                  </Button>

                  {palette.length > 0 && (
                    <div className="grid grid-cols-5 gap-2">
                      {palette.map((color, index) => (
                        <div
                          key={index}
                          className="h-20 rounded-lg border border-border cursor-pointer flex items-end justify-center pb-2"
                          style={{ backgroundColor: color }}
                          onClick={() => copyToClipboard(color, "Color")}
                        >
                          <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                            Click to copy
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </ToolLayout>
    </>
  );
}
