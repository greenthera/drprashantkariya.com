const PRACTICE_START_YEAR = 2011;

export function getYearsOfPractice(): number {
  return new Date().getFullYear() - PRACTICE_START_YEAR;
}
