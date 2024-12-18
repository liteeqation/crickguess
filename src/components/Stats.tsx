import React from 'react';
import { Trophy, Target, Zap, Award } from 'lucide-react';
import { getGameStats } from '../utils/storageUtils';

export function Stats() {
  const stats = getGameStats();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: Trophy, label: 'Games Played', value: stats.gamesPlayed },
        { icon: Target, label: 'Win Rate', value: `${stats.winRate}%` },
        { icon: Zap, label: 'Current Streak', value: stats.currentStreak },
        { icon: Award, label: 'Max Streak', value: stats.maxStreak },
      ].map(({ icon: Icon, label, value }) => (
        <div key={label} className="glass-effect p-4 rounded-lg text-center">
          <Icon className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
          <p className="text-sm text-gray-200">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      ))}
    </div>
  );
}