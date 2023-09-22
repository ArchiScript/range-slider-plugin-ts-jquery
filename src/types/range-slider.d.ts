declare type IOpts = import("./IConfigurationService/IOptions").IOptions;
declare type IConf = import("./IConfigurationService/IConfig").IConfig;
interface JQuery<TElement = HTMLElement> {
  rangeSlider(opts?: IOpts): JQuery<TElement>;
  setValue(value: number | number[]): JQuery<TElement>;
  updateOptions(opts?: IOpts): JQuery<TElement>;
  rangeSliderReset(opts?: IOpts): JQuery<TElement>;
  getOptions(): IOpts;
  getContainer(): HTMLElement;
  getPluginConfig(): { pluginId: number; config: IConf };
  getContainerId(): number;
  config: IConf;
  id: number;
}
// interface PluginConfig extends JQuery<HTMLElement> {
//   config: IConf;
// }
