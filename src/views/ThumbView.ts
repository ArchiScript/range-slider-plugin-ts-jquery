import { IThumbView } from "../types/IViews/IThumbView";
import { IOptions } from "../components/components";
import { Config } from "../components/components";

type NumberOrArray = number | number[];

export class ThumbView implements IThumbView {
  private $thumb: HTMLElement;
  private $parent: HTMLElement;
  private $tooltip!: HTMLElement;
  public static id: number = 1;
  private id!: number;
  private static idBuffer: number[] = [];
  public dragging: boolean = false;
  public isActive: boolean = false;
  private options: IOptions;

  constructor(parentElement: HTMLElement) {
    this.options = Config.getInstance().getOptions();

    if (this.options.doublePoint) {
      if (ThumbView.idBuffer.length == 0 || ThumbView.id > 2) {
        ThumbView.id = 1;
      }
      ThumbView.idBuffer.push(ThumbView.id);
    } else {
      ThumbView.id = 1;
      ThumbView.idBuffer = [];
    }

    this.id = ThumbView.id;
    this.$parent = parentElement;
    this.$thumb = document.createElement("div");
    this.init();
    ThumbView.id++;
  }
  init(): void {
    const draggingClass = this.isActive ? ` dragging` : "";
    this.$thumb.setAttribute(
      "class",
      `range-slider__thumb range-slider__thumb--${this.options.orientation} thumb-${this.id}${draggingClass}`
    );
    this.$thumb.dataset.id = this.id.toString();
    this.$thumb.dataset.value = "0";
    this.$parent.innerHTML = "";
    this.$parent.appendChild(this.$thumb);
    this.$thumb.innerHTML = "";

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
    if (this.$tooltip) {
      this.$tooltip.style.setProperty(
        "--tooltip-color",
        this.options.tooltipColor as string
      );
    }
  }

  render(
    position: NumberOrArray,
    value: NumberOrArray,
    stringValue?: string | string[]
  ): void {
    if (this.options.thumbAnimation) {
      this.applyThumbAnimatingStyles(this.$thumb);
    } else {
      this.thumbAnimationOff(this.$thumb);
    }

    this.applyThumbStyles(this.$thumb);

    const updateTooltipContent = () => {
      if (Array.isArray(position) && Array.isArray(value)) {
        const thisId: number = this.id - 1;
        if (this.options.tooltip) {
          if (stringValue) {
            this.$tooltip.innerHTML = `${stringValue[thisId]}`;
          } else {
            this.$tooltip.innerHTML = `${value[thisId]}`;
          }
        }
      } else {
        if (this.options.tooltip) {
          if (stringValue) {
            this.$tooltip.innerHTML = `${stringValue as string}`;
          } else {
            this.$tooltip.innerHTML = `${value}`;
          }
        }
      }
    };
    if (this.options.thumbAnimation) {
      requestAnimationFrame(() => {
        this.setOrientationPos(position);
        updateTooltipContent();
      });
    } else {
      this.setOrientationPos(position);
      updateTooltipContent();
    }
  }

  private applyThumbAnimatingStyles(el: HTMLElement): void {
    el.style.transition = "all 0.4s";
  }
  private thumbAnimationOff(el: HTMLElement): void {
    el.style.transition = "none";
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

    if (this.options.thumbBorder) {
      thumb.style.setProperty(
        "--thumb-border",
        `${this.options.thumbBorderStyle}`
      );
    } else {
      thumb.style.setProperty("--thumb-border", `none`);
    }

    if (this.options.thumbShadow) {
      this.$thumb.style.setProperty("--thumb-shadow", "block");
      this.$thumb.style.setProperty(
        "--thumb-shadow-color",
        (this.options.thumbShadowColor as string) ||
          (this.options.thumbColor as string)
      );
    } else {
      this.$thumb.style.setProperty("--thumb-shadow", "none");
    }
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
    return this.$tooltip as HTMLElement;
  }
}
