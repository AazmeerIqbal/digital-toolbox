import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { Blog } from "@/data/blogs";

interface BlogCardProps {
  blog: Blog;
  index: number;
}

export const BlogCard = ({ blog, index }: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2, ease: [0.68, -0.55, 0.265, 1.55] }
      }}
      className="h-full"
    >
      <Link to={`/blog/${blog.slug}`} className="block h-full">
        <Card className="h-full bg-gradient-card border-border/50 shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between mb-2">
              <Badge variant="secondary" className="capitalize">
                {blog.category}
              </Badge>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{blog.readTime}</span>
              </div>
            </div>
            <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {blog.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-muted-foreground leading-relaxed line-clamp-3 mb-4">
              {blog.excerpt}
            </CardDescription>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <motion.div
                className="text-primary opacity-0 group-hover:opacity-100 transition-opacity font-medium"
                whileHover={{ x: 4 }}
              >
                Read more →
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

