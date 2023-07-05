import { IConfig } from "../types/IConfigurationService/IConfig";
import { IOptions } from "../types/IConfigurationService/IOptions";
export class ConfigService implements IConfig {
  private userOptions?: IOptions;
  private static instance: ConfigService;
  private static defaultOptions: IOptions = {
    orientation: "horizontal",
    min: 0,
    max: 100,
    tooltip: true
  };
  private constructor(options?: IOptions) {
    this.userOptions = options;
  }
  public static setInstance(options?: IOptions): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService(options);
    }
    return ConfigService.instance;
  }
  public static getInstance(): ConfigService {
    return ConfigService.instance;
  }

  getOptions(): IOptions {
    return this.userOptions
      ? Object.assign({}, ConfigService.defaultOptions, this.userOptions)
      : ConfigService.defaultOptions;
  }
}
