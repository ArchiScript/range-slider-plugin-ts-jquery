import { IFillView } from "../types/IViews/IFillView";
export class FillView implements IFillView {
  private $fill: HTMLElement;
  private $parent: HTMLElement;
  constructor(parent: HTMLElement) {
    this.$fill = document.createElement("div");
    this.$fill.setAttribute("class", "range-slider__fill");
    this.$parent = parent;
  }
  render(value: number | number[]): void {
    this.$parent.appendChild(this.$fill);

    if (Array.isArray(value)) {
      console.log(`fillView-----------${value}`);
      this.$fill.style.marginLeft = `${value[0]}px`;
      let width = value[1] - value[0];
      this.$fill.style.width = `${width}px`;
    } else {
      this.$fill.style.width = `${value}px`;
    }
  }
  getFillElement(): HTMLElement {
    return this.$fill;
  }
}
