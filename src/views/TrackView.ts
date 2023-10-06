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
    if (!this.ruler && this.options.ticks) {
      this.ruler = new Ruler();
    } else {
      this.ruler.updateOptions(this.options.instanceId as number);
    }
    let orientClass: string = `range-slider__track--${this.options.orientation}`;
    this.$track.setAttribute("class", `range-slider__track ${orientClass}`);
  }

  updateOptions(id: number): void {
    this.options = Config.getInstanceById(id).getOptions();
    console.log(this.options);
    this.init();
  }
  getTrackElement(): HTMLElement {
    return this.$track;
  }

  render(width: number, height: number, tickStep: number): void {
    this.$element.appendChild(this.$track);

    // if (this.options.orientation === "horizontal") {
    //   this.$track.style.width = `${width}%`;
    //   this.$track.style.height = `${height}px`;
    // } else {
    //   this.$track.style.width = `${width}px`;
    //   this.$track.style.height = `${this.options.containerHeight}px`;
    // }

    if (this.options.orientation === "horizontal") {
      this.$track.style.width = `${this.options.containerWidth}px`;
      this.$track.style.height = `${this.options.trackHeight}px`;
    } else {
      this.$track.style.width = `${this.options.trackHeight}px`;
      this.$track.style.height = `${this.options.containerHeight}px`;
    }

    this.$track.style.setProperty(
      "--track-color",
      `${this.options.trackColor}`
    );
    console.log(this.options.ticks);
    if (this.options.ticks) {
      this.$track.innerHTML = "";
      this.$track.appendChild(this.ruler.renderRuler(tickStep));
    } else {
      this.$track.innerHTML = "";
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
