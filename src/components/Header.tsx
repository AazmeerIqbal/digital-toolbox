import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Home, Sparkles, BookOpen, Info } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navLink = (path: string, label: string) =>
    location.pathname === path ? "text-primary" : "text-muted-foreground";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-foreground">Toolzaply</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${isHome ? "text-primary" : "text-muted-foreground"}`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <a
              href="/#featured"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Featured
            </a>
            <a
              href="/#tools"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              All Tools
            </a>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${navLink("/about", "")}`}
            >
              <Info className="h-4 w-4" />
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${navLink("/contact", "")}`}
            >
              Contact
            </Link>
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
