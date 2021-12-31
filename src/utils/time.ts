export function lessThan(date: number, seconds: number) {
  const anHourAgo = Date.now() - seconds;

  return date > anHourAgo;
}
