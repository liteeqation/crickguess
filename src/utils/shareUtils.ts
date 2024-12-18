export function formatGameResult(score: number, attempts: number, gameStatus: string): string {
  const emoji = gameStatus === 'won' ? '🏏' : '💔';
  const attemptsText = gameStatus === 'won' ? `${attempts}/5` : 'X/5';
  
  return `CrickQuiz ${new Date().toLocaleDateString()} ${emoji}\n\n` +
         `Score: ${score} 🎯\n` +
         `Attempts: ${attemptsText}\n\n` +
         `Play at: ${window.location.origin}`;
}