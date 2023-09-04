import { ITrackView } from "../types/IViews/ITrackView";
import { Config } from "../ConfigService/Config";
import { IOptions } from "../components/components";
import { Ruler } from "../models/Ruler";

export class TrackView implements ITrackView {
  private $element: HTMLElement;
  private $track: HTMLElement;
  private options: IOptions;
  private ruler!: Ruler;
  constructor(parentElement: HTMLElement) {
    this.options = Config.getInstance().getOptions();
    this.$element = parentElement;
    this.$track = document.createElement("div");
    this.init();
  }
  init(): void {
    if (!this.ruler) {
      this.ruler = new Ruler();
    } else {
      this.ruler.updateOptions();
    }
    let orientClass: string = `range-slider__track--${this.options.orientation}`;
    this.$track.setAttribute("class", `range-slider__track ${orientClass}`);
  }
  updateOptions(): void {
    this.options = Config.getInstance().getOptions();
    this.init();
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
      this.$track.innerHTML = "";
      this.$track.appendChild(this.ruler.renderRuler(tickStep));
    }
  }

  addPositionChangeListener(listener: Function): void {
    this.$element.addEventListener("click", (e) => {
      listener(e);
    });
  }
  getRuler(): Ruler {
    return this.ruler;
  }
}
