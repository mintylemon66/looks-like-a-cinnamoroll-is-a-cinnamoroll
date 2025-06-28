
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export type DifficultyType = '1x1' | '2x2' | '3x3' | '4x4' | '3x1' | '3x2';

interface DifficultySelectorProps {
  onSelect: (difficulty: DifficultyType) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelect }) => {
  const difficulties = [
    { level: '1x1' as DifficultyType, label: '1 × 1 Digits', description: 'Perfect for beginners! 🌸', color: 'from-pink-200 to-pink-300' },
    { level: '2x2' as DifficultyType, label: '2 × 2 Digits', description: 'Getting warmer! ☁️', color: 'from-blue-200 to-blue-300' },
    { level: '3x1' as DifficultyType, label: '3 × 1 Digits', description: 'Three by one! 🌟', color: 'from-cyan-200 to-cyan-300' },
    { level: '3x2' as DifficultyType, label: '3 × 2 Digits', description: 'Mixed challenge! 🎯', color: 'from-teal-200 to-teal-300' },
    { level: '3x3' as DifficultyType, label: '3 × 3 Digits', description: 'Challenge time! ⭐', color: 'from-purple-200 to-purple-300' },
    { level: '4x4' as DifficultyType, label: '4 × 4 Digits', description: 'Expert level! 🚀', color: 'from-indigo-200 to-indigo-300' },
  ];

  return (
    <Card className="p-8 bg-white/80 backdrop-blur border-blue-200 shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
        Choose Your Difficulty Level
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {difficulties.map((diff) => (
          <Button
            key={diff.level}
            onClick={() => onSelect(diff.level)}
            className={`h-24 text-left p-6 bg-gradient-to-r ${diff.color} hover:scale-105 transition-all duration-200 border-0 shadow-md hover:shadow-lg`}
          >
            <div>
              <div className="text-lg font-bold text-gray-800">{diff.label}</div>
              <div className="text-sm text-gray-600 mt-1">{diff.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default DifficultySelector;
