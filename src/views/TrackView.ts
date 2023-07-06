import { ITrackView } from "../types/IViews/ITrackView";
export class TrackView implements ITrackView {
  private $element: HTMLElement;
  private $track: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.$element = parentElement;
    this.$track = document.createElement("div");
    this.$track.setAttribute("class", "range-slider__track");
  }
  getTrackElement(): HTMLElement {
    return this.$track;
  }

  render(width: number, height: number): void {
    this.$element.appendChild(this.$track);
    this.$track.style.width = `${width}px`;
    this.$track.style.height = `${height}px`;
  }
  addPositionChangeListener(listener: Function): void {
    this.$element.addEventListener("click", (e) => {
      listener(e);
    });
  }
}
