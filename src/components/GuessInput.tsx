import React, { useState, useCallback, useEffect } from 'react';
import { LetterInput } from './LetterInput';
import { LetterFeedback } from './LetterFeedback';
import { getLetterFeedback } from '../utils/gameUtils';

interface GuessInputProps {
  onSubmit: (guess: string) => void;
  disabled: boolean;
  maxLength: number;
  answer: string;
}

export function GuessInput({ onSubmit, disabled, maxLength, answer }: GuessInputProps) {
  const [letters, setLetters] = useState<string[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [previousGuesses, setPreviousGuesses] = useState<string[]>([]);

  useEffect(() => {
    const answerLength = answer.replace(/[^A-Z]/gi, '').length;
    setLetters(Array(answerLength).fill(''));
    setFocusedIndex(0);
    setPreviousGuesses([]);
  }, [answer]);

  const handleLetterChange = useCallback((index: number, value: string) => {
    if (disabled) return;

    setLetters(prev => {
      const newLetters = [...prev];
      newLetters[index] = value;
      return newLetters;
    });

    if (value && index < maxLength - 1) {
      setFocusedIndex(index + 1);
    }
  }, [disabled, maxLength]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'Backspace' && !letters[index] && index > 0) {
      setFocusedIndex(index - 1);
    } else if (e.key === 'Enter' && letters.every(letter => letter)) {
      const guess = letters.join('');
      setPreviousGuesses(prev => [...prev, guess]);
      onSubmit(guess);
      setLetters(Array(maxLength).fill(''));
      setFocusedIndex(0);
    }
  }, [letters, onSubmit, disabled, maxLength]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4">
        {previousGuesses.map((guess, guessIndex) => (
          <LetterFeedback
            key={guessIndex}
            guess={guess}
            answer={answer}
          />
        ))}
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        {Array(maxLength).fill(0).map((_, index) => (
          <LetterInput
            key={index}
            value={letters[index] || ''}
            onChange={(value) => handleLetterChange(index, value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            focused={focusedIndex === index}
            disabled={disabled}
          />
        ))}
      </div>
      <button
        onClick={() => {
          if (letters.every(letter => letter)) {
            const guess = letters.join('');
            setPreviousGuesses(prev => [...prev, guess]);
            onSubmit(guess);
            setLetters(Array(maxLength).fill(''));
            setFocusedIndex(0);
          }
        }}
        disabled={disabled || !letters.every(letter => letter)}
        className="w-full px-6 py-2 bg-blue-800 text-white rounded-lg 
                   hover:bg-blue-700 disabled:opacity-50
                   transition-colors glass-effect"
      >
        Submit Guess
      </button>
    </div>
  );
}