import { format, startOfWeek, addDays } from 'date-fns';

interface DailyProgress {
  gameId: string;
  completed: boolean;
  streak: number;
  lastPlayedDate: string;
  won?: boolean;
}

interface GameStats {
  gamesPlayed: number;
  winRate: number;
  currentStreak: number;
  maxStreak: number;
}

const STORAGE_KEY = 'cricket-quiz-progress';
const STATS_KEY = 'cricket-quiz-stats';
const WEEKLY_STREAK_KEY = 'cricket-quiz-weekly';

export function getDailyProgress(): DailyProgress {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    gameId: '',
    completed: false,
    streak: 0,
    lastPlayedDate: ''
  };
}

export function saveDailyProgress(progress: DailyProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  updateGameStats(progress.won || false);
  updateWeeklyStreak(progress.gameId, progress.won || false);
}

export function updateStreak(won: boolean, currentGameId: string): number {
  const progress = getDailyProgress();
  
  if (progress.lastPlayedDate === '') {
    const newStreak = won ? 1 : 0;
    saveDailyProgress({
      gameId: currentGameId,
      completed: true,
      streak: newStreak,
      lastPlayedDate: currentGameId,
      won
    });
    return newStreak;
  }

  const lastDate = new Date(progress.lastPlayedDate);
  const currentDate = new Date(currentGameId);
  const dayDifference = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

  let newStreak = progress.streak;
  
  if (dayDifference === 1 && won) {
    newStreak += 1;
  } else if (dayDifference === 1 && !won) {
    newStreak = 0;
  } else if (dayDifference > 1) {
    newStreak = won ? 1 : 0;
  }

  saveDailyProgress({
    gameId: currentGameId,
    completed: true,
    streak: newStreak,
    lastPlayedDate: currentGameId,
    won
  });

  return newStreak;
}

export function canPlayToday(currentGameId: string): boolean {
  const progress = getDailyProgress();
  return progress.gameId !== currentGameId || !progress.completed;
}

export function getGameStats(): GameStats {
  const stored = localStorage.getItem(STATS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    gamesPlayed: 0,
    winRate: 0,
    currentStreak: 0,
    maxStreak: 0
  };
}

function updateGameStats(won: boolean): void {
  const stats = getGameStats();
  const newStats = {
    gamesPlayed: stats.gamesPlayed + 1,
    winRate: Math.round((stats.winRate * stats.gamesPlayed + (won ? 100 : 0)) / (stats.gamesPlayed + 1)),
    currentStreak: won ? stats.currentStreak + 1 : 0,
    maxStreak: won ? Math.max(stats.maxStreak, stats.currentStreak + 1) : stats.maxStreak
  };
  localStorage.setItem(STATS_KEY, JSON.stringify(newStats));
}

function updateWeeklyStreak(date: string, won: boolean): void {
  const weekStart = startOfWeek(new Date(date));
  const dayIndex = Math.floor((new Date(date).getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24));
  
  const weeklyStreak = getWeeklyStreak();
  weeklyStreak[dayIndex] = won;
  
  localStorage.setItem(WEEKLY_STREAK_KEY, JSON.stringify({
    weekStart: format(weekStart, 'yyyy-MM-dd'),
    streak: weeklyStreak
  }));
}

export function getWeeklyStreak(): (boolean | undefined)[] {
  const stored = localStorage.getItem(WEEKLY_STREAK_KEY);
  if (stored) {
    const data = JSON.parse(stored);
    const storedWeekStart = new Date(data.weekStart);
    const currentWeekStart = startOfWeek(new Date());
    
    // Reset if it's a new week
    if (storedWeekStart.getTime() !== currentWeekStart.getTime()) {
      return Array(7).fill(undefined);
    }
    
    return data.streak;
  }
  return Array(7).fill(undefined);
}