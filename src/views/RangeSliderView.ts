// import * as $ from "jquery";
import { IRangeSliderView } from "../types/IRangeSliderView";
class RangeView implements IRangeSliderView {
  private $input: HTMLElement | null;
  // private $container: HTMLElement | null;

  constructor(private $element: HTMLElement) {
    // this.$input = $element.querySelector(".range-slider__input");
    // this.setup();
    this.$input = document.createElement("div");
  }
  // setup() {
  //   this.$container = document.querySelector(this.$container);
  // }
  render(value: number | null): void {
    if (this.$input) {
      this.$input.dataset.value = value !== null ? value.toString() : "";
    }
  }

  addValueChangeListener(listener: Function): void {
    this.$input?.addEventListener("input", () => {
      if (this.$input) {
        listener(this.$input.dataset.value);
      }
    });
  }
}
