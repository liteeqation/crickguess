import React from 'react';
import { AlertCircle } from 'lucide-react';

interface HintProps {
  hint: string;
}

export function Hint({ hint }: HintProps) {
  return (
    <div className="flex items-center gap-3 p-6 glass-effect rounded-lg shadow-xl">
      <AlertCircle className="w-6 h-6 text-yellow-300" />
      <p className="text-white text-lg">{hint}</p>
    </div>
  );
}