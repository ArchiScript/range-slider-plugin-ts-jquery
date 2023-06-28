import { IRangeSliderView } from "../types/IViews/IRangeSliderView";
import { TrackView } from "./TrackView";
export class RangeSliderView implements IRangeSliderView {
  private $element: HTMLElement;
  private $input: HTMLElement;
  private title: HTMLElement;
  private track: TrackView;

  constructor(element: HTMLElement) {
    this.$element = element;
    this.track = new TrackView(this.$element);
    this.$input = document.createElement("div");
    this.$input.setAttribute("class", "range-slider");
    // this.$input.dataset.value = "1";
    this.title = document.createElement("h1");
  }

  render(value: number): void {
    const inner = `
    RangeSlider--${value}
    `;

    this.$element.appendChild(this.$input);
    this.title.textContent = "Range Slider";
    this.$element.prepend(this.title);
    this.$input.innerHTML = inner;
  }
  
  addValueChangeListener(listener: Function): void {
    this.$input.addEventListener("click", () => {
      console.log("clicked on input");
      listener();
    });
  }
}
