import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { formatTimeRemaining, getNextISTMidnight } from '../utils/dateUtils';

export function Timer({ onDayChange }: { onDayChange?: () => void }) {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [lastCheck, setLastCheck] = useState<string>('');

  useEffect(() => {
    const updateTimer = () => {
      const nextMidnight = getNextISTMidnight();
      const newTimeRemaining = formatTimeRemaining(nextMidnight);
      setTimeRemaining(newTimeRemaining);

      // Check if we've crossed midnight
      const currentDate = new Date().toISOString().split('T')[0];
      if (lastCheck && lastCheck !== currentDate) {
        onDayChange?.();
      }
      setLastCheck(currentDate);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [lastCheck, onDayChange]);

  return (
    <div className="flex items-center gap-2 p-4 glass-effect rounded-lg text-white">
      <Clock className="w-5 h-5" />
      <span className="text-sm">Next question in: </span>
      <span className="font-mono font-bold">{timeRemaining}</span>
    </div>
  );
}