import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Construction } from "lucide-react";

export default function FakeDataGenerator() {
  return (
    <>
      <Helmet>
        <title>Fake Data Generator - Free Online Test Data Creator</title>
        <meta name="description" content="Generate fake data including names, emails, addresses, phone numbers and JSON objects for testing and development." />
        <meta name="keywords" content="fake data generator, test data, dummy data, lorem ipsum, random data, json generator" />
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
              <h1 className="text-4xl font-bold text-foreground mb-4">Fake Data Generator</h1>
              <p className="text-xl text-muted-foreground">Generate test data for development and testing</p>
            </div>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Database className="h-8 w-8 text-primary" />
                  Test Data Generator
                </CardTitle>
                <CardDescription>
                  Generate realistic fake data for your applications
                </CardDescription>
              </CardHeader>
              <CardContent className="py-16">
                <div className="space-y-6">
                  <Construction className="h-24 w-24 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      We're building a comprehensive fake data generator with support for 
                      various data types and export formats.
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Features will include:</p>
                    <ul className="mt-2 space-y-1">
                      <li>• Names and addresses</li>
                      <li>• Email addresses and phone numbers</li>
                      <li>• Lorem ipsum text</li>
                      <li>• JSON object generation</li>
                      <li>• Custom data schemas</li>
                      <li>• Bulk data export</li>
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