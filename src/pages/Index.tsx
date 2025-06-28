import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DifficultySelector, { DifficultyType } from '@/components/DifficultySelector';
import MathProblem from '@/components/MathProblem';
import NumberPad from '@/components/NumberPad';
import SessionStats from '@/components/SessionStats';

const Index = () => {
  const [difficulty, setDifficulty] = useState<DifficultyType | null>(null);
  const [currentProblem, setCurrentProblem] = useState<{num1: number, num2: number, answer: number} | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [problemStartTime, setProblemStartTime] = useState<number | null>(null);
  const [problemTimes, setProblemTimes] = useState<number[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);
  const [backgroundEmojis, setBackgroundEmojis] = useState<Array<{id: number, emoji: string, x: number, y: number, duration: number}>>([]);

  const cinnamorollEmojis = ['🌸', '☁️', '⭐', '✨', '🌙', '💫', '🦋', '🌺', '🌈', '💝', '🎀', '🧸'];

  // Generate random background emojis
  useEffect(() => {
    const generateEmoji = () => {
      const emoji = cinnamorollEmojis[Math.floor(Math.random() * cinnamorollEmojis.length)];
      return {
        id: Date.now() + Math.random(),
        emoji,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 3 + Math.random() * 4
      };
    };

    const interval = setInterval(() => {
      setBackgroundEmojis(prev => {
        const newEmojis = [...prev, generateEmoji()];
        return newEmojis.slice(-15); // Keep only last 15 emojis
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Remove old emojis
  useEffect(() => {
    const cleanup = setTimeout(() => {
      setBackgroundEmojis(prev => prev.slice(1));
    }, 7000);

    return () => clearTimeout(cleanup);
  }, [backgroundEmojis]);

  const generateProblem = (difficultyType: DifficultyType) => {
    let num1, num2;
    
    switch (difficultyType) {
      case '1x1':
        num1 = Math.floor(Math.random() * 9) + 1;
        num2 = Math.floor(Math.random() * 9) + 1;
        break;
      case '2x2':
        num1 = Math.floor(Math.random() * 90) + 10;
        num2 = Math.floor(Math.random() * 90) + 10;
        break;
      case '3x1':
        num1 = Math.floor(Math.random() * 900) + 100;
        num2 = Math.floor(Math.random() * 9) + 1;
        break;
      case '3x2':
        num1 = Math.floor(Math.random() * 900) + 100;
        num2 = Math.floor(Math.random() * 90) + 10;
        break;
      case '3x3':
        num1 = Math.floor(Math.random() * 900) + 100;
        num2 = Math.floor(Math.random() * 900) + 100;
        break;
      case '4x4':
        num1 = Math.floor(Math.random() * 9000) + 1000;
        num2 = Math.floor(Math.random() * 9000) + 1000;
        break;
      default:
        num1 = 1;
        num2 = 1;
    }
    
    return {
      num1,
      num2,
      answer: num1 * num2
    };
  };

  const startSession = (selectedDifficulty: DifficultyType) => {
    setDifficulty(selectedDifficulty);
    setSessionStartTime(Date.now());
    setProblemStartTime(Date.now());
    setCurrentProblem(generateProblem(selectedDifficulty));
    setSessionActive(true);
    setProblemTimes([]);
    setCorrectAnswers(0);
    setUserAnswer('');
  };

  const handleNumberInput = (num: string) => {
    if (num === 'clear') {
      setUserAnswer('');
    } else if (num === 'backspace') {
      setUserAnswer(prev => prev.slice(0, -1));
    } else {
      setUserAnswer(prev => prev + num);
    }
  };

  // Auto-check answer whenever userAnswer changes - immediate progression
  useEffect(() => {
    if (!currentProblem || !problemStartTime || userAnswer === '') return;

    const userNum = parseInt(userAnswer);
    if (userNum === currentProblem.answer) {
      const timeSpent = Date.now() - problemStartTime;
      setProblemTimes(prev => [...prev, timeSpent]);
      setCorrectAnswers(prev => prev + 1);
      
      // Immediately move to next problem
      if (difficulty) {
        setCurrentProblem(generateProblem(difficulty));
        setProblemStartTime(Date.now());
        setUserAnswer('');
      }
    }
  }, [userAnswer, currentProblem, problemStartTime, difficulty]);

  const endSession = () => {
    setSessionActive(false);
    setDifficulty(null);
    setCurrentProblem(null);
    setUserAnswer('');
  };

  const averageTime = problemTimes.length > 0 
    ? problemTimes.reduce((a, b) => a + b, 0) / problemTimes.length / 1000 
    : 0;

  if (!sessionActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 relative overflow-hidden">
        {/* Background Emojis */}
        {backgroundEmojis.map((emoji) => (
          <div
            key={emoji.id}
            className="absolute text-2xl opacity-20 pointer-events-none animate-pulse"
            style={{
              left: `${emoji.x}%`,
              top: `${emoji.y}%`,
              animationDuration: `${emoji.duration}s`
            }}
          >
            {emoji.emoji}
          </div>
        ))}
        
        <div className="max-w-2xl mx-auto pt-8 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              ✨ Cinnamoroll Math Trainer ✨
            </h1>
            <p className="text-xl text-blue-600 font-medium">
              Practice multiplication with cute Cinnamoroll colors! 🐰
            </p>
          </div>
          
          <DifficultySelector onSelect={startSession} />
          
          {problemTimes.length > 0 && (
            <Card className="mt-8 p-6 bg-white/70 backdrop-blur border-blue-200">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Last Session Results</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{correctAnswers}</div>
                  <div className="text-blue-600">Problems Solved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{averageTime.toFixed(1)}s</div>
                  <div className="text-blue-600">Average Time</div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 relative overflow-hidden">
      {/* Background Emojis */}
      {backgroundEmojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute text-3xl opacity-15 pointer-events-none animate-bounce"
          style={{
            left: `${emoji.x}%`,
            top: `${emoji.y}%`,
            animationDuration: `${emoji.duration}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        >
          {emoji.emoji}
        </div>
      ))}
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ✨ Math Trainer ✨
          </h1>
          <Button 
            onClick={endSession}
            variant="outline"
            className="bg-red-100 hover:bg-red-200 text-red-700 border-red-300"
          >
            End Session
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <SessionStats 
              problemsCompleted={problemTimes.length}
              correctAnswers={correctAnswers}
              averageTime={averageTime}
              currentStreak={correctAnswers}
            />
            
            {currentProblem && (
              <MathProblem 
                num1={currentProblem.num1}
                num2={currentProblem.num2}
                userAnswer={userAnswer}
                showResult={false}
                isCorrect={false}
                correctAnswer={currentProblem.answer}
              />
            )}
          </div>

          <div className="lg:col-span-2">
            <NumberPad 
              onNumberClick={handleNumberInput}
              disabled={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
