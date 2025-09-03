import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { SidebarAd } from "@/components/AdSense";

interface ToolLayoutProps {
  children: ReactNode;
}

export const ToolLayout = ({ children }: ToolLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">{children}</div>

          {/* Sidebar with Ad */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <SidebarAd />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
