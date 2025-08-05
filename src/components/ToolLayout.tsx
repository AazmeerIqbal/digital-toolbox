import { ReactNode } from "react";
import { Header } from "@/components/Header";

interface ToolLayoutProps {
  children: ReactNode;
}

export const ToolLayout = ({ children }: ToolLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      {children}
    </div>
  );
};
