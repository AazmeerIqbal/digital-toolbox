import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Gift, Star, Clock } from "lucide-react";

interface AgeData {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  zodiacSign: string;
  dayOfWeek: string;
  nextBirthday: number;
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [ageData, setAgeData] = useState<AgeData | null>(null);

  const zodiacSigns = [
    { sign: "Capricorn", start: [12, 22], end: [1, 19], element: "Earth", symbol: "♑" },
    { sign: "Aquarius", start: [1, 20], end: [2, 18], element: "Air", symbol: "♒" },
    { sign: "Pisces", start: [2, 19], end: [3, 20], element: "Water", symbol: "♓" },
    { sign: "Aries", start: [3, 21], end: [4, 19], element: "Fire", symbol: "♈" },
    { sign: "Taurus", start: [4, 20], end: [5, 20], element: "Earth", symbol: "♉" },
    { sign: "Gemini", start: [5, 21], end: [6, 20], element: "Air", symbol: "♊" },
    { sign: "Cancer", start: [6, 21], end: [7, 22], element: "Water", symbol: "♋" },
    { sign: "Leo", start: [7, 23], end: [8, 22], element: "Fire", symbol: "♌" },
    { sign: "Virgo", start: [8, 23], end: [9, 22], element: "Earth", symbol: "♍" },
    { sign: "Libra", start: [9, 23], end: [10, 22], element: "Air", symbol: "♎" },
    { sign: "Scorpio", start: [10, 23], end: [11, 21], element: "Water", symbol: "♏" },
    { sign: "Sagittarius", start: [11, 22], end: [12, 21], element: "Fire", symbol: "♐" }
  ];

  const getZodiacSign = (month: number, day: number): string => {
    for (const zodiac of zodiacSigns) {
      const [startMonth, startDay] = zodiac.start;
      const [endMonth, endDay] = zodiac.end;
      
      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay) ||
        (startMonth > endMonth && (month === startMonth && day >= startDay || month === endMonth && day <= endDay))
      ) {
        return `${zodiac.symbol} ${zodiac.sign} (${zodiac.element})`;
      }
    }
    return "Unknown";
  };

  const getDayOfWeek = (date: Date): string => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const now = new Date();
    
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const hours = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60)) % 60;

    // Next birthday calculation
    const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < now) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    const zodiacSign = getZodiacSign(birth.getMonth() + 1, birth.getDate());
    const dayOfWeek = getDayOfWeek(birth);

    setAgeData({
      years,
      months,
      days,
      hours,
      minutes,
      totalDays,
      totalHours,
      totalMinutes,
      zodiacSign,
      dayOfWeek,
      nextBirthday: daysToNextBirthday
    });
  };

  const funFacts = ageData ? [
    `You've been alive for ${ageData.totalDays.toLocaleString()} days!`,
    `That's ${ageData.totalHours.toLocaleString()} hours!`,
    `Or ${ageData.totalMinutes.toLocaleString()} minutes!`,
    `You were born on a ${ageData.dayOfWeek}`,
    `Your zodiac sign is ${ageData.zodiacSign}`,
    `Your next birthday is in ${ageData.nextBirthday} days`
  ] : [];

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

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Enter Your Birth Date
                </CardTitle>
                <CardDescription>
                  Select your birth date to calculate your exact age
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Birth Date</label>
                    <Input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <Button onClick={calculateAge} disabled={!birthDate} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Calculate Age
                  </Button>
                </div>
              </CardContent>
            </Card>

            {ageData && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">{ageData.years}</div>
                        <div className="text-sm text-muted-foreground">Years</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">{ageData.months}</div>
                        <div className="text-sm text-muted-foreground">Months</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">{ageData.days}</div>
                        <div className="text-sm text-muted-foreground">Days</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">{ageData.nextBirthday}</div>
                        <div className="text-sm text-muted-foreground">Days to Birthday</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Detailed Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span>Total Days:</span>
                        <span className="font-semibold">{ageData.totalDays.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Hours:</span>
                        <span className="font-semibold">{ageData.totalHours.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Minutes:</span>
                        <span className="font-semibold">{ageData.totalMinutes.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Birth Day:</span>
                        <span className="font-semibold">{ageData.dayOfWeek}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Fun Facts
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {funFacts.map((fact, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Gift className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{fact}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}