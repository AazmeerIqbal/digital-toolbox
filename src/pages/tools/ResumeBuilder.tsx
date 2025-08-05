import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUser, Construction } from "lucide-react";

export default function ResumeBuilder() {
  return (
    <>
      <Helmet>
        <title>Resume Builder - Free Online Resume Creator</title>
        <meta name="description" content="Create professional resumes with customizable templates. Free online resume builder with PDF export functionality." />
        <meta name="keywords" content="resume builder, cv creator, resume template, job application, professional resume" />
      </Helmet>

      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">Resume Builder</h1>
              <p className="text-xl text-muted-foreground">Create professional resumes with ease</p>
            </div>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <FileUser className="h-8 w-8 text-primary" />
                  Professional Resume Builder
                </CardTitle>
                <CardDescription>
                  Create stunning resumes with customizable templates and PDF export
                </CardDescription>
              </CardHeader>
              <CardContent className="py-16">
                <div className="space-y-6">
                  <Construction className="h-24 w-24 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      We're building an amazing resume builder with professional templates, 
                      real-time preview, and PDF export functionality.
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Features will include:</p>
                    <ul className="mt-2 space-y-1">
                      <li>• Multiple professional templates</li>
                      <li>• Real-time preview</li>
                      <li>• PDF export</li>
                      <li>• ATS-friendly formats</li>
                      <li>• Custom sections</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}