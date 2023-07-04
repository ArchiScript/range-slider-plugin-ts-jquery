import { IOptions } from "./src/types/IOptions";

interface JQuery<TElement = HTMLElement> {
  rangeSliderPlugin(options?: IOptions): this;
}
