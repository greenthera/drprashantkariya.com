const PRACTICE_START_YEAR = 2006;

export function getYearsOfPractice(): number {
  return new Date().getFullYear() - PRACTICE_START_YEAR;
}
