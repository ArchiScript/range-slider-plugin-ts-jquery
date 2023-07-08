import { IConfig } from "../types/IConfigurationService/IConfig";
import { IOptions } from "../types/IConfigurationService/IOptions";
export class ConfigService implements IConfig {
  private userOptions?: IOptions;
  private static container?: Element;
  private containerWidth?: number;
  private static instance: ConfigService;
  private static defaultOptions: IOptions = {
    orientation: "horizontal",
    min: 0,
    max: 100,
    valueMin: 0,
    trackHeight: 10,
    tooltip: true
  };
  private constructor(options?: IOptions, container?: Element) {
    this.userOptions = options;
  }
  public static setInstance(
    options?: IOptions,
    container?: Element
  ): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService(options);
    }
    if (container) {
      ConfigService.container = container;
      console.log(ConfigService.container);
    }
    return ConfigService.instance;
  }

  public static getInstance(): ConfigService {
    return ConfigService.instance;
  }

  private decorateUserOptions(options: IOptions): IOptions {
    if (ConfigService.container) {
      this.containerWidth = parseInt(
        getComputedStyle(ConfigService.container).width
      );
      options.containerWidth = this.containerWidth;
      return options;
    }
    return options;
  }
  getOptions(): IOptions {
    return this.userOptions
      ? Object.assign(
          {},
          ConfigService.defaultOptions,
          this.decorateUserOptions(this.userOptions)
        )
      : ConfigService.defaultOptions;
  }
}
