import { IThumbView } from "../types/IViews/IThumbView";
import { IPositionObj } from "../types/IConfigurationService/IPositionObj";
export class ThumbView implements IThumbView {
  private $thumb: HTMLElement;
  private $parent: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.$thumb = document.createElement("div");
    this.$thumb.setAttribute("class", "range-slider__thumb");
    this.$parent = parentElement;
    this.$parent.appendChild(this.$thumb);
  }

  // render(value: number): void {
  //   this.$thumb.style.left = `${value}%`;
  // }
  render(positionObj: IPositionObj): void {
    this.$thumb.style.left = `${positionObj.percent}%`;
    console.log(positionObj.percent);
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
