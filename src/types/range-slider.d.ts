declare type IOpts = import("./IConfigurationService/IOptions").IOptions;
declare type IConf = import("./IConfigurationService/IConfig").IConfig;
interface JQuery<TElement = HTMLElement> {
  rangeSlider(opts?: IOpts): JQuery<TElement>;
  setValue(value: number | number[]): JQuery<TElement>;
  getValue(): number | number[];
  updateOptions(opts?: IOpts): JQuery<TElement>;
  onChange(userHandler: Function): void;
  getOptions(): IOpts;
  getContainer(): HTMLElement;
  getPluginConfig(): { pluginId: number; config: IConf };
  getContainerId(): number;
  config: IConf;
  id: number;
}
