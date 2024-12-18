import React, { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import { ScoreBoard } from './components/ScoreBoard';
import { GuessInput } from './components/GuessInput';
import { GameStatus } from './components/GameStatus';
import { Hint } from './components/Hint';
import { Timer } from './components/Timer';
import { WeeklyStreak } from './components/WeeklyStreak';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SEO } from './components/SEO';
import { MapPin, User } from 'lucide-react';
import { useAnalytics } from './hooks/useAnalytics';

function GameContent() {
  const { 
    currentMatch,
    stage,
    attempts,
    score,
    streak,
    gameStatus,
    handleGuess,
    getCurrentAnswer,
    getCurrentHint,
    resetForNewDay,
    initializeGame
  } = useGameStore();

  const { trackEvent } = useAnalytics();

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (gameStatus !== 'playing') {
      trackEvent('game_completed', gameStatus);
    }
  }, [gameStatus, trackEvent]);

  if (gameStatus === 'completed') {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-white">CrickQuiz</h1>
        <p className="text-xl text-white">You've completed today's challenge!</p>
        <Timer onDayChange={resetForNewDay} />
        <WeeklyStreak />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-bold text-white">CrickQuiz</h1>
        <p className="text-gray-200 text-lg">
          {stage === 'player' 
            ? "Guess the player from this historic cricket moment!" 
            : "Now guess the stadium where it happened!"}
        </p>
      </div>

      <Timer onDayChange={resetForNewDay} />
      <ScoreBoard score={score} streak={streak} attempts={attempts} />
      <WeeklyStreak />

      {currentMatch && (
        <div className="space-y-4">
          <div className="glass-effect p-6 rounded-lg shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-white">
              {stage === 'player' ? (
                <>
                  <User className="w-6 h-6" />
                  <span className="text-lg">Team: {currentMatch.team}</span>
                </>
              ) : (
                <>
                  <MapPin className="w-6 h-6" />
                  <span className="text-lg">Location: {currentMatch.location}</span>
                </>
              )}
            </div>
          </div>

          <Hint hint={getCurrentHint()} />

          <GuessInput
            onSubmit={handleGuess}
            disabled={gameStatus !== 'playing'}
            maxLength={getCurrentAnswer().replace(/[^A-Z]/gi, '').length}
            answer={getCurrentAnswer()}
          />

          <GameStatus
            status={gameStatus}
            answer={stage === 'player' ? currentMatch.player : currentMatch.stadium}
          />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <SEO />
      <div className="min-h-screen cricket-stadium-bg">
        <div className="content-wrapper min-h-screen py-8 px-4">
          <div className="max-w-2xl mx-auto">
            <GameContent />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;