import { format, addDays } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

const IST_TIMEZONE = 'Asia/Kolkata';

export function getISTDate(): Date {
  return utcToZonedTime(new Date(), IST_TIMEZONE);
}

export function getNextISTMidnight(): Date {
  const currentIST = getISTDate();
  const nextDay = addDays(currentIST, 1);
  return zonedTimeToUtc(
    new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate(), 0, 0, 0),
    IST_TIMEZONE
  );
}

export function formatTimeRemaining(targetDate: Date): string {
  const now = getISTDate();
  const diff = targetDate.getTime() - now.getTime();
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function getDailyGameId(): string {
  const today = getISTDate();
  return format(today, 'yyyy-MM-dd');
}