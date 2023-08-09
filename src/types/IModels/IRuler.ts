export interface IRuler {
  getCalculatedTickStep(max: number): number;
  isFirstDigitPlain(num: number): boolean;
  getValidMultipliers(max: number): number[];
  isValidPartition(tickStep: number, max: number): boolean;
  getFavorableTickStep(validTicksSteps: number[], max: number): number;
  getValidTickStepsArr(tickStep: number, max: number): number[];
  removeTrailingZeros(number: number): { num: number; grade: number };
}
