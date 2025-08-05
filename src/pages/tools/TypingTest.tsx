import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Keyboard, RotateCcw, Trophy, Clock, Target, Zap } from "lucide-react";

interface TestResult {
  wpm: number;
  accuracy: number;
  time: number;
  errors: number;
  totalCharacters: number;
}

export default function TypingTest() {
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [errors, setErrors] = useState(0);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [testDuration] = useState(60); // 60 seconds test
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is commonly used for typing practice.",
    "Technology has revolutionized the way we communicate, work, and live. From smartphones to artificial intelligence, innovation continues to shape our future.",
    "Programming is both an art and a science. It requires logical thinking, creativity, and attention to detail to create software that solves real-world problems.",
    "The beauty of nature never ceases to amaze us. From towering mountains to vast oceans, our planet offers countless wonders to explore and protect.",
    "Education is the foundation of progress. Through learning and knowledge sharing, we build a better society for current and future generations."
  ];
  
  const [currentText] = useState(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && startTime) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setTimeElapsed(elapsed);
        
        if (elapsed >= testDuration) {
          finishTest();
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isActive, startTime, testDuration]);

  const startTest = () => {
    setIsActive(true);
    setStartTime(Date.now());
    setCurrentIndex(0);
    setUserInput('');
    setErrors(0);
    setTimeElapsed(0);
    setTestResult(null);
    inputRef.current?.focus();
  };

  const finishTest = () => {
    setIsActive(false);
    
    const totalCharacters = userInput.length;
    const correctCharacters = totalCharacters - errors;
    const timeInMinutes = timeElapsed / 60;
    const wpm = Math.round((correctCharacters / 5) / timeInMinutes);
    const accuracy = Math.round((correctCharacters / totalCharacters) * 100);
    
    setTestResult({
      wpm: isNaN(wpm) ? 0 : wpm,
      accuracy: isNaN(accuracy) ? 0 : accuracy,
      time: timeElapsed,
      errors,
      totalCharacters
    });
  };

  const resetTest = () => {
    setIsActive(false);
    setCurrentIndex(0);
    setUserInput('');
    setStartTime(null);
    setTimeElapsed(0);
    setErrors(0);
    setTestResult(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive || timeElapsed >= testDuration) return;

    const value = e.target.value;
    setUserInput(value);
    
    // Check for errors
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentText[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);
    setCurrentIndex(value.length);
  };

  const renderText = () => {
    return currentText.split('').map((char, index) => {
      let className = 'transition-colors duration-150 ';
      
      if (index < userInput.length) {
        className += userInput[index] === char ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200' : 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200';
      } else if (index === userInput.length) {
        className += 'bg-blue-200 dark:bg-blue-800';
      } else {
        className += 'text-muted-foreground';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  const progress = (timeElapsed / testDuration) * 100;
  const currentWpm = startTime && timeElapsed > 0 ? Math.round(((userInput.length - errors) / 5) / (timeElapsed / 60)) : 0;

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

            {!testResult && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold">{testDuration - timeElapsed}s</div>
                      <div className="text-sm text-muted-foreground">Time Left</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold">{currentWpm}</div>
                      <div className="text-sm text-muted-foreground">WPM</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Target className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold">{userInput.length > 0 ? Math.round(((userInput.length - errors) / userInput.length) * 100) : 100}%</div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-500">{errors}</div>
                      <div className="text-sm text-muted-foreground">Errors</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Keyboard className="h-5 w-5" />
                    Typing Test
                  </CardTitle>
                  <div className="flex gap-2">
                    {!isActive && !testResult && (
                      <Button onClick={startTest} className="bg-primary text-primary-foreground hover:bg-primary/90">
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
                    <div className="text-lg leading-relaxed mb-6 p-4 border rounded-lg font-mono">
                      {renderText()}
                    </div>
                    
                    <input
                      ref={inputRef}
                      type="text"
                      value={userInput}
                      onChange={handleInputChange}
                      disabled={!isActive}
                      placeholder={isActive ? "Start typing..." : "Click 'Start Test' to begin"}
                      className="w-full p-3 border rounded-lg text-lg font-mono focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted"
                    />
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-6">Test Complete!</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl mx-auto">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary">{testResult.wpm}</div>
                            <div className="text-sm text-muted-foreground">WPM</div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">{testResult.accuracy}%</div>
                            <div className="text-sm text-muted-foreground">Accuracy</div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{testResult.time}s</div>
                            <div className="text-sm text-muted-foreground">Time</div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-red-500">{testResult.errors}</div>
                            <div className="text-sm text-muted-foreground">Errors</div>
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
      </div>
    </>
  );
}