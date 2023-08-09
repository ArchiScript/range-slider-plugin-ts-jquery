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
    this.$track.setAttribute("class", "range-slider__track");
  }
  getTrackElement(): HTMLElement {
    return this.$track;
  }

  render(width: number, height: number, tickStep: number): void {
    this.$element.appendChild(this.$track);
    this.$track.style.width = `${width}%`;
    this.$track.style.height = `${height}px`;
    if (this.options.ticks) {
      this.$track.appendChild(this.getRuler(tickStep));
    }
  }
  getRuler(tickStep: number): HTMLElement {
    let $ruler = document.createElement("div");
    $ruler.setAttribute("class", "range-slider__ruler");
    $ruler.style.width = `100%`;
    let rulerPadding = this.options.thumbSize! / 2;
    $ruler.style.paddingLeft = `${rulerPadding}px`;
    $ruler.style.paddingRight = `${rulerPadding}px`;
    let i: number = 0,
      max: number = this.options.max as number;

    while (i <= max) {
      let tick = document.createElement("div");
      tick.setAttribute("class", "range-slider__tick");
      let tickBar = document.createElement("div");
      tickBar.setAttribute("class", "range-slider__tick-bar");
      let tickNumber = document.createElement("div");
      tickNumber.setAttribute("class", "range-slider__tick-number");
      tick.appendChild(tickBar);
      tick.appendChild(tickNumber);
      $ruler.appendChild(tick);
      tickNumber.innerHTML = i.toString();
      i += tickStep;
    }
    return $ruler;
  }
  addPositionChangeListener(listener: Function): void {
    this.$element.addEventListener("click", (e) => {
      listener(e);
    });
  }
}
