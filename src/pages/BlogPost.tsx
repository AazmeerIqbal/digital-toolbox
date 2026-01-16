import { useParams, useNavigate } from "react-router-dom";
import { getBlogBySlug } from "@/data/blogs";
import { SEOHead } from "@/components/SEOHead";
import { Header } from "@/components/Header";
import { getSEOConfig } from "@/lib/seo-config";
import { Calendar, Clock, User } from "lucide-react";
import NotFound from "./NotFound";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const blog = slug ? getBlogBySlug(slug) : undefined;

  if (!blog) {
    return <NotFound />;
  }

  const seoConfig = getSEOConfig(`blog-${blog.slug}`);

  return (
    <>
      <SEOHead config={seoConfig} />
      <div className="min-h-screen bg-gradient-subtle">
        <Header />
        
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Blog Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {blog.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{blog.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{blog.author}</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              {blog.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {blog.description}
            </p>
          </motion.div>

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg prose-slate dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:text-muted-foreground prose-ol:text-muted-foreground
              prose-li:text-muted-foreground
              prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-muted prose-pre:border prose-pre:border-border
              prose-blockquote:border-l-primary prose-blockquote:border-l-4
              prose-blockquote:pl-4 prose-blockquote:italic
              prose-img:rounded-lg prose-img:shadow-md
              prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
              prose-h4:text-xl prose-h4:mt-4 prose-h4:mb-2"
          >
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </motion.div>

          {/* Back to Blogs Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <button
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  const element = document.getElementById("blogs");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100);
              }}
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium cursor-pointer"
            >
              ← Back to all blogs
            </button>
          </motion.div>
        </article>
      </div>
    </>
  );
};

export default BlogPost;

