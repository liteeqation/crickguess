import React from 'react';
import { LetterFeedback } from './LetterFeedback';

interface GuessHistoryProps {
  previousGuesses: string[];
  answer: string;
}

export function GuessHistory({ previousGuesses, answer }: GuessHistoryProps) {
  return (
    <div className="glass-effect p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-3">Previous Guesses</h3>
      <div className="space-y-2">
        {previousGuesses.map((guess, index) => (
          <LetterFeedback
            key={`${guess}-${index}`}
            guess={guess}
            answer={answer}
          />
        ))}
        {previousGuesses.length === 0 && (
          <p className="text-gray-300 text-center">No guesses yet</p>
        )}
      </div>
    </div>
  );
}