import { IConfig } from "../types/IConfigurationService/IConfig";
import { IOptions } from "../types/IConfigurationService/IOptions";
export class Config implements IConfig {
  private userOptions?: IOptions;
  private container?: Element;
  private containerWidth?: number;
  private containerHeight?: number;
  private containerViewportLeft?: number;
  private containerViewportTop?: number;
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
    doublePoint: false,
    ticks: true
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
    const $container__track: HTMLElement = this.container?.querySelector(
      ".range-slider__track"
    ) as HTMLElement;
    if (this.container) {
      this.containerWidth = parseInt(getComputedStyle(this.container).width);
      this.containerHeight = parseInt(getComputedStyle(this.container).height);
      // this.containerViewportLeft = this.container.getBoundingClientRect().left;
      // this.containerViewportTop = this.container.getBoundingClientRect().top;

      options.containerWidth = this.containerWidth;
      options.containerHeight = this.containerHeight;
      // options.containerViewportLeft = this.containerViewportLeft;
      // options.containerViewportTop = this.containerViewportTop;

      options.instanceId = this.instanceId;
      return options;
    }
    return options;
  }
  setOptions(opt: IOptions): void {
    this.userOptions = Object.assign({}, this.userOptions, opt);
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
