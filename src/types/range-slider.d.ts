// import { IOptions } from "./IConfigurationService/IOptions";

interface JQuery<TElement = HTMLElement> {
  rangeSlider(opts?: Object): JQuery<TElement>;
  setValue(value: number | number[]): JQuery<TElement>;
}

// interface RangeSliderPlugin extends JQuery<HTMLElement> {
//   setValue(value: number | number[]): RangeSliderPlugin;
// }
