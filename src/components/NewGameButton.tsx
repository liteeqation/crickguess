import React from 'react';
import { RotateCw } from 'lucide-react';

interface NewGameButtonProps {
  onClick: () => void;
}

export function NewGameButton({ onClick }: NewGameButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-8 py-3 bg-green-500 text-white rounded-lg 
                 hover:bg-green-600 transition-colors shadow-xl text-lg font-medium
                 glass-effect border border-green-400"
    >
      <RotateCw className="w-6 h-6" />
      New Game
    </button>
  );
}