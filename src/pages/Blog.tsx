import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, BookOpen, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { blogs } from "@/data/blogs";

const categoryColors: Record<string, string> = {
  Productivity: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Tutorials: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "Web Development": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  Privacy: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  Career: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  Technology: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  Education: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "Software Engineering": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
};

const seoConfig = {
  title: "Blog & Guides — Toolzaply | Productivity, Web Development & Tech Tips",
  description:
    "Read practical guides, tutorials, and tips on productivity, PDF management, image optimization, color theory, QR codes, and more. Free knowledge from the Toolzaply team.",
  keywords: [
    "productivity tips",
    "pdf management guide",
    "image optimization tutorial",
    "color theory web design",
    "qr code guide",
    "unit conversion guide",
    "typing speed tips",
    "fake data testing",
    "markdown guide",
    "pomodoro technique",
    "free online tools blog",
    "web development tutorials",
  ],
  canonical: "https://toolzaply.com/blog",
  ogTitle: "Toolzaply Blog — Guides, Tips & Tutorials",
  ogDescription:
    "Practical guides on productivity, PDF tools, image optimization, web development, and more. Written by the Toolzaply team.",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Toolzaply Blog",
    url: "https://toolzaply.com/blog",
    description:
      "Practical guides on productivity, web development, and digital tools.",
    publisher: {
      "@type": "Organization",
      name: "Toolzaply",
      url: "https://toolzaply.com",
    },
    blogPost: blogs.map((b) => ({
      "@type": "BlogPosting",
      headline: b.title,
      description: b.description,
      url: `https://toolzaply.com/blog/${b.slug}`,
      datePublished: b.date,
      author: { "@type": "Organization", name: b.author },
    })),
  },
};

export default function Blog() {
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featured = sortedBlogs[0];
  const rest = sortedBlogs.slice(1);

  return (
    <>
      <SEOHead config={seoConfig} />
      <div className="min-h-screen bg-gradient-subtle flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Blog & Guides
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Practical tutorials, tips, and deep dives on productivity, web
              development, PDF management, image optimization, and more.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {blogs.length} articles · Free to read · No account required
            </p>
          </motion.div>

          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <Link to={`/blog/${featured.slug}`} className="group block">
              <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg overflow-hidden">
                <CardContent className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                      Latest Article
                    </span>
                    <Badge
                      className={`text-xs ${categoryColors[featured.category] ?? "bg-muted text-muted-foreground"}`}
                    >
                      {featured.category}
                    </Badge>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed line-clamp-3">
                    {featured.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {new Date(featured.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {featured.readTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="h-4 w-4" />
                      {featured.author}
                    </span>
                    <span className="ml-auto flex items-center gap-1.5 text-primary font-medium group-hover:gap-2.5 transition-all">
                      Read article <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* All Articles Grid */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              All Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/blog/${blog.slug}`} className="group block h-full">
                    <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
                      <CardHeader className="pb-3">
                        <Badge
                          className={`w-fit text-xs mb-2 ${categoryColors[blog.category] ?? "bg-muted text-muted-foreground"}`}
                        >
                          {blog.category}
                        </Badge>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          {blog.title}
                        </h3>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                          {blog.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(blog.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {blog.readTime}
                          </span>
                        </div>
                        <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                          Read more <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
