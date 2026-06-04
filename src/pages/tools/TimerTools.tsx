import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Timer, Clock, Play, Pause, RotateCcw } from "lucide-react";
import { ToolLayout } from "@/components/ToolLayout";
import { SEOHead } from "@/components/SEOHead";
import { getSEOConfig } from "@/lib/seo-config";
import { ToolExplanation } from "@/components/ToolExplanation";

export default function TimerTools() {
  const seoConfig = getSEOConfig("timertools");
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [countdownMinutes, setCountdownMinutes] = useState(5);
  const [countdownTime, setCountdownTime] = useState(5 * 60);
  const [countdownRunning, setCountdownRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (pomodoroRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((time) => {
          if (time <= 1) {
            setPomodoroRunning(false);
            // You could add notification here
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [pomodoroRunning, pomodoroTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (stopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime((time) => time + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [stopwatchRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (countdownRunning && countdownTime > 0) {
      interval = setInterval(() => {
        setCountdownTime((time) => {
          if (time <= 1) {
            setCountdownRunning(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [countdownRunning, countdownTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const resetPomodoro = () => {
    setPomodoroRunning(false);
    setPomodoroTime(25 * 60);
  };

  const resetStopwatch = () => {
    setStopwatchRunning(false);
    setStopwatchTime(0);
  };

  const resetCountdown = () => {
    setCountdownRunning(false);
    setCountdownTime(countdownMinutes * 60);
  };

  return (
    <>
      <SEOHead config={seoConfig} />

      <ToolLayout>
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Timer Tools
              </h1>
              <p className="text-xl text-muted-foreground">
                Productivity timers for focused work sessions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pomodoro Timer */}
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Timer className="h-5 w-5 text-red-500" />
                    Pomodoro Timer
                  </CardTitle>
                  <CardDescription>
                    25-minute focused work sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div
                      className={`text-6xl font-mono font-bold ${
                        pomodoroTime <= 60 ? "text-red-500" : "text-foreground"
                      }`}
                    >
                      {formatTime(pomodoroTime)}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => setPomodoroRunning(!pomodoroRunning)}
                        disabled={pomodoroTime === 0}
                        className="flex-1"
                      >
                        {pomodoroRunning ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="outline" onClick={resetPomodoro}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {pomodoroTime === 0
                        ? "Time's up! Take a break."
                        : "Focus time"}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stopwatch */}
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    Stopwatch
                  </CardTitle>
                  <CardDescription>Track elapsed time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-6xl font-mono font-bold text-foreground">
                      {formatTime(stopwatchTime)}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => setStopwatchRunning(!stopwatchRunning)}
                        className="flex-1"
                      >
                        {stopwatchRunning ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="outline" onClick={resetStopwatch}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {stopwatchRunning ? "Running..." : "Ready to start"}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Countdown Timer */}
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Timer className="h-5 w-5 text-green-500" />
                    Countdown Timer
                  </CardTitle>
                  <CardDescription>Custom countdown timer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div
                      className={`text-6xl font-mono font-bold ${
                        countdownTime <= 60 ? "text-red-500" : "text-foreground"
                      }`}
                    >
                      {formatTime(countdownTime)}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => setCountdownRunning(!countdownRunning)}
                        disabled={countdownTime === 0}
                        className="flex-1"
                      >
                        {countdownRunning ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="outline" onClick={resetCountdown}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Input
                        type="number"
                        min="1"
                        max="60"
                        value={countdownMinutes}
                        onChange={(e) => {
                          const minutes = parseInt(e.target.value) || 1;
                          setCountdownMinutes(minutes);
                          if (!countdownRunning) {
                            setCountdownTime(minutes * 60);
                          }
                        }}
                        disabled={countdownRunning}
                        className="text-center"
                      />
                      <div className="text-xs text-muted-foreground">
                        {countdownTime === 0 ? "Time's up!" : "Minutes"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <ToolExplanation
              title="Pomodoro Timer & Stopwatch"
              description="Toolzaply's Timer Tools suite combines three essential time-management instruments in one page: a classic Pomodoro Timer, a precision Stopwatch, and a fully customizable Countdown Timer. The Pomodoro technique, developed by Francesco Cirillo, structures work into focused 25-minute intervals followed by short rest breaks, which scientific research shows reduces mental fatigue and increases sustained concentration. All timers run locally in your browser with no background processes required."
              howToUse={[
                "Pomodoro: Click the Play button to start a 25-minute focus session. When the timer reaches zero, it's time for a break. Click Reset to restart.",
                "Stopwatch: Click Play to begin counting elapsed time. Click Pause to hold, and Reset to return to zero.",
                "Countdown: Enter the number of minutes you want in the input field, then click Play. The timer will count down and stop at zero.",
                "Run multiple timers simultaneously if needed — each operates independently."
              ]}
              features={[
                "Classic Pomodoro Timer set to the standard 25-minute focus interval.",
                "Precision Stopwatch for tracking elapsed time in any activity.",
                "Custom Countdown Timer: enter any duration from 1–60 minutes.",
                "Visual red-alert color when under 60 seconds on Pomodoro and Countdown.",
                "Zero installation required — runs entirely in browser with JavaScript intervals."
              ]}
              faqs={[
                {
                  question: "What is the Pomodoro Technique?",
                  answer: "The Pomodoro Technique is a time management method invented by Francesco Cirillo in the late 1980s. You work on a single task for 25 minutes (one 'Pomodoro'), then take a 5-minute break. After completing four Pomodoros, you take a longer 15–30 minute break."
                },
                {
                  question: "Does the timer continue running if I switch browser tabs?",
                  answer: "Yes. The timer uses JavaScript's setInterval API which continues counting even when the tab is not in focus. However, some mobile browsers may throttle or pause inactive tabs to save battery."
                },
                {
                  question: "Can I customize the Pomodoro duration?",
                  answer: "The default Pomodoro is set to the standard 25 minutes. If you need a custom duration, you can use the Countdown Timer card and set it to your preferred work interval."
                }
              ]}
            />
          </motion.div>
        </div>
      </ToolLayout>
    </>
  );
}
