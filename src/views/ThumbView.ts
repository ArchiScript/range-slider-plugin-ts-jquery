import { IThumbView } from "../types/IViews/IThumbView";
import { IOptions } from "../components/components";
import { Config } from "../components/components";
export class ThumbView implements IThumbView {
  private $thumb: HTMLElement;
  private $parent: HTMLElement;
  private $tooltip: HTMLElement;
  public static id: number = 0;
  private id: number;
  // private localId: number;

  public isActive: boolean = false;
  private options: IOptions = Config.getInstance().getOptions();

  constructor(parentElement: HTMLElement) {
    ThumbView.id++;
    if (ThumbView.id > 2) {
      ThumbView.id = 1;
    }
    this.id = ThumbView.id;
    this.$thumb = document.createElement("div");
    this.$thumb.setAttribute("class", `range-slider__thumb thumb-${this.id}`);
    this.$thumb.setAttribute("data-id", `${this.id}`);
    this.$parent = parentElement;
    this.$parent.appendChild(this.$thumb);
    this.$thumb.setAttribute("data-value", `0`);
    this.$tooltip = this.getTooltip();
    if (this.options.tooltip) {
      this.$thumb.appendChild(this.$tooltip);
    }
  }

  getTooltip(): HTMLElement {
    const tooltip = document.createElement("div");
    tooltip.setAttribute("class", `range-slider__tooltip tooltip-${this.id}`);
    return tooltip;
  }

  render(
    position: number | number[],
    value: number | number[],
    stringValue?: string | string[]
  ): void {
    if (Array.isArray(position) && Array.isArray(value)) {
      const thisId: number = this.id - 1;
      this.$thumb.style.left = `${position[thisId]}px`;
      if (this.options.tooltip) {
        if (stringValue) {
          this.$tooltip.innerHTML = `${stringValue[thisId]}`;
        } else {
          this.$tooltip.innerHTML = `${value[thisId]}`;
        }
      }
    } else {
      this.$thumb.style.left = `${position}px`;
      if (this.options.tooltip) {
        if (stringValue) {
          this.$tooltip.innerHTML = `${stringValue as string}`;
        } else {
          this.$tooltip.innerHTML = `${value}`;
        }
      }
    }
  }

  getThumbViewId(): number {
    return this.id;
  }
  addValueChangeListener(listener: Function): void {
    this.$thumb.addEventListener("click", () => {
      // listener();
    });
  }
  addStartDragListener(listener: Function): void {
    this.$thumb.addEventListener("mousedown", (e) => {
      listener(e);
    });
  }
  getThumbCurrentPosition(): number {
    return parseFloat(this.$thumb.style.left);
  }

  getThumbElement(): HTMLElement {
    return this.$thumb;
  }
  getTooltipElement(): HTMLElement {
    return this.$tooltip;
  }
}
