import { Config } from "../ConfigService/Config";
import { IOptions } from "../components/components";
import { IRuler } from "../types/IModels/IRuler";

export class Ruler implements IRuler {
  private options: IOptions;
  private max!: number;
  private min!: number;
  private maxTicks: number;
  private tickStep!: number;
  private tickFontSize: number;
  private static id: number = 0;
  private id: number;
  private thumbSize: number;
  constructor() {
    Ruler.id++;
    this.id = Ruler.id;
    this.options = Config.getInstance().getOptions();
    this.thumbSize = this.options.thumbSize as number;
    this.tickFontSize = this.options.tickFontSize as number;
    this.maxTicks =
      this.options.orientation === "horizontal"
        ? (this.options.maxTicks as number)
        : (this.options.maxTicks as number);
    this.init();
  }

  init() {
    this.max = this.options.max as number;
    this.min = this.options.min as number;
    this.thumbSize = this.options.thumbSize as number;
    this.tickStep = this.options.tickStep
      ? this.options.tickStep
      : this.getCalculatedTickStep();
    this.renderRuler();
    console.log(`min ---- ${this.min}`);
    console.log(this.tickStep);
  }
  setMaxTicks(max: number): void {
    this.maxTicks = max;
  }
  updateOptions(id: number): void {
    this.options = Config.getInstanceById(id).getOptions();
    this.init();

    this.tickFontSize = (this.options.tickFontSize as number) ?? 11;
    this.maxTicks =
      this.options.orientation === "horizontal"
        ? (this.options.maxTicks as number) ?? 10
        : (this.options.maxTicks as number) ?? 20;
  }
  setMax(max: number): void {
    this.max = max;
  }
  getCalculatedTickStep(): number {
    let tickStep: number = 1;
    const significantNum = this.removeTrailingZeros(this.max).num;
    const significantNumTickstep = this.max / significantNum;

    if (
      this.isValidPartition(significantNumTickstep, this.max) &&
      this.min == 0
    ) {
      tickStep = significantNumTickstep;
    } else {
      const validTicksSteps: number[] = this.getValidTickStepsArr(this.max);
      tickStep = this.getFavorableTickStep(validTicksSteps, this.max);
    }

    return tickStep;
  }
  isFirstDigitPlain(num: number): boolean {
    return this.removeTrailingZeros(num).num / 10 < 1;
  }

  getValidMultipliers(max: number): number[] {
    const multipliers: number[] = [];
    const sqrtMax = Math.sqrt(max);

    for (let i = 1; i <= sqrtMax; i++) {
      if (this.max % i === 0) {
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
    const result =
      partitions <= this.maxTicks && partitions >= 6 && max % tickStep == 0;
    return result;
  }

  getFavorableTickStep(validTicksSteps: number[], max: number): number {
    let result: number | undefined = undefined;
    let isMinTickStep: boolean = false;

    for (const tick of validTicksSteps) {
      if (tick === this.min) {
        isMinTickStep = true;
        result = tick;
        break;
      }
    }
    if (!isMinTickStep) {
      for (const tick of validTicksSteps) {
        if (this.isFirstDigitPlain(tick)) {
          result = tick;
          break;
        }
      }
    }

    if (result === undefined) {
      result = validTicksSteps.find((num) => max / num === 10);
    }

    return (
      result ?? validTicksSteps[Math.round(validTicksSteps.length) / 2 - 1]
    );
  }

  getValidTickStepsArr(max: number): number[] {
    const tickStep: number = 1;
    let validTicksSteps: number[] = [];
    const magnitudes = this.getValidMultipliers(max);

    for (const magnitude of magnitudes) {
      const newTickStep = tickStep * magnitude;

      if (this.isValidPartition(newTickStep, max)) {
        validTicksSteps.push(newTickStep);
      }
    }
    validTicksSteps = validTicksSteps.filter((t) => t >= this.min);
    console.log(validTicksSteps);
    console.log(this.options.instanceId);
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

  validateIfTickStepMismatch(num: number): number {
    let result: number | undefined;
    let diff: number;
    if (num > this.min && num - this.tickStep < this.min) {
      diff = this.tickStep - this.min;
      result = diff;
    } else if (num < this.max && num + this.tickStep > this.max) {
      diff = num + this.tickStep - this.max;
      result = this.tickStep - diff;
    }
    return result ?? this.tickStep;
  }
  renderRuler(): HTMLElement {
    let $ruler = document.createElement("div");

    console.log(`tickstep ------${this.tickStep}`);
    $ruler.setAttribute(
      "class",
      `range-slider__ruler range-slider__ruler--${this.options.orientation} `
    );
    let rulerPadding = this.options.thumbSize! / 2;
    if (this.options.orientation === "horizontal") {
      $ruler.style.width = `100%`;

      $ruler.style.paddingLeft = `${rulerPadding}px`;
      $ruler.style.paddingRight = `${rulerPadding}px`;
    } else {
      $ruler.style.height = `100%`;
      $ruler.style.paddingTop = `${rulerPadding}px`;
      $ruler.style.paddingBottom = `${rulerPadding}px`;
    }

    let i: number, max: number;

    let $rulerTicks = document.createElement("div");
    $rulerTicks.setAttribute("class", "range-slider__ruler-ticks");

    if (!this.options.reversedOrder) {
      i = this.options.min as number;
      max = this.options.max as number;

      while (i <= max) {
        let tick = this.renderEachTick(i);
        $rulerTicks.appendChild(tick);
        console.log(this.validateIfTickStepMismatch(i));
        // i += this.tickStep;
        i += this.validateIfTickStepMismatch(i);
        console.log(i);
      }
    } else {
      i = this.options.max as number;
      let min = this.options.min as number;
      while (i >= min) {
        let tick = this.renderEachTick(i);
        $rulerTicks.appendChild(tick);
        console.log(this.validateIfTickStepMismatch(i));
        // i -= this.tickStep;
        i -= this.validateIfTickStepMismatch(i);

        console.log(i);
      }
    }
    $ruler.appendChild($rulerTicks);
    return $ruler;
  }
  private getRulerProportion(): number {
    return this.options.orientation === "horizontal"
      ? (this.options.containerWidth as number) / (this.max - this.min)
      : (this.options.pluginHeight as number) / (this.max - this.min);
  }

  private getEachTickPercentPos(num: number): number {
    return (
      (this.getEachTickPixelPos(num) /
        ((this.max - this.min) * this.getRulerProportion())) *
      100
    );
  }
  private getEachTickPixelPos(num: number): number {
    const currentProportion = this.getRulerProportion();
    return num * currentProportion - this.min * currentProportion;
  }
  private setEachTickStyle(i: number, tick: HTMLElement): void {
    //
    tick.style.position = "absolute";
    if (!this.options.reversedOrder) {
      if (this.options.orientation == "horizontal") {
        tick.style.left = `${this.getEachTickPercentPos(i)}%`;
      } else {
        tick.style.top = `${this.getEachTickPercentPos(i)}%`;
      }
    } else {
      if (this.options.orientation == "horizontal") {
        tick.style.right = `${this.getEachTickPercentPos(i)}%`;
      } else {
        tick.style.bottom = `${this.getEachTickPercentPos(i)}%`;
      }
    }
  }
  renderEachTick(i: number): HTMLElement {
    let tick = document.createElement("div");
    tick.setAttribute(
      "class",
      `range-slider__tick range-slider__tick--${this.options.orientation}`
    );

    this.setEachTickStyle(i, tick);

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
    tickNumber.style.fontSize = `${this.tickFontSize}px`;
    if (this.options.tickBar) {
      tick.appendChild(tickBar);
    }

    tick.appendChild(tickNumber);
    tickNumber.innerHTML = i.toString();
    tick.style.setProperty("--tick-color", `${this.options.rulerColor}`);

    return tick;
  }
}
