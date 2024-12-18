export interface HistoricalMatch {
  stadium: string;
  location: string;
  team: string;
  player: string;
  year: number;
  month: string;
  score: string | number;
  fact: string;
}

export interface QuizState {
  currentMatch: HistoricalMatch | null;
  stage: 'player' | 'stadium';
  attempts: number;
  score: number;
  streak: number;
  gameStatus: 'playing' | 'won' | 'lost' | 'completed';
}

export interface DailyProgress {
  gameId: string;
  completed: boolean;
  streak: number;
  lastPlayedDate: string;
}