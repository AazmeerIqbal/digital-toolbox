import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tool } from "@/data/tools";

interface ToolCardProps {
  tool: Tool;
  index: number;
}

export const ToolCard = ({ tool, index }: ToolCardProps) => {
  const Icon = tool.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
      <Link to={tool.route} className="block h-full">
        <Card className="h-full bg-gradient-card border-border/50 shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-xl bg-gradient-primary shadow-glow group-hover:scale-110 transition-transform duration-300">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              {tool.featured && (
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                  Featured
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {tool.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-muted-foreground leading-relaxed">
              {tool.description}
            </CardDescription>
            <div className="mt-4 flex justify-between items-center">
              <Badge variant="outline" className="capitalize text-xs">
                {tool.category}
              </Badge>
              <motion.div
                className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ x: 4 }}
              >
                →
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};