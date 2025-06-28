
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DifficultySelector from '@/components/DifficultySelector';
import MathProblem from '@/components/MathProblem';
import NumberPad from '@/components/NumberPad';
import SessionStats from '@/components/SessionStats';

const Index = () => {
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [currentProblem, setCurrentProblem] = useState<{num1: number, num2: number, answer: number} | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [problemStartTime, setProblemStartTime] = useState<number | null>(null);
  const [problemTimes, setProblemTimes] = useState<number[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);

  const generateProblem = (digits: number) => {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    return {
      num1,
      num2,
      answer: num1 * num2
    };
  };

  const startSession = (selectedDifficulty: number) => {
    setDifficulty(selectedDifficulty);
    setSessionStartTime(Date.now());
    setProblemStartTime(Date.now());
    setCurrentProblem(generateProblem(selectedDifficulty));
    setSessionActive(true);
    setProblemTimes([]);
    setCorrectAnswers(0);
    setUserAnswer('');
    setShowResult(false);
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

  const submitAnswer = () => {
    if (!currentProblem || !problemStartTime || userAnswer === '') return;

    const timeSpent = Date.now() - problemStartTime;
    const isCorrect = parseInt(userAnswer) === currentProblem.answer;
    
    setProblemTimes(prev => [...prev, timeSpent]);
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }

    setShowResult(true);
    
    setTimeout(() => {
      if (difficulty) {
        setCurrentProblem(generateProblem(difficulty));
        setProblemStartTime(Date.now());
        setUserAnswer('');
        setShowResult(false);
      }
    }, 1500);
  };

  const endSession = () => {
    setSessionActive(false);
    setDifficulty(null);
    setCurrentProblem(null);
    setUserAnswer('');
    setShowResult(false);
  };

  const averageTime = problemTimes.length > 0 
    ? problemTimes.reduce((a, b) => a + b, 0) / problemTimes.length / 1000 
    : 0;

  if (!sessionActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-2xl mx-auto pt-8">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
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
                showResult={showResult}
                isCorrect={showResult ? parseInt(userAnswer) === currentProblem.answer : false}
                correctAnswer={currentProblem.answer}
              />
            )}
          </div>

          <div className="lg:col-span-2">
            <NumberPad 
              onNumberClick={handleNumberInput}
              onSubmit={submitAnswer}
              disabled={showResult}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
