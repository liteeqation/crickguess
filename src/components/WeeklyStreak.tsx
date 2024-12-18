import React from 'react';
import { Star } from 'lucide-react';
import { getWeeklyStreak } from '../utils/storageUtils';

export function WeeklyStreak() {
  const weeklyStreak = getWeeklyStreak();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="glass-effect p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-3">Weekly Progress</h3>
      <div className="flex justify-between items-center">
        {days.map((day, index) => {
          const streak = weeklyStreak[index];
          return (
            <div key={day} className="flex flex-col items-center gap-2">
              <Star 
                className={`w-6 h-6 ${
                  streak === undefined ? 'text-gray-500' : 
                  streak ? 'text-green-500' : 'text-gray-500'
                } ${streak === undefined ? 'opacity-50' : 'opacity-100'}`}
                fill={streak ? 'currentColor' : 'none'}
              />
              <span className="text-xs text-gray-300">{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}