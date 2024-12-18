import React from 'react';
import { Trophy, XCircle } from 'lucide-react';

interface GameStatusProps {
  status: 'playing' | 'won' | 'lost';
  answer?: string;
}

export function GameStatus({ status, answer }: GameStatusProps) {
  if (status === 'playing') return null;

  return (
    <div className={`flex items-center gap-3 p-6 rounded-lg glass-effect ${
      status === 'won' ? 'border-green-400' : 'border-red-400'
    } border-2`}>
      {status === 'won' ? (
        <>
          <Trophy className="w-6 h-6 text-green-400" />
          <p className="text-white text-lg font-medium">Correct! Well done!</p>
        </>
      ) : (
        <>
          <XCircle className="w-6 h-6 text-red-400" />
          <p className="text-white text-lg font-medium">
            Game Over! The correct answer was: <span className="font-bold">{answer}</span>
          </p>
        </>
      )}
    </div>
  );
}