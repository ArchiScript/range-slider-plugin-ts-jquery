import { IRangeSliderView } from "../types/IViews/IRangeSliderView";
import { TrackView } from "./TrackView";
import { ThumbView } from "./ThumbView";
import { FillView } from "./FillView";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { ConfigService } from "../ConfigService/ConfigService";
import { Config } from "../ConfigService/Config";
export class RangeSliderView implements IRangeSliderView {
  private $container: HTMLElement;
  private $element: HTMLElement;
  private $title: HTMLElement;
  private $trackView: TrackView;

  // private $thumbViews: ThumbView | ThumbView[];
  private $thumbView: ThumbView | ThumbView[];
  private $trackElement: HTMLElement;
  private $fillView: FillView;
  private $fillElement: HTMLElement;
  private options: IOptions = Config.getInstance().getOptions();

  constructor(container: HTMLElement) {
    this.$container = container;
    console.log(`containerWidth: ${getComputedStyle(this.$container).width}`);
    this.$element = document.createElement("div");
    this.$element.setAttribute("class", "range-slider");
    this.$trackView = new TrackView(this.$element);
    this.$trackElement = this.$trackView.getTrackElement();
    this.$thumbView = this.getThumbViews();
    // this.$thumbViews = this.getThumbViews();
    this.$fillView = new FillView(this.$trackElement);
    this.$fillElement = this.$fillView.getFillElement();
    this.$title = document.createElement("h1");
    this.test();
  }

  getThumbViews(): ThumbView | ThumbView[] {
    if (!this.options.doublePoint) {
      return new ThumbView(this.$element) as ThumbView;
    } else {
      let thumbs = [];
      for (let i = 1; i <= 2; i++) {
        thumbs.push(new ThumbView(this.$element));
      }
      return thumbs as ThumbView[];
    }
  }
  test(): void {
    console.log(this.getThumbViews());
  }
  render(value: number | number[]): void {
    let valueStr: string = value.toString();

    const inner = `
    RangeSlider--${valueStr}
    `;
    this.$container.appendChild(this.$element);
    this.$title.textContent = "Range Slider";
    this.$container.prepend(this.$title);
    this.$element.textContent = inner;
    this.$element.appendChild(this.$trackElement);
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
    this.$element.addEventListener("click", () => {
      listener();
    });
  }
  getContainerWidth(): number {
    return parseInt(getComputedStyle(this.$container).width);
  }
}
