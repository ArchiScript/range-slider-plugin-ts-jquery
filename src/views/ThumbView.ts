import { IThumbView } from "../types/IViews/IThumbView";

export class ThumbView implements IThumbView {
  private $thumb: HTMLElement;
  private $parent: HTMLElement;
  public static id: number = 0;
  private id: number;
  public isActive: boolean = false;

  constructor(parentElement: HTMLElement) {
    ThumbView.id++;
    this.id = ThumbView.id;
    this.$thumb = document.createElement("div");
    this.$thumb.setAttribute("class", `range-slider__thumb thumb-${this.id}`);
    this.$thumb.setAttribute("data-id", `${this.id}`);
    this.$parent = parentElement;
    this.$parent.appendChild(this.$thumb);
    this.$thumb.setAttribute("data-value", `0`);
  }

  render(position: number | number[]): void {
    if (Array.isArray(position)) {
      const thisId: number = this.id - 1;
      this.$thumb.style.left = `${position[thisId]}px`;
    }
    this.$thumb.style.left = `${position}px`;
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
}
