import { useState, useMemo } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InContentAd } from "@/components/AdSense";

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
      description: `${format} copied to clipboard`,
    });
  };

  const rgb = hexToRgb(selectedColor);
  const hsl = hexToHsl(selectedColor);

  // Gradient gallery data and helpers
  type Gradient = {
    name: string;
    colors: string[]; // hex stops
    direction:
      | "to-r"
      | "to-l"
      | "to-b"
      | "to-t"
      | "to-tr"
      | "to-tl"
      | "to-br"
      | "to-bl";
    category: string;
  };

  const gradients: Gradient[] = useMemo(
    () => [
      {
        name: "Sunset",
        colors: ["#ef4444", "#f59e0b"],
        direction: "to-r",
        category: "Warm",
      },
      {
        name: "Ocean",
        colors: ["#0ea5e9", "#7c3aed"],
        direction: "to-r",
        category: "Cool",
      },
      {
        name: "Dusk",
        colors: ["#8b5cf6", "#ec4899"],
        direction: "to-r",
        category: "Purple",
      },
      {
        name: "Sunrise",
        colors: ["#ec4899", "#ef4444", "#f97316"],
        direction: "to-r",
        category: "Warm",
      },
      {
        name: "Cool Water",
        colors: ["#06b6d4", "#60a5fa", "#93c5fd"],
        direction: "to-r",
        category: "Cool",
      },
      {
        name: "Warm Sand",
        colors: ["#f59e0b", "#ef4444"],
        direction: "to-r",
        category: "Earth",
      },
      {
        name: "Tropical Rainforest",
        colors: ["#10b981", "#14b8a6"],
        direction: "to-r",
        category: "Nature",
      },
      {
        name: "Desert",
        colors: ["#f59e0b", "#ef4444"],
        direction: "to-r",
        category: "Earth",
      },
      {
        name: "Iceberg",
        colors: ["#3b82f6", "#14b8a6"],
        direction: "to-r",
        category: "Cool",
      },
      {
        name: "Aurora",
        colors: ["#22c55e", "#10b981", "#06b6d4"],
        direction: "to-tr",
        category: "Nature",
      },
      {
        name: "Lavender",
        colors: ["#a78bfa", "#f0abfc"],
        direction: "to-r",
        category: "Pastel",
      },
      {
        name: "Peach",
        colors: ["#fb923c", "#fda4af"],
        direction: "to-r",
        category: "Pastel",
      },
      {
        name: "Berry",
        colors: ["#ec4899", "#8b5cf6"],
        direction: "to-tr",
        category: "Purple",
      },
      {
        name: "Forest",
        colors: ["#14532d", "#16a34a"],
        direction: "to-r",
        category: "Nature",
      },
      {
        name: "Sky",
        colors: ["#38bdf8", "#818cf8"],
        direction: "to-r",
        category: "Cool",
      },
      {
        name: "Neon",
        colors: ["#22d3ee", "#a3e635", "#fb7185"],
        direction: "to-r",
        category: "Neon",
      },
      {
        name: "Fire",
        colors: ["#ef4444", "#f97316", "#f59e0b"],
        direction: "to-r",
        category: "Warm",
      },
      {
        name: "Mint",
        colors: ["#99f6e4", "#34d399"],
        direction: "to-r",
        category: "Pastel",
      },
    ],
    []
  );

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(gradients.map((g) => g.category)))],
    [gradients]
  );
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const directionToCss: Record<Gradient["direction"], string> = {
    "to-r": "to right",
    "to-l": "to left",
    "to-b": "to bottom",
    "to-t": "to top",
    "to-tr": "to top right",
    "to-tl": "to top left",
    "to-br": "to bottom right",
    "to-bl": "to bottom left",
  };

  const directionToTw: Record<Gradient["direction"], string> = {
    "to-r": "bg-gradient-to-r",
    "to-l": "bg-gradient-to-l",
    "to-b": "bg-gradient-to-b",
    "to-t": "bg-gradient-to-t",
    "to-tr": "bg-gradient-to-tr",
    "to-tl": "bg-gradient-to-tl",
    "to-br": "bg-gradient-to-br",
    "to-bl": "bg-gradient-to-bl",
  };

  const asCssGradient = (g: Gradient) =>
    `linear-gradient(${directionToCss[g.direction]}, ${g.colors.join(", ")})`;
  const asTailwindUtilities = (g: Gradient) => {
    const stops = [
      `from-[${g.colors[0]}]`,
      ...(g.colors.length === 3 ? [`via-[${g.colors[1]}]`] : []),
      `to-[${g.colors[g.colors.length - 1]}]`,
    ];
    return `${directionToTw[g.direction]} ${stops.join(" ")}`;
  };
  const asTailwindArbitrary = (g: Gradient) => {
    const css = asCssGradient(g).replace(/ /g, "_").replace(/,/g, ",_");
    return `bg-[${css}]`;
  };

  const visibleGradients = useMemo(
    () =>
      gradients.filter(
        (g) => activeCategory === "All" || g.category === activeCategory
      ),
    [gradients, activeCategory]
  );

  return (
    <>
      <SEOHead config={seoConfig} />

      <ToolLayout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Color Tools Suite
            </h1>
            <p className="text-lg text-muted-foreground">
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
                      onClick={() =>
                        copyToClipboard(selectedColor, "HEX value")
                      }
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
                            "RGB value"
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
                            "HSL value"
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

          {/* In-Content Ad */}
          <InContentAd />

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
                        onClick={() => copyToClipboard(color, "Color value")}
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

          {/* Gradient Gallery */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Gradient Gallery</CardTitle>
              <CardDescription>
                Beautiful, widely used gradients. Filter by category and copy in
                CSS or Tailwind.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <TabsTrigger key={c} value={c} className="capitalize">
                      {c}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {categories.map((c) => (
                  <TabsContent key={c} value={c} className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {visibleGradients.map((g) => (
                        <div
                          key={`${c}-${g.name}`}
                          className="rounded-xl overflow-hidden border"
                        >
                          <div
                            className="h-28"
                            style={{
                              backgroundImage: asCssGradient(g),
                            }}
                          />
                          <div className="px-4 py-3 bg-muted/60 backdrop-blur flex items-center justify-between">
                            <div className="font-medium">{g.name}</div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  copyToClipboard(
                                    asCssGradient(g),
                                    `${g.name} (CSS gradient)`
                                  )
                                }
                              >
                                CSS
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  copyToClipboard(
                                    asTailwindUtilities(g),
                                    `${g.name} (Tailwind gradient)`
                                  )
                                }
                              >
                                TW
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </ToolLayout>
    </>
  );
}
