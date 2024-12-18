import React from 'react';
import { Crown, Palette, ChartBar } from 'lucide-react';

export function PremiumFeatures() {
  return (
    <div className="glass-effect p-6 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Crown className="w-6 h-6 text-yellow-400" />
        Premium Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-white/5">
          <Palette className="w-6 h-6 text-purple-400 mb-2" />
          <h3 className="text-lg font-semibold text-white mb-2">Custom Themes</h3>
          <p className="text-gray-300">Personalize your game experience with custom themes</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5">
          <ChartBar className="w-6 h-6 text-blue-400 mb-2" />
          <h3 className="text-lg font-semibold text-white mb-2">Advanced Stats</h3>
          <p className="text-gray-300">Detailed performance analytics and insights</p>
        </div>
      </div>
      <button className="mt-4 w-full py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors">
        Upgrade to Premium
      </button>
    </div>
  );
}