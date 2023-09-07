import { IFillView } from "../types/IViews/IFillView";
import { Config } from "../ConfigService/Config";
import { IOptions } from "components/components";
export class FillView implements IFillView {
  private $fill!: HTMLElement;
  private $parent: HTMLElement;
  private options: IOptions;
  constructor(parent: HTMLElement) {
    this.options = Config.getInstance().getOptions();
    this.$parent = parent;
    this.$fill = document.createElement("div");
    this.init();
  }
  init(): void {
    this.$fill.setAttribute(
      "class",
      `range-slider__fill range-slider__fill--${this.options.orientation}`
    );
  }
  updateOptions(id: number): void {
    this.options = Config.getInstanceById(id).getOptions();
    console.log(this.options);
    this.init();
  }
  render(position: number | number[], width: number): void {
    if (this.options.fill) {
      this.$parent.appendChild(this.$fill);
      if (this.options.orientation === "horizontal") {
        if (Array.isArray(position)) {
          this.$fill.style.marginLeft = `${position[0]}px`;
          this.$fill.style.width = `${width}px`;
          this.$fill.style.height = `${this.options.trackHeight as number}px`;
        } else {
          if (!this.options.reversedOrder) {
            this.$fill.style.width = `${width}px`;
            this.$fill.style.height = `${this.options.trackHeight as number}px`;
          } else {
            this.$fill.style.marginLeft = `${position}px`;
            this.$fill.style.width = `${width}px`;
            this.$fill.style.height = `${this.options.trackHeight as number}px`;
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
            console.log(`+++++++filViewRender++++`);
            console.log(position);
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
