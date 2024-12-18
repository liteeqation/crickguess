import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Trophy } from 'lucide-react';
import { getTopScores } from '../services/firebase';

export function Leaderboard() {
  const { data: scores, isLoading, error } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => getTopScores(),
    refetchInterval: 300000 // Refetch every 5 minutes
  });

  if (isLoading) return <div className="text-white text-center">Loading leaderboard...</div>;
  if (error) return <div className="text-red-400 text-center">Error loading leaderboard</div>;

  return (
    <div className="glass-effect p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-bold text-white">Global Leaderboard</h2>
      </div>
      <div className="space-y-2">
        {scores?.map((score, index) => (
          <div key={score.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-yellow-400">#{index + 1}</span>
              <span className="text-white">{score.playerName}</span>
            </div>
            <span className="text-white font-bold">{score.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}