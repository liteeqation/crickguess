import React from 'react';
import { Share2 } from 'lucide-react';
import { formatGameResult } from '../utils/shareUtils';

interface ShareButtonProps {
  score: number;
  attempts: number;
  gameStatus: 'playing' | 'won' | 'lost' | 'completed';
}

export function ShareButton({ score, attempts, gameStatus }: ShareButtonProps) {
  if (gameStatus === 'playing') return null;

  const handleShare = async () => {
    const result = formatGameResult(score, attempts, gameStatus);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CrickQuiz Result',
          text: result,
          url: window.location.href,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    } else {
      await navigator.clipboard.writeText(result);
      // TODO: Show toast notification
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg 
                 hover:bg-green-700 transition-colors glass-effect"
    >
      <Share2 className="w-5 h-5" />
      Share Result
    </button>
  );
}