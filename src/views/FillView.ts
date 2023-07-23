import { IFillView } from "../types/IViews/IFillView";
export class FillView implements IFillView {
  private $fill: HTMLElement;
  private $parent: HTMLElement;
  constructor(parent: HTMLElement) {
    this.$fill = document.createElement("div");
    this.$fill.setAttribute("class", "range-slider__fill");
    this.$parent = parent;
  }
  render(position: number | number[], width: number): void {
    this.$parent.appendChild(this.$fill);

    if (Array.isArray(position)) {
      console.log(`fillView-----------${position}`);
      this.$fill.style.marginLeft = `${position[0]}px`;
      // let width: number = position[1] - position[0];
      console.log(`------Fillwidth----${width}`);
      this.$fill.style.width = `${width}px`;
    } else {
      this.$fill.style.width = `${position}px`;
    }
  }
  getFillElement(): HTMLElement {
    return this.$fill;
  }
}
