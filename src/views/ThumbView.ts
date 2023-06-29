import { IThumbView } from "../types/IViews/IThumbView";

export class ThumbView implements IThumbView {
  private $element: HTMLElement;
  private $parent: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.$element = document.createElement("div");
    this.$element.setAttribute("class", "range-slider__thumb");
    this.$parent = parentElement;
    this.$parent.appendChild(this.$element);
  }

  render(value: number): void {
    this.$element.style.left = `${value}px`;
  }

  addValueChangeListener(listener: Function): void {
    this.$element.addEventListener("click", () => {
      listener();
    });
  }

  getThumbElement(): HTMLElement {
    return this.$element;
  }
}
