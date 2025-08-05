import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Keyboard, Construction } from "lucide-react";

export default function TypingTest() {
  return (
    <>
      <Helmet>
        <title>Typing Speed Test - Free Online WPM Test</title>
        <meta name="description" content="Test your typing speed and accuracy with our free online typing test. Get detailed statistics including WPM, accuracy, and performance analytics." />
        <meta name="keywords" content="typing test, typing speed, wpm test, words per minute, typing accuracy, keyboard test" />
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
              <h1 className="text-4xl font-bold text-foreground mb-4">Typing Speed Test</h1>
              <p className="text-xl text-muted-foreground">Test your typing speed and accuracy</p>
            </div>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Keyboard className="h-8 w-8 text-primary" />
                  Professional Typing Test
                </CardTitle>
                <CardDescription>
                  Measure your words per minute (WPM) and accuracy
                </CardDescription>
              </CardHeader>
              <CardContent className="py-16">
                <div className="space-y-6">
                  <Construction className="h-24 w-24 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      We're building a comprehensive typing test with real-time 
                      feedback and detailed performance analytics.
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Features will include:</p>
                    <ul className="mt-2 space-y-1">
                      <li>• Real-time WPM calculation</li>
                      <li>• Accuracy measurement</li>
                      <li>• Multiple text samples</li>
                      <li>• Performance history</li>
                      <li>• Mistake highlighting</li>
                      <li>• Shareable results</li>
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