import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Construction } from "lucide-react";

export default function AgeCalculator() {
  return (
    <>
      <Helmet>
        <title>Age Calculator - Calculate Your Exact Age</title>
        <meta name="description" content="Calculate your exact age in years, months, days, hours and minutes. Find your zodiac sign and interesting birth date facts." />
        <meta name="keywords" content="age calculator, date calculator, zodiac sign, birth date, age in days, age in hours" />
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
              <h1 className="text-4xl font-bold text-foreground mb-4">Age Calculator</h1>
              <p className="text-xl text-muted-foreground">Calculate your exact age and discover interesting facts</p>
            </div>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Calendar className="h-8 w-8 text-primary" />
                  Precise Age Calculator
                </CardTitle>
                <CardDescription>
                  Get your exact age with zodiac sign and birth facts
                </CardDescription>
              </CardHeader>
              <CardContent className="py-16">
                <div className="space-y-6">
                  <Construction className="h-24 w-24 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      We're creating a comprehensive age calculator with detailed 
                      breakdowns and interesting astronomical facts.
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Features will include:</p>
                    <ul className="mt-2 space-y-1">
                      <li>• Exact age in various units</li>
                      <li>• Zodiac sign calculation</li>
                      <li>• Birth day of week</li>
                      <li>• Next birthday countdown</li>
                      <li>• Historical events on birth date</li>
                      <li>• Age comparison tools</li>
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