import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of tool files to update
const toolFiles = [
  "ColorTools.tsx",
  "TimerTools.tsx",
  "AgeCalculator.tsx",
  "UnitConverter.tsx",
  "TypingTest.tsx",
  "ResumeBuilder.tsx",
  "MarkdownEditor.tsx",
  "FakeDataGenerator.tsx",
  "ImageCompressor.tsx",
];

const toolsDir = path.join(__dirname, "../src/pages/tools");

toolFiles.forEach((fileName) => {
  const filePath = path.join(toolsDir, fileName);

  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, "utf8");

    // Get tool ID from filename
    const toolId = fileName
      .replace(".tsx", "")
      .toLowerCase()
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .replace(/^-/, "");

    // Replace Helmet import
    content = content.replace(
      /import \{ Helmet \} from "react-helmet-async";\s*/,
      ""
    );

    // Add SEO imports
    if (!content.includes("SEOHead")) {
      content = content.replace(
        /import \{ ToolLayout \} from "@\/components\/ToolLayout";/,
        `import { ToolLayout } from "@/components/ToolLayout";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";`
      );
    }

    // Add SEO config to component
    const componentMatch = content.match(/export default function (\w+)/);
    if (componentMatch) {
      const componentName = componentMatch[1];
      const configLine = `  const seoConfig = getSEOConfig("${toolId}");`;

      // Find the first line after the function declaration
      const functionStart = content.indexOf(
        `export default function ${componentName}`
      );
      const firstBrace = content.indexOf("{", functionStart);
      const nextLine = content.indexOf("\n", firstBrace) + 1;

      content =
        content.slice(0, nextLine) +
        configLine +
        "\n" +
        content.slice(nextLine);
    }

    // Replace Helmet usage with SEOHead
    content = content.replace(
      /<Helmet>[\s\S]*?<\/Helmet>/,
      "<SEOHead config={seoConfig} />"
    );

    // Write back to file
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${fileName}`);
  } else {
    console.log(`❌ File not found: ${fileName}`);
  }
});

console.log("\n🎉 SEO update completed!");
