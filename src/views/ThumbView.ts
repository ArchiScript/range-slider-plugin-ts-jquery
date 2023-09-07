import { IThumbView } from "../types/IViews/IThumbView";
import { IOptions } from "../components/components";
import { Config } from "../components/components";
export class ThumbView implements IThumbView {
  private $thumb: HTMLElement;
  private $parent: HTMLElement;
  private $tooltip!: HTMLElement;
  public static id: number = 0;
  private id!: number;

  public isActive: boolean = false;
  private options: IOptions;

  constructor(parentElement: HTMLElement) {
    this.options = Config.getInstance().getOptions();
    ThumbView.id++;
    if (ThumbView.id > 2) {
      ThumbView.id = 1;
    }
    this.id = ThumbView.id;
    this.$parent = parentElement;
    this.$thumb = document.createElement("div");
    this.init();
  }
  init(): void {
    this.$thumb.setAttribute(
      "class",
      `range-slider__thumb range-slider__thumb--${this.options.orientation} thumb-${this.id}`
    );
    this.$thumb.setAttribute("data-id", `${this.id}`);
    this.$parent.innerHTML = "";
    this.$parent.appendChild(this.$thumb);
    this.$thumb.setAttribute("data-value", `0`);
    this.$thumb.innerHTML = "";
    console.log(`*******thumViewINIT - tooltip:${this.options.tooltip}`);

    if (this.options.tooltip) {
      this.$tooltip = this.getTooltip();
      this.$thumb.appendChild(this.$tooltip);
      this.applyTooltipStyle();
    } else {
      this.$thumb.innerHTML = "";
    }
  }

  updateOptions(id: number): void {
    this.options = Config.getInstanceById(id).getOptions();
    this.init();
  }
  getTooltip(): HTMLElement {
    const tooltip = document.createElement("div");
    let tooltipFormClass: string = `tooltip-${this.options.tooltipForm}` ?? "";
    tooltip.setAttribute(
      "class",
      `range-slider__tooltip range-slider__tooltip--${this.options.orientation} tooltip-${this.id} ${tooltipFormClass}`
    );
    return tooltip;
  }

  applyTooltipStyle(): void {
    this.$tooltip.style.setProperty(
      "--tooltip-color",
      `${this.options.tooltipColor}`
    );
  }

  render(
    position: number | number[],
    value: number | number[],
    stringValue?: string | string[]
  ): void {
    this.applyThumbStyles(this.$thumb);
    if (Array.isArray(position) && Array.isArray(value)) {
      const thisId: number = this.id - 1;
      this.setOrientationPos(position);
      if (this.options.tooltip) {
        if (stringValue) {
          this.$tooltip.innerHTML = `${stringValue[thisId]}`;
        } else {
          this.$tooltip.innerHTML = `${value[thisId]}`;
        }
      }
    } else {
      this.setOrientationPos(position);
      if (this.options.tooltip) {
        if (stringValue) {
          this.$tooltip.innerHTML = `${stringValue as string}`;
        } else {
          this.$tooltip.innerHTML = `${value}`;
        }
      }
    }
  }

  private applyThumbStyles(thumb: HTMLElement): void {
    thumb.style.width = `${this.options.thumbSize}px`;
    thumb.style.height = `${this.options.thumbSize}px`;
    const thumbSize = this.options.thumbSize as number;
    const trackHeight = this.options.trackHeight as number;
    if (this.options.orientation === "horizontal") {
      thumb.style.top = `-${thumbSize / 2 - trackHeight / 2}px`;
    } else {
      thumb.style.left = `-${thumbSize / 2 - trackHeight / 2}px`;
    }
    thumb.style.setProperty("--thumb-color", `${this.options.thumbColor}`);
  }
  setOrientationPos(position: number | number[]): void {
    const thisId: number = this.id - 1;
    if (this.options.orientation === "horizontal") {
      if (Array.isArray(position)) {
        this.$thumb.style.left = `${position[thisId]}px`;
      } else {
        this.$thumb.style.left = `${position}px`;
      }
    } else {
      if (Array.isArray(position)) {
        this.$thumb.style.top = `${position[thisId]}px`;
      } else {
        this.$thumb.style.top = `${position}px`;
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
    const pos: number =
      this.options.orientation === "horizontal"
        ? parseFloat(this.$thumb.style.left)
        : parseFloat(this.$thumb.style.top);
    return pos;
  }

  getThumbElement(): HTMLElement {
    return this.$thumb;
  }
  getTooltipElement(): HTMLElement {
    return this.$tooltip;
  }
}
