import { ITrackView } from "../types/IViews/ITrackView";
export class TrackView implements ITrackView {
  private $element: HTMLElement;

  constructor(element: HTMLElement) {
    this.$element = element;
    const track: HTMLElement = document.createElement("div");
    track.classList.add("range-slider__track");
    this.$element.appendChild(track);
  }

  render(width: number, height: number): void {
    this.$element.style.width = `${width}px`;
    this.$element.style.height = `${height}px`;
    this.$element.style.backgroundColor = "grey";
    console.log(`width: ${width}px, height: ${height}px`);
  }
}
