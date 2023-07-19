import { ThumbView } from "../../views/ThumbView";
export interface IRangeSliderView {
  render(value: number | number[]): void;
  addValueChangeListener(listener: Function): void;
  getContainerWidth(): number;
  getThumbViews(): ThumbView | ThumbView[];
}
