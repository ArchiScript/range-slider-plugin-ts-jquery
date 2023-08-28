import { ITrackView } from "../types/IViews/ITrackView";
import { Config } from "../ConfigService/Config";
import { IOptions } from "../components/components";

export class TrackView implements ITrackView {
  private $element: HTMLElement;
  private $track: HTMLElement;
  private options: IOptions = Config.getInstance().getOptions();

  constructor(parentElement: HTMLElement) {
    this.$element = parentElement;
    this.$track = document.createElement("div");
    let orientClass: string = `range-slider__track--${this.options.orientation}`;

    this.$track.setAttribute("class", `range-slider__track ${orientClass}`);
  }
  getTrackElement(): HTMLElement {
    return this.$track;
  }

  render(width: number, height: number, tickStep: number): void {
    this.$element.appendChild(this.$track);

    if (this.options.orientation === "horizontal") {
      this.$track.style.width = `${width}%`;
      this.$track.style.height = `${height}px`;
    } else {
      this.$track.style.width = `${width}px`;
      this.$track.style.height = `${this.options.containerHeight}px`;
    }

    this.$track.style.setProperty(
      "--track-color",
      `${this.options.trackColor}`
    );

    if (this.options.ticks) {
      this.$track.appendChild(this.getRuler(tickStep));
    }
  }
  getRuler(tickStep: number): HTMLElement {
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
    tick.appendChild(tickBar);
    tick.appendChild(tickNumber);
    tickNumber.innerHTML = i.toString();
    tick.style.setProperty("--tick-color", `${this.options.rulerColor}`);

    return tick;
  }
  addPositionChangeListener(listener: Function): void {
    this.$element.addEventListener("click", (e) => {
      listener(e);
    });
  }
}
