import { ToolLayout } from "@/components/ToolLayout";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Keyboard,
  RotateCcw,
  Trophy,
  Clock,
  Target,
  Zap,
  Shuffle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TestResult {
  rawWpm: number;
  netWpm: number;
  accuracy: number;
  time: number; // seconds
  errors: number;
  totalCharacters: number;
  correctCharacters: number;
}

export default function TypingTest() {
  const seoConfig = getSEOConfig("typingtest");
  const [isActive, setIsActive] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0); // seconds, fractional
  const [errors, setErrors] = useState(0);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [testDuration, setTestDuration] = useState<number>(60);

  const inputRef = useRef<HTMLInputElement>(null);
  const userInputRef = useRef<string>("");
  const errorsRef = useRef<number>(0);

  const sampleTexts = useMemo(
    () => [
      "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is commonly used for typing practice.",
      "Technology has revolutionized the way we communicate, work, and live. From smartphones to artificial intelligence, innovation continues to shape our future.",
      "Programming is both an art and a science. It requires logical thinking, creativity, and attention to detail to create software that solves real-world problems.",
      "The beauty of nature never ceases to amaze us. From towering mountains to vast oceans, our planet offers countless wonders to explore and protect.",
      "Education is the foundation of progress. Through learning and knowledge sharing, we build a better society for current and future generations.",
    ],
    []
  );

  const [currentText, setCurrentText] = useState(
    sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
  );

  useEffect(() => {
    userInputRef.current = userInput;
  }, [userInput]);

  useEffect(() => {
    errorsRef.current = errors;
  }, [errors]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isActive && startTime) {
      interval = setInterval(() => {
        const elapsedSec = (Date.now() - startTime) / 1000;
        setTimeElapsed(elapsedSec);
        if (elapsedSec >= testDuration) {
          finalizeTest(elapsedSec);
        }
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, startTime, testDuration]);

  const computeStats = (
    typed: string,
    errorCount: number,
    elapsedSeconds: number
  ) => {
    const totalCharacters = typed.length;
    const correctCharacters = Math.max(totalCharacters - errorCount, 0);
    const minutes = Math.max(elapsedSeconds / 60, 1 / 60); // avoid div by zero
    const rawWpm = totalCharacters > 0 ? totalCharacters / 5 / minutes : 0;
    const accuracy =
      totalCharacters > 0 ? correctCharacters / totalCharacters : 1;
    const netWpm = totalCharacters > 0 ? correctCharacters / 5 / minutes : 0;
    return {
      rawWpm,
      netWpm,
      accuracyPercent: Math.round(accuracy * 100),
      accuracyRatio: accuracy,
      totalCharacters,
      correctCharacters,
    };
  };

  const startTest = () => {
    const newText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setCurrentText(newText);
    setIsActive(true);
    const now = Date.now();
    setStartTime(now);
    setUserInput("");
    setErrors(0);
    setTimeElapsed(0);
    setTestResult(null);
    inputRef.current?.focus();
  };

  const finalizeTest = (elapsedSeconds?: number) => {
    if (!startTime) return;
    const elapsed = Math.min(
      elapsedSeconds ?? (Date.now() - startTime) / 1000,
      testDuration
    );
    setIsActive(false);

    const typed = userInputRef.current;
    const err = errorsRef.current;

    const {
      rawWpm,
      netWpm,
      accuracyPercent,
      totalCharacters,
      correctCharacters,
    } = computeStats(typed, err, elapsed);

    setTimeElapsed(elapsed);
    setTestResult({
      rawWpm: Math.round(rawWpm),
      netWpm: Math.round(netWpm),
      accuracy: Math.round(accuracyPercent),
      time: Math.round(elapsed),
      errors: err,
      totalCharacters,
      correctCharacters,
    });
  };

  const resetTest = () => {
    setIsActive(false);
    setUserInput("");
    setStartTime(null);
    setTimeElapsed(0);
    setErrors(0);
    setTestResult(null);
    setCurrentText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive || (startTime && timeElapsed >= testDuration)) return;
    const value = e.target.value;

    // Limit to current text length to keep metrics consistent
    const nextValue = value.slice(0, currentText.length);
    setUserInput(nextValue);

    // Recompute errors based on current value vs target text
    let errorCount = 0;
    for (let i = 0; i < nextValue.length; i++) {
      if (nextValue[i] !== currentText[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);
  };

  const preventPaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
  };

  const renderText = () => {
    return currentText.split("").map((char, index) => {
      let className = "transition-colors duration-150 rounded-sm px-0.5 ";

      if (index < userInput.length) {
        className +=
          userInput[index] === char
            ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
            : "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200";
      } else if (index === userInput.length) {
        className +=
          "bg-blue-100 text-blue-900 dark:bg-blue-900/50 dark:text-foreground";
      } else {
        className += "text-muted-foreground";
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  const progress = Math.min((timeElapsed / testDuration) * 100, 100);

  const liveStats = useMemo(() => {
    if (!startTime || !isActive) {
      return {
        wpm: 0,
        accuracy:
          userInput.length > 0
            ? Math.round(((userInput.length - errors) / userInput.length) * 100)
            : 100,
      };
    }
    const elapsedSeconds = Math.min(
      (Date.now() - startTime) / 1000,
      testDuration
    );
    const { netWpm, accuracyPercent } = computeStats(
      userInput,
      errors,
      elapsedSeconds
    );
    return { wpm: Math.max(0, Math.round(netWpm)), accuracy: accuracyPercent };
  }, [startTime, isActive, userInput, errors, testDuration]);

  const timeLeft = Math.max(0, testDuration - Math.floor(timeElapsed));

  return (
    <>
      <SEOHead config={seoConfig} />

      <ToolLayout>
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Typing Speed Test
              </h1>
              <p className="text-lg text-muted-foreground">
                Measure your typing speed and accuracy using industry-standard
                calculations
              </p>
            </div>

            {!testResult && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold">{timeLeft}s</div>
                      <div className="text-sm text-muted-foreground">
                        Time Left
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold">{liveStats.wpm}</div>
                      <div className="text-sm text-muted-foreground">
                        WPM (net)
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Target className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold">
                        {liveStats.accuracy}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Accuracy
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-500">
                        {errors}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Errors
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <CardTitle className="flex items-center gap-2">
                    <Keyboard className="h-5 w-5" />
                    Typing Test
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Select
                      value={String(testDuration)}
                      onValueChange={(val) => setTestDuration(Number(val))}
                      disabled={isActive}
                    >
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 seconds</SelectItem>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="60">60 seconds</SelectItem>
                        <SelectItem value="120">120 seconds</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentText(
                          sampleTexts[
                            Math.floor(Math.random() * sampleTexts.length)
                          ]
                        )
                      }
                      disabled={isActive}
                    >
                      <Shuffle className="mr-2 h-4 w-4" />
                      New Text
                    </Button>

                    {!isActive && !testResult && (
                      <Button
                        onClick={startTest}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Start Test
                      </Button>
                    )}
                    <Button variant="outline" onClick={resetTest}>
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                </div>
                {isActive && (
                  <div className="mt-4">
                    <Progress value={progress} className="w-full" />
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {!testResult ? (
                  <>
                    <div className="text-lg leading-relaxed mb-6 p-4 border rounded-lg font-mono bg-card text-card-foreground dark:bg-card dark:text-card-foreground">
                      {renderText()}
                    </div>

                    <input
                      ref={inputRef}
                      type="text"
                      value={userInput}
                      onChange={handleInputChange}
                      onPaste={preventPaste}
                      disabled={!isActive}
                      placeholder={
                        isActive
                          ? "Start typing..."
                          : "Click 'Start Test' to begin"
                      }
                      className="w-full p-3 border rounded-lg text-lg font-mono focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted bg-background text-foreground"
                      autoCorrect="off"
                      autoCapitalize="none"
                      autoComplete="off"
                      spellCheck={false}
                      maxLength={currentText.length}
                    />
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-6">Test Complete!</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary">
                              {testResult.netWpm}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              WPM (net)
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">
                              {testResult.rawWpm}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              WPM (raw)
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">
                              {testResult.accuracy}%
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Accuracy
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">
                              {testResult.time}s
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Time
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-xl font-semibold">
                              {testResult.correctCharacters}/
                              {testResult.totalCharacters}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Correct / Typed
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-xl font-semibold text-red-500">
                              {testResult.errors}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Uncorrected Errors
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-xl font-semibold">
                              {Math.max(
                                testResult.totalCharacters -
                                  testResult.correctCharacters,
                                0
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Incorrect Keystrokes
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </ToolLayout>
    </>
  );
}
