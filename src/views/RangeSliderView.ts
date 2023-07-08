import { IRangeSliderView } from "../types/IViews/IRangeSliderView";
import { TrackView } from "./TrackView";
import { ThumbView } from "./ThumbView";
export class RangeSliderView implements IRangeSliderView {
  private $container: HTMLElement;
  private $element: HTMLElement;
  private $title: HTMLElement;
  private $trackView: TrackView;
  private $thumbView: ThumbView;
  private $trackElement: HTMLElement;

  constructor(container: HTMLElement) {
    this.$container = container;
    console.log(`containerWidth: ${getComputedStyle(this.$container).width}`);
    this.$element = document.createElement("div");
    this.$element.setAttribute("class", "range-slider");
    this.$trackView = new TrackView(this.$element);
    this.$trackElement = this.$trackView.getTrackElement();
    this.$thumbView = new ThumbView(this.$element);
    this.$title = document.createElement("h1");
  }

  render(value: number): void {
    const inner = `
    RangeSlider--${value}
    `;

    this.$container.appendChild(this.$element);
    this.$title.textContent = "Range Slider";
    this.$container.prepend(this.$title);
    this.$element.textContent = inner;
    this.$element.appendChild(this.$trackElement);

    this.$trackElement.appendChild(this.$thumbView.getThumbElement());
  }
  getTrackView(): TrackView {
    return this.$trackView;
  }
  getThumbView(): ThumbView {
    return this.$thumbView;
  }
  addValueChangeListener(listener: Function): void {
    this.$element.addEventListener("click", () => {
      console.log("clicked on input");
      listener();
    });
  }
  getContainerWidth(): number {
    return parseInt(getComputedStyle(this.$container).width);
  }
}
