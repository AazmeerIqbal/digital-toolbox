import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { HelpCircle, Star, Info, CheckCircle2 } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface ToolExplanationProps {
  title: string;
  description: string;
  howToUse: string[];
  features: string[];
  faqs: FAQItem[];
}

export function ToolExplanation({
  title,
  description,
  howToUse,
  features,
  faqs,
}: ToolExplanationProps) {
  return (
    <div className="mt-16 border-t border-border pt-12 max-w-4xl mx-auto space-y-12">
      {/* Overview */}
      <div className="space-y-4 text-center md:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2 justify-center md:justify-start">
          <Info className="h-6 w-6 text-primary" />
          About {title}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* How to Use & Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              How to Use
            </h3>
            <ol className="space-y-3 list-decimal pl-5 text-muted-foreground text-sm leading-relaxed">
              {howToUse.map((step, idx) => (
                <li key={idx} className="pl-1">
                  {step}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Key Features
            </h3>
            <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* FAQs */}
      {faqs && faqs.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="border-border">
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
