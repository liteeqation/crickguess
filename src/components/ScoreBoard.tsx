import React from 'react';

interface ScoreBoardProps {
  score: number;
  streak: number;
  attempts: number;
}

export function ScoreBoard({ score, streak, attempts }: ScoreBoardProps) {
  const remainingPoints = attempts === 5 ? 100 : [500, 400, 300, 200, 100][attempts];

  return (
    <div className="grid grid-cols-3 gap-4 p-6 glass-effect rounded-lg shadow-xl">
      <div className="text-center">
        <p className="text-gray-200 text-sm font-medium">Score</p>
        <p className="text-3xl font-bold text-white">{score}</p>
      </div>
      <div className="text-center">
        <p className="text-gray-200 text-sm font-medium">Streak</p>
        <p className="text-3xl font-bold text-white">{streak}</p>
      </div>
      <div className="text-center">
        <p className="text-gray-200 text-sm font-medium">Next Correct</p>
        <p className="text-3xl font-bold text-white">{remainingPoints}</p>
      </div>
    </div>
  );
}