import { IThumbView } from "../types/IViews/IThumbView";

export class ThumbView implements IThumbView {
  private $thumb: HTMLElement;
  private $parent: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.$thumb = document.createElement("div");
    this.$thumb.setAttribute("class", "range-slider__thumb");
    this.$parent = parentElement;
    this.$parent.appendChild(this.$thumb);
  }

  render(position: number): void {
    this.$thumb.style.left = `${position}px`;
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

  getThumbElement(): HTMLElement {
    return this.$thumb;
  }
}
