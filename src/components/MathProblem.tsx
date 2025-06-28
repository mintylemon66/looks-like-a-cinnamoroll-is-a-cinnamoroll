
import React from 'react';
import { Card } from '@/components/ui/card';

interface MathProblemProps {
  num1: number;
  num2: number;
  userAnswer: string;
  showResult: boolean;
  isCorrect: boolean;
  correctAnswer: number;
}

const MathProblem: React.FC<MathProblemProps> = ({
  num1,
  num2,
  userAnswer
}) => {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur border-blue-200 shadow-lg mb-6">
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-700 mb-4">
          {num1} × {num2} = ?
        </div>
        
        <div className="text-2xl mb-4">
          <span className="text-purple-600 font-semibold">Your Answer: </span>
          <span className="font-bold text-blue-600">
            {userAnswer || '_____'}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default MathProblem;
