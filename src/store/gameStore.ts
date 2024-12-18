import { create } from 'zustand';
import { QuizState, HistoricalMatch } from '../types/quiz';
import { getRandomDailyMatch } from '../utils/gameUtils';
import { normalizeAnswer } from '../utils/stringUtils';
import { getDailyGameId } from '../utils/dateUtils';
import { canPlayToday, updateStreak } from '../utils/storageUtils';
import { toast } from 'sonner';

interface GameStore extends QuizState {
  initializeGame: () => void;
  resetForNewDay: () => void;
  handleGuess: (guess: string) => void;
  getCurrentAnswer: () => string;
  getCurrentHint: () => string;
}

const getScoreForAttempt = (attempts: number): number => {
  switch (attempts) {
    case 1: return 500;
    case 2: return 400;
    case 3: return 300;
    case 4: return 200;
    case 5: return 100;
    default: return 0;
  }
};

export const useGameStore = create<GameStore>((set, get) => ({
  currentMatch: null,
  stage: 'player',
  attempts: 0,
  score: 0,
  streak: 0,
  gameStatus: 'playing',

  initializeGame: () => {
    const gameId = getDailyGameId();
    if (canPlayToday(gameId)) {
      set({
        currentMatch: getRandomDailyMatch(),
        stage: 'player',
        attempts: 0,
        gameStatus: 'playing'
      });
    } else {
      set({ gameStatus: 'completed' });
    }
  },

  resetForNewDay: () => {
    get().initializeGame();
    toast.success('New question available!');
  },

  handleGuess: (guess: string) => {
    set(state => {
      if (!state.currentMatch) return state;

      const currentAnswer = state.stage === 'player' 
        ? state.currentMatch.player 
        : state.currentMatch.stadium;
      const normalizedGuess = normalizeAnswer(guess);
      const normalizedAnswer = normalizeAnswer(currentAnswer);
      const isCorrect = normalizedGuess === normalizedAnswer;
      const newAttempts = state.attempts + 1;

      if (isCorrect) {
        const attemptScore = getScoreForAttempt(newAttempts);
        toast.success(`Correct! +${attemptScore} points`);
        
        if (state.stage === 'player') {
          return {
            ...state,
            stage: 'stadium',
            attempts: 0,
            score: state.score + attemptScore
          };
        } else {
          const gameId = getDailyGameId();
          const newStreak = updateStreak(true, gameId);
          return {
            ...state,
            score: state.score + attemptScore,
            streak: newStreak,
            gameStatus: 'won'
          };
        }
      }

      if (newAttempts >= 5) {
        const gameId = getDailyGameId();
        const newStreak = updateStreak(false, gameId);
        toast.error('Out of attempts!');
        return {
          ...state,
          attempts: newAttempts,
          streak: newStreak,
          gameStatus: 'lost'
        };
      }

      toast.error('Try again!');
      return {
        ...state,
        attempts: newAttempts
      };
    });
  },

  getCurrentAnswer: () => {
    const state = get();
    if (!state.currentMatch) return '';
    return state.stage === 'player' 
      ? state.currentMatch.player 
      : state.currentMatch.stadium;
  },

  getCurrentHint: () => {
    const state = get();
    if (!state.currentMatch) return '';
    const { year, score, fact } = state.currentMatch;
    return `${fact} (${year}) - Score: ${score}`;
  }
}));