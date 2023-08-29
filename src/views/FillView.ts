import { IFillView } from "../types/IViews/IFillView";
import { Config } from "../ConfigService/Config";
import { IOptions } from "components/components";
export class FillView implements IFillView {
  private $fill: HTMLElement;
  private $parent: HTMLElement;
  private options: IOptions;
  constructor(parent: HTMLElement) {
    this.options = Config.getInstance().getOptions();
    this.$fill = document.createElement("div");
    this.$fill.setAttribute(
      "class",
      `range-slider__fill range-slider__fill--${this.options.orientation}`
    );
    this.$parent = parent;
  }
  render(position: number | number[], width: number): void {
    if (this.options.fill) {
      this.$parent.appendChild(this.$fill);
      if (this.options.orientation === "horizontal") {
        if (Array.isArray(position)) {
          this.$fill.style.marginLeft = `${position[0]}px`;
          this.$fill.style.width = `${width}px`;
        } else {
          if (!this.options.reversedOrder) {
            this.$fill.style.width = `${width}px`;
          } else {
            this.$fill.style.marginLeft = `${position}px`;
            this.$fill.style.width = `${width}px`;
          }
        }
      } else {
        if (Array.isArray(position)) {
          this.$fill.style.marginTop = `${position[0]}px`;
          this.$fill.style.height = `${width}px`;
        } else {
          if (!this.options.reversedOrder) {
            this.$fill.style.height = `${width}px`;
          } else {
            this.$fill.style.marginTop = `${position}px`;
            this.$fill.style.height = `${width}px`;
          }
        }
      }
    }
    this.$fill.style.setProperty("--fill-color", `${this.options.fillColor}`);
  }

  getFillElement(): HTMLElement {
    return this.$fill;
  }
}
