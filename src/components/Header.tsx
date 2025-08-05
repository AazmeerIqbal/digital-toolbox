import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Home, Sparkles } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-foreground">
                Digital Toolbox
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isHome ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Home className="h-4 w-4 mr-1 inline" />
              Home
            </Link>
            <a
              href="#featured"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Featured Tools
            </a>
            <a
              href="#tools"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              All Tools
            </a>
          </nav>

          {/* Theme Toggle */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
