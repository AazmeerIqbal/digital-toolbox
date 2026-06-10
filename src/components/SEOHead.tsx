import { Helmet } from "react-helmet-async";
import { SEOConfig, siteConfig } from "@/lib/seo-config";

interface SEOHeadProps {
  config: SEOConfig;
  children?: React.ReactNode;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ config, children }) => {
  const image = config.ogImage || siteConfig.ogImage;
  const schemas = Array.isArray(config.structuredData)
    ? config.structuredData
    : config.structuredData
    ? [config.structuredData]
    : [];

  return (
    <Helmet>
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      <meta name="keywords" content={config.keywords.join(", ")} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content="Toolzaply" />

      {config.canonical && <link rel="canonical" href={config.canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={config.ogTitle || config.title} />
      <meta property="og:description" content={config.ogDescription || config.description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Toolzaply" />
      {config.canonical && <meta property="og:url" content={config.canonical} />}
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:width" content="1200" />}
      {image && <meta property="og:image:height" content="630" />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={config.ogTitle || config.title} />
      <meta name="twitter:description" content={config.ogDescription || config.description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Additional Meta Tags */}
      {config.additionalMeta?.map((meta, index) => (
        <meta key={index} name={meta.name} content={meta.content} />
      ))}

      {/* Structured Data — one <script> tag per schema object */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {children}
    </Helmet>
  );
};
