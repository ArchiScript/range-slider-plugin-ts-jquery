import { Config } from "../ConfigService/Config";
import { IOptions } from "../components/components";
import { IRuler } from "../types/IModels/IRuler";
export class Ruler implements IRuler {
  private options: IOptions;
  private max: number;
  constructor() {
    this.options = Config.getInstance().getOptions();
    this.max = this.options.max as number;
  }

  updateOptions(id: number): void {
    this.options = Config.getInstanceById(id).getOptions();
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
  renderRuler(tickStep: number): HTMLElement {
    let $ruler = document.createElement("div");
    $ruler.setAttribute(
      "class",
      `range-slider__ruler range-slider__ruler--${this.options.orientation} `
    );
    if (this.options.orientation === "horizontal") {
      $ruler.style.width = `100%`;
    } else {
      $ruler.style.height = `100%`;
    }

    let rulerPadding = this.options.thumbSize! / 2;
    $ruler.style.paddingLeft = `${rulerPadding}px`;
    $ruler.style.paddingRight = `${rulerPadding}px`;
    let i: number, max: number;
    if (!this.options.reversedOrder) {
      i = 0;
      max = this.options.max as number;

      while (i <= max) {
        let tick = this.renderEachTick(i);
        $ruler.appendChild(tick);
        i += tickStep;
      }
    } else {
      i = this.options.max as number;
      let min = this.options.min as number;
      while (i >= min) {
        let tick = this.renderEachTick(i);
        $ruler.appendChild(tick);
        i -= tickStep;
      }
    }

    return $ruler;
  }

  renderEachTick(i: number): HTMLElement {
    let tick = document.createElement("div");
    tick.setAttribute(
      "class",
      `range-slider__tick range-slider__tick--${this.options.orientation}`
    );

    let tickBar = document.createElement("div");
    tickBar.setAttribute(
      "class",
      `range-slider__tick-bar range-slider__tick-bar--${this.options.orientation}`
    );
    let tickNumber = document.createElement("div");
    tickNumber.setAttribute(
      "class",
      `range-slider__tick-number range-slider__tick-number--${this.options.orientation}`
    );
    if (this.options.tickBar) {
      tick.appendChild(tickBar);
    }

    tick.appendChild(tickNumber);
    tickNumber.innerHTML = i.toString();
    tick.style.setProperty("--tick-color", `${this.options.rulerColor}`);

    return tick;
  }
}
