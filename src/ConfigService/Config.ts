import { IConfig } from "../types/IConfigurationService/IConfig";
import { IOptions } from "../types/IConfigurationService/IOptions";
export class Config implements IConfig {
  private userOptions?: IOptions;
  private container?: Element;
  private containerWidth?: number;
  private containerViewportLeft?: number;
  private static instance: Config;
  private static instanceId: number = 0;
  private instanceId: number;
  private defaultOptions: IOptions = {
    orientation: "horizontal",
    min: 0,
    max: 100,
    value: 0,
    trackHeight: 10,
    tooltip: true,
    thumbSize: 15,
    doublePoint: false
  };
  private constructor(options?: IOptions, container?: HTMLElement) {
    Config.instanceId++;
    this.instanceId = Config.instanceId;
    this.userOptions = options;
    this.container = container;
  }
  public static set(container: HTMLElement, options?: IOptions): Config {
    if (!options?.instanceId) {
      Config.instance = new Config(options, container);
    } else {
      throw new Error("This instance is already set");
    }
    console.log(`--------instanceId   ${this.instanceId}`);
    return Config.instance;
  }
  public static getInstance(): Config {
    return Config.instance;
  }
  private decorateUserOptions(options: IOptions): IOptions {
    if (this.container) {
      this.containerWidth = parseInt(getComputedStyle(this.container).width);
      this.containerViewportLeft = this.container.getBoundingClientRect().left;
      options.containerWidth = this.containerWidth;
      options.containerViewportLeft = this.containerViewportLeft;
      options.instanceId = this.instanceId;
      return options;
    }
    return options;
  }
  getOptions(): IOptions {
    return this.userOptions
      ? Object.assign(
          {},
          this.defaultOptions,
          this.decorateUserOptions(this.userOptions)
        )
      : this.defaultOptions;
  }
}