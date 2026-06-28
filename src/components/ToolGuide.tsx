import { toolGuides } from "@/data/tool-guides";
import { Lightbulb, AlertTriangle, BookOpen } from "lucide-react";

interface ToolGuideProps {
  id: string;
}

export function ToolGuide({ id }: ToolGuideProps) {
  const guide = toolGuides[id];
  if (!guide) return null;

  return (
    <article className="mt-16 border-t border-border pt-12 max-w-4xl mx-auto">
      {/* Headline */}
      <div className="flex items-start gap-3 mb-6">
        <BookOpen className="h-7 w-7 text-primary flex-shrink-0 mt-0.5" />
        <h2 className="text-3xl font-bold text-foreground leading-snug">
          {guide.headline}
        </h2>
      </div>

      {/* Intro paragraph */}
      <p className="text-lg text-muted-foreground leading-relaxed mb-10 border-l-4 border-primary/30 pl-5">
        {guide.intro}
      </p>

      {/* Content sections */}
      <div className="space-y-10">
        {guide.sections.map((section, i) => (
          <section key={i}>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {section.heading}
            </h3>
            <div className="space-y-4">
              {section.paragraphs.map((para, j) => (
                <p key={j} className="text-muted-foreground leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Pro Tips + Common Mistakes */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pro Tips */}
        <div className="rounded-xl border border-green-200 dark:border-green-900 bg-green-50/60 dark:bg-green-950/20 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h4 className="font-semibold text-green-800 dark:text-green-300 text-lg">
              Pro Tips
            </h4>
          </div>
          <ul className="space-y-3">
            {guide.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-green-900 dark:text-green-200 leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Common Mistakes */}
        <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50/60 dark:bg-red-950/20 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <h4 className="font-semibold text-red-800 dark:text-red-300 text-lg">
              Common Mistakes to Avoid
            </h4>
          </div>
          <ul className="space-y-3">
            {guide.mistakes.map((mistake, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-red-900 dark:text-red-200 leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                {mistake}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
