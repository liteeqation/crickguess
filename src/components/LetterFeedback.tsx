import React from 'react';
import { getLetterFeedback } from '../utils/gameUtils';

interface LetterFeedbackProps {
  guess: string;
  answer: string;
}

export function LetterFeedback({ guess, answer }: LetterFeedbackProps) {
  const feedback = getLetterFeedback(guess, answer);
  const isCorrect = guess.toLowerCase() === answer.toLowerCase();

  // Don't show feedback if the guess is completely correct
  if (isCorrect) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-green-400 font-bold text-lg">
          ✨ Correct! ✨
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {feedback.map((status, index) => (
        <div
          key={index}
          className={`
            w-10 h-10 flex items-center justify-center
            text-xl font-bold rounded-lg
            ${status === 'correct' ? 'bg-green-500' : ''}
            ${status === 'present' ? 'bg-yellow-500' : ''}
            ${status === 'absent' ? 'bg-gray-500' : ''}
            text-white
          `}
        >
          {guess[index]?.toUpperCase()}
        </div>
      ))}
    </div>
  );
}