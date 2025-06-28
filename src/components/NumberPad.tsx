
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface NumberPadProps {
  onNumberClick: (num: string) => void;
  disabled: boolean;
}

const NumberPad: React.FC<NumberPadProps> = ({ onNumberClick, disabled }) => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <Card className="p-6 bg-white/80 backdrop-blur border-blue-200 shadow-lg">
      <div className="grid grid-cols-3 gap-4 mb-6">
        {numbers.slice(0, 9).map((num) => (
          <Button
            key={num}
            onClick={() => onNumberClick(num)}
            disabled={disabled}
            className="h-24 md:h-28 lg:h-32 text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-blue-200 to-purple-200 hover:from-blue-300 hover:to-purple-300 text-blue-800 border-2 border-blue-300 hover:border-blue-400 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {num}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => onNumberClick('0')}
          disabled={disabled}
          className="h-24 md:h-28 lg:h-32 text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-blue-200 to-purple-200 hover:from-blue-300 hover:to-purple-300 text-blue-800 border-2 border-blue-300 hover:border-blue-400 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          0
        </Button>
        
        <Button
          onClick={() => onNumberClick('backspace')}
          disabled={disabled}
          className="h-24 md:h-28 lg:h-32 text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-orange-200 to-pink-200 hover:from-orange-300 hover:to-pink-300 text-orange-800 border-2 border-orange-300 hover:border-orange-400 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          ⌫
        </Button>
      </div>

      <div className="mt-4">
        <Button
          onClick={() => onNumberClick('clear')}
          disabled={disabled}
          className="w-full h-20 md:h-24 text-2xl md:text-3xl font-bold bg-gradient-to-br from-red-200 to-pink-200 hover:from-red-300 hover:to-pink-300 text-red-800 border-2 border-red-300 hover:border-red-400 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          Clear
        </Button>
      </div>
    </Card>
  );
};

export default NumberPad;
