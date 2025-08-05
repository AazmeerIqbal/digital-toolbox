import { ToolLayout } from "@/components/ToolLayout";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Ruler, Weight, Thermometer, Clock } from "lucide-react";

const conversions = {
  length: {
    icon: Ruler,
    units: {
      meter: { name: "Meter", factor: 1 },
      kilometer: { name: "Kilometer", factor: 1000 },
      centimeter: { name: "Centimeter", factor: 0.01 },
      millimeter: { name: "Millimeter", factor: 0.001 },
      inch: { name: "Inch", factor: 0.0254 },
      foot: { name: "Foot", factor: 0.3048 },
      yard: { name: "Yard", factor: 0.9144 },
      mile: { name: "Mile", factor: 1609.34 },
    }
  },
  weight: {
    icon: Weight,
    units: {
      kilogram: { name: "Kilogram", factor: 1 },
      gram: { name: "Gram", factor: 0.001 },
      pound: { name: "Pound", factor: 0.453592 },
      ounce: { name: "Ounce", factor: 0.0283495 },
      ton: { name: "Ton", factor: 1000 },
    }
  },
  temperature: {
    icon: Thermometer,
    units: {
      celsius: { name: "Celsius", factor: 1 },
      fahrenheit: { name: "Fahrenheit", factor: 1 },
      kelvin: { name: "Kelvin", factor: 1 },
    }
  }
};

export default function UnitConverter() {
  const seoConfig = getSEOConfig("unitconverter");
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");

  const convert = () => {
    if (!inputValue || !fromUnit || !toUnit) return;
    
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;

    if (category === "temperature") {
      // Special handling for temperature conversions
      let convertedValue = 0;
      
      // Convert to Celsius first
      let celsius = value;
      if (fromUnit === "fahrenheit") {
        celsius = (value - 32) * 5/9;
      } else if (fromUnit === "kelvin") {
        celsius = value - 273.15;
      }
      
      // Convert from Celsius to target
      if (toUnit === "celsius") {
        convertedValue = celsius;
      } else if (toUnit === "fahrenheit") {
        convertedValue = celsius * 9/5 + 32;
      } else if (toUnit === "kelvin") {
        convertedValue = celsius + 273.15;
      }
      
      setResult(convertedValue.toFixed(4));
    } else {
      // Regular unit conversions
      const fromFactor = conversions[category as keyof typeof conversions].units[fromUnit]?.factor || 1;
      const toFactor = conversions[category as keyof typeof conversions].units[toUnit]?.factor || 1;
      
      const baseValue = value * fromFactor;
      const convertedValue = baseValue / toFactor;
      
      setResult(convertedValue.toFixed(6));
    }
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
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">Unit Converter</h1>
              <p className="text-xl text-muted-foreground">Convert between different units of measurement</p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Select Category
                </CardTitle>
                <CardDescription>
                  Choose the type of measurement you want to convert
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(conversions).map(([key, { icon: Icon }]) => (
                    <Card 
                      key={key}
                      className={`cursor-pointer transition-all duration-200 ${
                        category === key 
                          ? 'border-primary bg-primary/5 shadow-md' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => {
                        setCategory(key);
                        setFromUnit("");
                        setToUnit("");
                        setResult("");
                      }}
                    >
                      <CardContent className="p-4 text-center">
                        <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <h3 className="font-semibold capitalize">{key}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {category && (
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{category} Converter</CardTitle>
                  <CardDescription>
                    Enter a value and select units to convert
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Value</label>
                      <Input
                        type="number"
                        placeholder="Enter value"
                        value={inputValue}
                        onChange={(e) => {
                          setInputValue(e.target.value);
                          setTimeout(convert, 100);
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">From</label>
                      <Select value={fromUnit} onValueChange={(value) => {
                        setFromUnit(value);
                        setTimeout(convert, 100);
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(conversions[category as keyof typeof conversions].units).map(([key, unit]) => (
                            <SelectItem key={key} value={key}>
                              {unit.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">To</label>
                      <Select value={toUnit} onValueChange={(value) => {
                        setToUnit(value);
                        setTimeout(convert, 100);
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(conversions[category as keyof typeof conversions].units).map(([key, unit]) => (
                            <SelectItem key={key} value={key}>
                              {unit.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Result</label>
                      <Input
                        type="text"
                        value={result}
                        readOnly
                        placeholder="Result"
                        className="font-mono bg-muted"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
                </div>
      </ToolLayout>
    </>
  );
}