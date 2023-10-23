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
    this.init();
  }
  init(): void {
    this.$fill = document.createElement("div");
    this.$fill.setAttribute(
      "class",
      `range-slider__fill range-slider__fill--${this.options.orientation}`
    );
  }
  updateOptions(id: number): void {
    this.options = Config.getInstanceById(id).getOptions();
    if (this.$fill) {
      this.init();
    }
  }
  render(position: number | number[], width: number): void {
    if (this.options.fill && this.$fill) {
      this.$parent.appendChild(this.$fill);

      if (this.options.thumbAnimation) {
        this.applyFillAnimatingStyle(this.$fill);
      } else {
        this.fillAnimationOff(this.$fill);
      }

      requestAnimationFrame(() => {
        if (this.options.orientation === "horizontal") {
          this.renderHorizontal(position, width);
        } else {
          this.renderVertical(position, width);
        }

        this.$fill!.style.setProperty(
          "--fill-color",
          `${this.options.fillColor}`
        );
      });
    }
  }

  private renderHorizontal(position: number | number[], width: number): void {
    this.$fill!.style.marginTop = "0";

    if (Array.isArray(position)) {
      this.$fill!.style.marginLeft = `${position[0]}px`;
      this.$fill!.style.width = `${width}px`;
      this.$fill!.style.height = `${this.options.trackHeight as number}px`;
    } else {
      if (!this.options.reversedOrder) {
        this.$fill!.style.marginLeft = `0`;
        this.$fill!.style.width = `${width}px`;
        this.$fill!.style.height = `${this.options.trackHeight as number}px`;
      } else {
        this.$fill!.style.marginLeft = `${position}px`;
        this.$fill!.style.width = `${width}px`;
        this.$fill!.style.height = `${this.options.trackHeight as number}px`;
      }
    }
  }

  private renderVertical(position: number | number[], width: number): void {
    if (Array.isArray(position)) {
      this.$fill!.style.marginLeft = `0`;
      this.$fill!.style.marginTop = `${position[0]}px`;
      this.$fill!.style.height = `${width}px`;
      this.$fill!.style.width = `${this.options.trackHeight as number}px`;
    } else {
      if (!this.options.reversedOrder) {
        this.$fill!.style.marginLeft = `0`;
        this.$fill!.style.marginTop = `0`;
        this.$fill!.style.height = `${width}px`;
        this.$fill!.style.width = `${this.options.trackHeight as number}px`;
      } else {
        this.$fill!.style.marginTop = `${position}px`;
        this.$fill!.style.marginLeft = `0`;
        this.$fill!.style.height = `${width}px`;
        this.$fill!.style.width = `${this.options.trackHeight as number}px`;
      }
    }
  }

  private applyFillAnimatingStyle(fill: HTMLElement): void {
    fill.style.transition = "all 0.4s";
  }
  private fillAnimationOff(fill: HTMLElement): void {
    fill.style.transition = "none";
  }
  getFillElement(): HTMLElement {
    return this.$fill;
  }
}
