import { useState, useCallback, useEffect } from 'react';
import { QuizState, HistoricalMatch } from '../types/quiz';
import { getRandomDailyMatch } from '../utils/gameUtils';
import { normalizeAnswer } from '../utils/stringUtils';
import { getDailyGameId } from '../utils/dateUtils';
import { canPlayToday, updateStreak } from '../utils/storageUtils';

export function useQuizGame() {
  const [state, setState] = useState<QuizState>({
    currentMatch: null,
    stage: 'player',
    attempts: 0,
    score: 0,
    streak: 0,
    gameStatus: 'playing'
  });

  const initializeGame = useCallback(() => {
    const gameId = getDailyGameId();
    if (canPlayToday(gameId)) {
      setState(prev => ({
        ...prev,
        currentMatch: getRandomDailyMatch(),
        stage: 'player',
        attempts: 0,
        gameStatus: 'playing'
      }));
    } else {
      setState(prev => ({
        ...prev,
        gameStatus: 'completed'
      }));
    }
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const resetForNewDay = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  const handleGuess = useCallback((guess: string) => {
    setState(prev => {
      if (!prev.currentMatch) return prev;

      const currentAnswer = prev.stage === 'player' 
        ? prev.currentMatch.player 
        : prev.currentMatch.stadium;
      const normalizedGuess = normalizeAnswer(guess);
      const normalizedAnswer = normalizeAnswer(currentAnswer);
      const isCorrect = normalizedGuess === normalizedAnswer;
      const newAttempts = prev.attempts + 1;

      if (isCorrect) {
        if (prev.stage === 'player') {
          return {
            ...prev,
            stage: 'stadium',
            attempts: 0,
            score: prev.score + 50,
          };
        } else {
          const gameId = getDailyGameId();
          const newStreak = updateStreak(true, gameId);
          return {
            ...prev,
            score: prev.score + 50,
            streak: newStreak,
            gameStatus: 'won',
          };
        }
      }

      if (newAttempts >= 5) {
        const gameId = getDailyGameId();
        const newStreak = updateStreak(false, gameId);
        return {
          ...prev,
          attempts: newAttempts,
          streak: newStreak,
          gameStatus: 'lost',
        };
      }

      return {
        ...prev,
        attempts: newAttempts,
      };
    });
  }, []);

  const getCurrentAnswer = useCallback(() => {
    if (!state.currentMatch) return '';
    return state.stage === 'player' 
      ? state.currentMatch.player 
      : state.currentMatch.stadium;
  }, [state.currentMatch, state.stage]);

  const getCurrentHint = useCallback(() => {
    if (!state.currentMatch) return '';
    const { year, score, fact } = state.currentMatch;
    return `${fact} (${year}) - Score: ${score}`;
  }, [state.currentMatch]);

  return {
    ...state,
    handleGuess,
    getCurrentAnswer,
    getCurrentHint,
    resetForNewDay
  };
}