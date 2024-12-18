import { HistoricalMatch } from '../types/quiz';
import { historicalMatches } from '../data/historicalMatches';
import { getDailyGameId } from './dateUtils';

export type LetterStatus = 'correct' | 'present' | 'absent';

// Function to get a random daily match
export function getRandomDailyMatch(): HistoricalMatch {
  const gameId = getDailyGameId();
  const seed = Array.from(gameId).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const shuffled = [...historicalMatches];
  let currentIndex = shuffled.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(((seed * currentIndex) % 2147483647) / 2147483647 * currentIndex);
    currentIndex -= 1;

    [shuffled[currentIndex], shuffled[randomIndex]] = 
    [shuffled[randomIndex], shuffled[currentIndex]];
  }

  return shuffled[0];
}

// Function to get feedback for guessed letters
export function getLetterFeedback(guess: string, answer: string): LetterStatus[] {
  const normalizedGuess = guess.toUpperCase();
  const normalizedAnswer = answer.toUpperCase();
  const result: LetterStatus[] = Array(guess.length).fill('absent');
  
  // Track available letters in answer
  const letterCount = new Map<string, number>();
  for (const letter of normalizedAnswer) {
    letterCount.set(letter, (letterCount.get(letter) || 0) + 1);
  }

  // First pass: mark correct positions
  for (let i = 0; i < normalizedGuess.length; i++) {
    if (normalizedGuess[i] === normalizedAnswer[i]) {
      result[i] = 'correct';
      letterCount.set(normalizedGuess[i], (letterCount.get(normalizedGuess[i]) || 0) - 1);
    }
  }

  // Second pass: mark present letters
  for (let i = 0; i < normalizedGuess.length; i++) {
    if (result[i] !== 'correct') {
      const count = letterCount.get(normalizedGuess[i]) || 0;
      if (count > 0) {
        result[i] = 'present';
        letterCount.set(normalizedGuess[i], count - 1);
      }
    }
  }

  return result;
}
