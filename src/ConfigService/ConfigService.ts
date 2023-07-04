import { IConfig } from "../types/IConfigurationService/IConfig";
import { IOptions } from "../types/IOptions";
export class ConfigService implements IConfig {
  private options?: IOptions;
  private static defaultOptions: IOptions = {
    orientation: "horizontal",
    min: 0,
    max: 100,
    tooltip: true
  };
  constructor(options?: IOptions) {
    this.options = options;
  }
  getOptions(): IOptions {
    return this.options
      ? Object.assign({}, ConfigService.defaultOptions, this.options)
      : ConfigService.defaultOptions;
  }
}
