import { Config } from "../ConfigService/Config";
import { IOptions } from "../components/components";
import { IRuler } from "../types/IModels/IRuler";
export class Ruler implements IRuler {
  private options: IOptions = Config.getInstance().getOptions();
  private max: number;
  constructor() {
    this.max = this.options.max as number;
  }
  getCalculatedTickStep(max: number): number {
    let tickStep: number = 1;

    const significantNum = this.removeTrailingZeros(max).num;

    if (this.isValidPartition(max / significantNum, max)) {
      return (tickStep = max / significantNum);
    } else {
      const validTicksSteps: number[] = this.getValidTickStepsArr(max);
      tickStep = this.getFavorableTickStep(validTicksSteps, max);
      return tickStep;
    }
  }
  isFirstDigitPlain(num: number): boolean {
    return this.removeTrailingZeros(num).num / 10 < 1;
  }

  getValidMultipliers(max: number): number[] {
    const multipliers: number[] = [];
    const sqrtMax = Math.sqrt(max);
    for (let i = 1; i <= sqrtMax; i++) {
      if (max % i === 0) {
        multipliers.push(i);
        if (i !== max / i && i !== 1) {
          multipliers.push(max / i);
        }
      }
    }
    return multipliers.sort((a, b) => a - b);
  }

  isValidPartition(tickStep: number, max: number): boolean {
    const partitions = max / tickStep;
    const result = partitions <= 20 && partitions >= 6 && max % tickStep == 0;
    return result;
  }

  getFavorableTickStep(validTicksSteps: number[], max: number): number {
    let result: number = 0;
    for (let tick of validTicksSteps) {
      if (this.isFirstDigitPlain(tick)) {
        result = tick;
      }
    }
    result = result
      ? result
      : validTicksSteps.filter((num) => max / num == 10)[0] ??
        validTicksSteps[0];
    return result;
  }

  getValidTickStepsArr(max: number): number[] {
    const tickStep: number = 1;
    const validTicksSteps: number[] = [];
    const magnitudes = this.getValidMultipliers(max);

    for (const magnitude of magnitudes) {
      const newTickStep = tickStep * magnitude;

      if (this.isValidPartition(newTickStep, max)) {
        validTicksSteps.push(newTickStep);
      }
    }
    return validTicksSteps;
  }

  removeTrailingZeros(num: number): { num: number; grade: number } {
    let grade: number = 0;
    if (num === 0) return { num: 0, grade: 0 };
    while (num % 10 === 0 && num !== 0) {
      grade++;
      num /= 10;
    }
    return {
      num: num,
      grade: grade
    };
  }
}
