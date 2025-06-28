
import React from 'react';
import { Card } from '@/components/ui/card';

interface SessionStatsProps {
  problemsCompleted: number;
  correctAnswers: number;
  averageTime: number;
  currentStreak: number;
}

const SessionStats: React.FC<SessionStatsProps> = ({
  problemsCompleted,
  correctAnswers,
  averageTime,
  currentStreak
}) => {
  const accuracy = problemsCompleted > 0 ? (correctAnswers / problemsCompleted * 100) : 0;

  return (
    <Card className="p-6 bg-white/80 backdrop-blur border-blue-200 shadow-lg mb-6">
      <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">
        📊 Session Stats
      </h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg">
          <span className="text-pink-800 font-medium">Problems Solved</span>
          <span className="text-2xl font-bold text-pink-700">{correctAnswers}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
          <span className="text-blue-800 font-medium">Total Attempted</span>
          <span className="text-2xl font-bold text-blue-700">{problemsCompleted}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg">
          <span className="text-purple-800 font-medium">Accuracy</span>
          <span className="text-2xl font-bold text-purple-700">{accuracy.toFixed(0)}%</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
          <span className="text-green-800 font-medium">Avg Time</span>
          <span className="text-2xl font-bold text-green-700">{averageTime.toFixed(1)}s</span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className="text-2xl">
          {currentStreak >= 5 ? '🔥' : currentStreak >= 3 ? '⭐' : '🌸'}
        </div>
        <div className="text-sm text-blue-600 font-medium">
          {currentStreak >= 5 ? 'On fire!' : currentStreak >= 3 ? 'Great job!' : 'Keep going!'}
        </div>
      </div>
    </Card>
  );
};

export default SessionStats;
