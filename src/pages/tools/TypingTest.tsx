import { ToolLayout } from "@/components/ToolLayout";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";
import { ToolExplanation } from "@/components/ToolExplanation";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Keyboard,
  RotateCcw,
  Trophy,
  Clock,
  Target,
  Zap,
  Hash,
  Quote,
  Type,
} from "lucide-react";
import { InContentAd } from "@/components/AdSense";

// ─── Word pools ───────────────────────────────────────────────────────────────

const COMMON_WORDS = [
  "the", "be", "of", "and", "a", "to", "in", "he", "have", "it", "that", "for",
  "they", "with", "as", "not", "on", "she", "at", "by", "this", "we", "you",
  "do", "but", "from", "or", "which", "one", "would", "all", "will", "there",
  "say", "who", "make", "when", "can", "more", "if", "no", "man", "out",
  "other", "so", "what", "time", "up", "go", "about", "than", "into", "could",
  "state", "only", "new", "year", "some", "take", "come", "these", "know",
  "see", "use", "get", "like", "then", "first", "any", "work", "now", "may",
  "such", "give", "over", "think", "most", "even", "find", "day", "also",
  "after", "way", "many", "must", "look", "before", "great", "back", "through",
  "long", "where", "much", "should", "well", "people", "down", "own", "just",
  "because", "good", "each", "those", "feel", "seem", "how", "high", "too",
  "place", "little", "world", "very", "still", "nation", "hand", "old", "life",
  "tell", "write", "become", "here", "show", "house", "both", "between",
  "need", "mean", "call", "develop", "under", "last", "right", "move", "thing",
  "general", "school", "never", "same", "another", "begin", "while", "number",
  "part", "turn", "real", "leave", "might", "want", "point", "form", "off",
  "child", "few", "small", "since", "against", "ask", "late", "home",
  "interest", "large", "person", "end", "open", "public", "follow", "during",
  "present", "without", "again", "hold", "govern", "around", "possible",
  "head", "consider", "word", "program", "problem", "however", "lead",
  "system", "set", "order", "eye", "plan", "run", "keep", "face", "fact",
  "group", "play", "stand", "increase", "early", "course", "change", "help",
  "line", "city", "put", "close", "case", "force", "meet", "once", "water",
  "upon", "war", "build", "hear", "light", "unite", "live", "every", "country",
  "bring", "center", "let", "side", "try", "provide", "continue", "name",
  "certain", "power", "pay", "result", "question", "study", "woman", "member",
];

const QUOTES = [
  "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is commonly used for typing practice.",
  "Technology has revolutionized the way we communicate, work, and live. From smartphones to artificial intelligence, innovation continues to shape our future.",
  "Programming is both an art and a science. It requires logical thinking, creativity, and attention to detail to create software that solves real-world problems.",
  "The beauty of nature never ceases to amaze us. From towering mountains to vast oceans, our planet offers countless wonders to explore and protect.",
  "Education is the foundation of progress. Through learning and knowledge sharing, we build a better society for current and future generations.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. Every setback is a setup for a comeback.",
  "In the middle of difficulty lies opportunity. The greatest glory in living lies not in never falling, but in rising every time we fall.",
];

const PUNCT_MARKS = [",", ".", "!", "?", ";", ":"];

// ─── Text generation ──────────────────────────────────────────────────────────

function generateWords(count: number, punctuation: boolean, numbers: boolean): string {
  const words: string[] = [];
  let capitalizeNext = true;
  for (let i = 0; i < count; i++) {
    let word = COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)];

    if (numbers && Math.random() < 0.12) {
      word = String(Math.floor(Math.random() * 9000) + 100);
    }

    if (punctuation) {
      if (capitalizeNext && /^[a-z]/.test(word)) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
        capitalizeNext = false;
      }
      if (Math.random() < 0.15) {
        const mark = PUNCT_MARKS[Math.floor(Math.random() * PUNCT_MARKS.length)];
        word += mark;
        if (mark === "." || mark === "!" || mark === "?") capitalizeNext = true;
      } else if (Math.random() < 0.04) {
        word = `"${word}"`;
      }
    }

    words.push(word);
  }
  return words.join(" ");
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = "time" | "words" | "quote";

interface TestResult {
  rawWpm: number;
  netWpm: number;
  accuracy: number;
  time: number;
  errors: number;
  totalCharacters: number;
  correctCharacters: number;
  consistency: number;
}

const TIME_OPTIONS = [15, 30, 60, 120];
const WORD_OPTIONS = [10, 25, 50, 100];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TypingTest() {
  const seoConfig = getSEOConfig("typing-test");

  // Settings
  const [mode, setMode] = useState<Mode>("time");
  const [duration, setDuration] = useState(30);
  const [wordCount, setWordCount] = useState(25);
  const [punctuation, setPunctuation] = useState(false);
  const [numbers, setNumbers] = useState(false);

  // Test state
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState<TestResult | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const textBoxRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const wpmSamples = useRef<number[]>([]);
  const finishedRef = useRef(false);

  // ─── Text generation per settings ──────────────────────────────────────────

  const makeText = useCallback(() => {
    if (mode === "quote") {
      return QUOTES[Math.floor(Math.random() * QUOTES.length)];
    }
    if (mode === "words") {
      return generateWords(wordCount, punctuation, numbers);
    }
    // time mode: generate plenty so the user can never run out (~250 wpm ceiling)
    const needed = Math.max(60, Math.ceil((duration / 60) * 250));
    return generateWords(needed, punctuation, numbers);
  }, [mode, wordCount, duration, punctuation, numbers]);

  // Regenerate text when settings change
  useEffect(() => {
    setText(makeText());
    setUserInput("");
    setStarted(false);
    setFinished(false);
    finishedRef.current = false;
    setStartTime(null);
    setElapsed(0);
    setResult(null);
    wpmSamples.current = [];
  }, [makeText]);

  // ─── Stats ─────────────────────────────────────────────────────────────────

  const errors = useMemo(() => {
    let e = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] !== text[i]) e++;
    }
    return e;
  }, [userInput, text]);

  const computeStats = useCallback((typed: string, errCount: number, secs: number) => {
    const total = typed.length;
    const correct = Math.max(total - errCount, 0);
    const minutes = Math.max(secs / 60, 1 / 60);
    return {
      rawWpm: Math.round(total / 5 / minutes),
      netWpm: Math.max(0, Math.round(correct / 5 / minutes)),
      accuracy: total > 0 ? Math.round((correct / total) * 100) : 100,
      total,
      correct,
    };
  }, []);

  // ─── Finish test ───────────────────────────────────────────────────────────

  const finishTest = useCallback((finalElapsed: number, typed: string, errCount: number) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFinished(true);
    setStarted(false);

    const { rawWpm, netWpm, accuracy, total, correct } = computeStats(typed, errCount, finalElapsed);

    // Consistency: 100 - coefficient of variation of WPM samples
    const samples = wpmSamples.current.filter((s) => s > 0);
    let consistency = 100;
    if (samples.length >= 3) {
      const mean = samples.reduce((a, b) => a + b, 0) / samples.length;
      const variance = samples.reduce((a, b) => a + (b - mean) ** 2, 0) / samples.length;
      const cv = mean > 0 ? Math.sqrt(variance) / mean : 0;
      consistency = Math.max(0, Math.round((1 - cv) * 100));
    }

    setResult({
      rawWpm,
      netWpm,
      accuracy,
      time: Math.round(finalElapsed * 10) / 10,
      errors: errCount,
      totalCharacters: total,
      correctCharacters: correct,
      consistency,
    });
  }, [computeStats]);

  // ─── Timer ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!started || finished || !startTime) return;
    const interval = setInterval(() => {
      const secs = (Date.now() - startTime) / 1000;
      setElapsed(secs);

      // Sample live WPM each tick for consistency metric
      const { netWpm } = computeStats(userInput, errors, secs);
      if (secs > 2) wpmSamples.current.push(netWpm);

      // Time-mode end condition
      if (mode === "time" && secs >= duration) {
        finishTest(duration, userInput, errors);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [started, finished, startTime, mode, duration, userInput, errors, computeStats, finishTest]);

  // ─── Input handling — auto-start on first keystroke ──────────────────────────

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (finished) return;
    const value = e.target.value.slice(0, text.length);

    // Auto-start the timer on the first character (monkeytype behavior)
    let st = startTime;
    if (!started && value.length > 0) {
      st = Date.now();
      setStarted(true);
      setStartTime(st);
    }

    setUserInput(value);

    // Completion end condition — typed the entire text (all modes).
    // THIS is the fix for "timer doesn't stop when I finish typing".
    if (value.length >= text.length && st) {
      let errCount = 0;
      for (let i = 0; i < value.length; i++) if (value[i] !== text[i]) errCount++;
      const secs = (Date.now() - st) / 1000;
      finishTest(mode === "time" ? Math.min(secs, duration) : secs, value, errCount);
    }
  };

  const restart = useCallback(() => {
    setText(makeText());
    setUserInput("");
    setStarted(false);
    setFinished(false);
    finishedRef.current = false;
    setStartTime(null);
    setElapsed(0);
    setResult(null);
    wpmSamples.current = [];
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [makeText]);

  // Tab+Enter / Esc restart shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        restart();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [restart]);

  // Keep caret visible — scroll text box as the user advances
  useEffect(() => {
    caretRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [userInput.length]);

  // ─── Live stats ────────────────────────────────────────────────────────────

  const liveStats = useMemo(() => {
    if (!started || !startTime) return { wpm: 0, accuracy: 100 };
    const secs = Math.max((Date.now() - startTime) / 1000, 0.5);
    const { netWpm, accuracy } = computeStats(userInput, errors, secs);
    return { wpm: netWpm, accuracy };
  }, [started, startTime, userInput, errors, elapsed, computeStats]);

  const timeLeft = mode === "time" ? Math.max(0, Math.ceil(duration - elapsed)) : null;
  const wordsTyped = userInput.length === 0 ? 0 : userInput.trimEnd().split(/\s+/).length;
  const totalWords = text.split(/\s+/).length;

  // ─── Render text with per-char coloring ───────────────────────────────────

  const renderedText = useMemo(() => {
    return text.split("").map((char, i) => {
      let cls = "";
      if (i < userInput.length) {
        cls = userInput[i] === char
          ? "text-green-600 dark:text-green-400"
          : "text-red-500 bg-red-500/10 rounded-sm";
      } else if (i === userInput.length) {
        return (
          <span key={i} ref={caretRef} className="relative text-foreground">
            <span className="absolute -left-px top-0 bottom-0 w-0.5 bg-primary animate-pulse" />
            {char}
          </span>
        );
      } else {
        cls = "text-muted-foreground/60";
      }
      return <span key={i} className={cls}>{char}</span>;
    });
  }, [text, userInput]);

  // ─── Option button helper ─────────────────────────────────────────────────

  const OptBtn = ({ active, onClick, children, disabled }: { active: boolean; onClick: () => void; children: React.ReactNode; disabled?: boolean }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors disabled:opacity-40 ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
    >
      {children}
    </button>
  );

  return (
    <>
      <SEOHead config={seoConfig} />
      <ToolLayout>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">Typing Speed Test</h1>
            <p className="text-lg text-muted-foreground">Test your WPM — start typing to begin, Esc to restart</p>
          </div>

          {/* ── Settings bar (monkeytype style) ── */}
          {!result && (
            <div className="flex flex-wrap items-center justify-center gap-1 mb-6 p-2 rounded-lg bg-muted/50 border">
              {/* Mode */}
              <OptBtn active={mode === "time"} onClick={() => setMode("time")} disabled={started}><Clock className="h-3 w-3 inline mr-1" />time</OptBtn>
              <OptBtn active={mode === "words"} onClick={() => setMode("words")} disabled={started}><Type className="h-3 w-3 inline mr-1" />words</OptBtn>
              <OptBtn active={mode === "quote"} onClick={() => setMode("quote")} disabled={started}><Quote className="h-3 w-3 inline mr-1" />quote</OptBtn>

              <span className="mx-2 text-border">|</span>

              {/* Duration / word count */}
              {mode === "time" && TIME_OPTIONS.map((t) => (
                <OptBtn key={t} active={duration === t} onClick={() => setDuration(t)} disabled={started}>{t}s</OptBtn>
              ))}
              {mode === "words" && WORD_OPTIONS.map((w) => (
                <OptBtn key={w} active={wordCount === w} onClick={() => setWordCount(w)} disabled={started}>{w}</OptBtn>
              ))}
              {mode === "quote" && <span className="text-xs text-muted-foreground px-2">random quote</span>}

              {mode !== "quote" && (
                <>
                  <span className="mx-2 text-border">|</span>
                  {/* Modifiers */}
                  <OptBtn active={punctuation} onClick={() => setPunctuation(!punctuation)} disabled={started}>@ punctuation</OptBtn>
                  <OptBtn active={numbers} onClick={() => setNumbers(!numbers)} disabled={started}><Hash className="h-3 w-3 inline mr-0.5" />numbers</OptBtn>
                </>
              )}
            </div>
          )}

          {/* ── Live stats ── */}
          {!result && (
            <div className="flex items-center justify-center gap-8 mb-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary tabular-nums">
                  {mode === "time" ? `${timeLeft}` : `${wordsTyped}/${totalWords}`}
                </div>
                <div className="text-xs text-muted-foreground">{mode === "time" ? "seconds" : "words"}</div>
              </div>
              <div>
                <div className="text-3xl font-bold tabular-nums">{liveStats.wpm}</div>
                <div className="text-xs text-muted-foreground">wpm</div>
              </div>
              <div>
                <div className="text-3xl font-bold tabular-nums">{liveStats.accuracy}%</div>
                <div className="text-xs text-muted-foreground">accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-500 tabular-nums">{errors}</div>
                <div className="text-xs text-muted-foreground">errors</div>
              </div>
            </div>
          )}

          {/* ── Test area ── */}
          {!result ? (
            <Card className="mb-6">
              <CardContent className="p-6">
                <div
                  ref={textBoxRef}
                  onClick={() => inputRef.current?.focus()}
                  className="text-xl leading-relaxed font-mono cursor-text select-none mb-4 max-h-40 overflow-hidden"
                >
                  {renderedText}
                </div>

                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={handleInput}
                  onPaste={(e) => e.preventDefault()}
                  placeholder={started ? "" : "Start typing to begin the test…"}
                  className="w-full p-3 border rounded-lg text-lg font-mono focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                  autoCorrect="off"
                  autoCapitalize="none"
                  autoComplete="off"
                  spellCheck={false}
                  autoFocus
                />

                <div className="flex justify-center mt-4">
                  <Button variant="ghost" size="sm" onClick={restart} className="text-muted-foreground gap-1.5">
                    <RotateCcw className="h-3.5 w-3.5" /> Restart (Esc)
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* ── Results ── */
            <Card className="mb-6">
              <CardContent className="p-8 text-center">
                <Trophy className="h-14 w-14 text-yellow-500 mx-auto mb-3" />
                <h2 className="text-2xl font-bold mb-6">Test Complete!</h2>

                <div className="flex items-center justify-center gap-10 mb-8">
                  <div>
                    <div className="text-6xl font-bold text-primary tabular-nums">{result.netWpm}</div>
                    <div className="text-sm text-muted-foreground mt-1">wpm</div>
                  </div>
                  <div>
                    <div className="text-6xl font-bold text-green-600 tabular-nums">{result.accuracy}%</div>
                    <div className="text-sm text-muted-foreground mt-1">accuracy</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-2xl mx-auto mb-8">
                  {[
                    { label: "raw wpm", value: result.rawWpm },
                    { label: "characters", value: `${result.correctCharacters}/${result.totalCharacters}` },
                    { label: "errors", value: result.errors, red: true },
                    { label: "consistency", value: `${result.consistency}%` },
                    { label: "time", value: `${result.time}s` },
                  ].map((s, i) => (
                    <div key={i} className="p-3 rounded-lg bg-muted/50">
                      <div className={`text-xl font-bold tabular-nums ${s.red ? "text-red-500" : ""}`}>{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>

                <Button onClick={restart} size="lg" className="gap-2">
                  <RotateCcw className="h-4 w-4" /> Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          <InContentAd />

          <ToolExplanation
            title="Typing Speed Test"
            description="Toolzaply's free typing test measures your speed in WPM (words per minute) and accuracy, monkeytype-style. Choose time mode (15–120 seconds), words mode (10–100 words), or quote mode, with optional punctuation and numbers. The timer starts automatically on your first keystroke and stops the moment you finish the text or time runs out. Results include net WPM, raw WPM, accuracy, error count, and a consistency score."
            howToUse={[
              "Pick a mode: time (test ends when the clock runs out), words (ends when you finish the word count), or quote (type a full quote).",
              "Optionally enable punctuation and numbers for a harder, more realistic test.",
              "Just start typing — the timer starts automatically on your first keystroke.",
              "The test ends automatically when time expires or you finish the text.",
              "Press Esc anytime to restart with fresh words.",
            ]}
            features={[
              "3 test modes: time (15/30/60/120s), words (10/25/50/100), and quote.",
              "Punctuation and numbers modifiers for realistic difficulty.",
              "Auto-start on first keystroke — no Start button needed.",
              "Test ends instantly when you complete the text (timer stops correctly).",
              "Live WPM, accuracy, and error count while typing.",
              "Consistency score measuring how steady your speed was.",
              "Random common-word streams — never the same test twice.",
              "Esc to instantly restart. Paste blocked for authentic results.",
            ]}
            faqs={[
              { question: "How is WPM calculated?", answer: "Net WPM = (correctly typed characters ÷ 5) ÷ minutes elapsed. The divisor 5 is the standard average word length. Raw WPM counts all keystrokes including errors." },
              { question: "What is the consistency score?", answer: "Consistency measures how steady your typing speed was throughout the test, computed from the variation in your WPM over time. 100% means perfectly steady pace; lower scores mean bursts and pauses." },
              { question: "What is a good typing speed?", answer: "The average is around 40 WPM. Professional typists reach 65–75 WPM, and top typists exceed 100 WPM. Accuracy above 95% matters more than raw speed when improving." },
            ]}
          />
        </motion.div>
      </ToolLayout>
    </>
  );
}
