import { IRangeSliderView } from "../types/IViews/IRangeSliderView";
import { TrackView } from "./TrackView";
import { ThumbView } from "./ThumbView";
import { FillView } from "./FillView";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { Config } from "../ConfigService/Config";
export class RangeSliderView implements IRangeSliderView {
  private $container: HTMLElement;
  private $pluginElement: HTMLElement;
  private $title: HTMLElement;
  private $trackView!: TrackView;
  private $label: HTMLElement;
  private $thumbView!: ThumbView | ThumbView[];
  private $trackElement!: HTMLElement;
  private $fillView!: FillView;
  private $fillElement!: HTMLElement;
  private options: IOptions;

  constructor(container: HTMLElement) {
    this.options = Config.getInstance().getOptions();
    this.$container = container;
    this.$pluginElement = document.createElement("div");
    this.$label = document.createElement("div");
    this.$title = document.createElement("h1");
    this.init();
  }
  init(): void {
    let classStr: string = `range-slider--${this.options.orientation}`;
    this.$pluginElement.setAttribute("class", `range-slider ${classStr}`);
    this.$label.setAttribute("class", "range-slider__label");
    if (!this.$thumbView) {
      this.$trackView = new TrackView(this.$pluginElement);
      this.$trackElement = this.$trackView.getTrackElement();
    }

    if (!this.$thumbView) {
      this.$thumbView = this.getThumbViews();
    }
    if (!this.$fillView) {
      this.$fillView = new FillView(this.$trackElement);
      this.$fillElement = this.$fillView.getFillElement();
    }
  }
  updateOptions(): void {
    this.options = Config.getInstance().getOptions();
    this.init();
  }
  getThumbViews(): ThumbView | ThumbView[] {
    if (!this.options.doublePoint) {
      return new ThumbView(this.$pluginElement) as ThumbView;
    } else {
      let thumbs = [];
      for (let i = 1; i <= 2; i++) {
        thumbs.push(new ThumbView(this.$pluginElement));
      }
      return thumbs as ThumbView[];
    }
  }

  render(value: number | number[]): void {
    let valueStr: string = value.toString();

    const inner = `
    RangeSlider--${valueStr}
    `;

    this.$label.textContent = inner;
    this.$container.appendChild(this.$label);
    this.$container.appendChild(this.$pluginElement);
    this.$pluginElement.appendChild(this.$trackElement);
    if (this.$thumbView instanceof ThumbView) {
      this.$trackElement.appendChild(this.$thumbView.getThumbElement());
    } else {
      this.$thumbView.forEach((view) =>
        this.$trackElement.appendChild(view.getThumbElement())
      );
    }
  }
  getTrackView(): TrackView {
    return this.$trackView;
  }
  getThumbView(): ThumbView | ThumbView[] {
    if (this.$thumbView instanceof ThumbView) {
      return this.$thumbView as ThumbView;
    } else {
      return this.$thumbView as ThumbView[];
    }
  }
  getFillView(): FillView {
    return this.$fillView;
  }
  addValueChangeListener(listener: Function): void {
    this.$pluginElement.addEventListener("click", () => {
      listener();
    });
  }
  getContainerWidth(): number {
    return parseInt(getComputedStyle(this.$container).width);
  }
}
