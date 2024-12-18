export function normalizeAnswer(answer: string): string {
  return answer.replace(/[^A-Z]/gi, '').toUpperCase();
}