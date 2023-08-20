declare type Opts = import("./IConfigurationService/IOptions").IOptions;

interface JQuery<TElement = HTMLElement> {
  rangeSlider(opts?: Opts): JQuery<TElement>;
  setValue(value: number | number[]): JQuery<TElement>;
}
