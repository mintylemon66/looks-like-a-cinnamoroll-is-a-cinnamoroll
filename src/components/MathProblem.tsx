
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
  userAnswer,
  showResult,
  isCorrect,
  correctAnswer
}) => {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur border-blue-200 shadow-lg mb-6">
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-700 mb-4">
          {num1} × {num2} = ?
        </div>
        
        <div className="text-2xl mb-4">
          <span className="text-purple-600 font-semibold">Your Answer: </span>
          <span className={`font-bold ${showResult ? (isCorrect ? 'text-green-600' : 'text-red-600') : 'text-blue-600'}`}>
            {userAnswer || '_____'}
          </span>
        </div>

        {showResult && (
          <div className={`text-xl font-bold p-4 rounded-lg ${
            isCorrect 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isCorrect ? (
              <div>
                🎉 Correct! Well done! 🎉
              </div>
            ) : (
              <div>
                ❌ Oops! The correct answer is {correctAnswer}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default MathProblem;
