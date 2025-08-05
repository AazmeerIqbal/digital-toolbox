import { Helmet } from "react-helmet-async";
import { SEOConfig } from "@/lib/seo-config";

interface SEOHeadProps {
  config: SEOConfig;
  children?: React.ReactNode;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ config, children }) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      <meta name="keywords" content={config.keywords.join(", ")} />

      {/* Canonical URL */}
      {config.canonical && <link rel="canonical" href={config.canonical} />}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={config.ogTitle || config.title} />
      <meta
        property="og:description"
        content={config.ogDescription || config.description}
      />
      <meta property="og:type" content="website" />
      {config.canonical && (
        <meta property="og:url" content={config.canonical} />
      )}
      {config.ogImage && <meta property="og:image" content={config.ogImage} />}
      <meta property="og:site_name" content="Digital Toolbox" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={config.ogTitle || config.title} />
      <meta
        name="twitter:description"
        content={config.ogDescription || config.description}
      />
      {config.ogImage && <meta name="twitter:image" content={config.ogImage} />}

      {/* Additional Meta Tags */}
      {config.additionalMeta?.map((meta, index) => (
        <meta key={index} name={meta.name} content={meta.content} />
      ))}

      {/* Structured Data */}
      {config.structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(config.structuredData)}
        </script>
      )}

      {/* Additional Children */}
      {children}
    </Helmet>
  );
};
