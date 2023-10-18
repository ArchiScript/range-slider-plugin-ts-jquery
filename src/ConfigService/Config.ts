import { IConfig } from "../types/IConfigurationService/IConfig";
import { IOptions } from "../types/IConfigurationService/IOptions";
import cloneDeep from "lodash/cloneDeep";

export class Config implements IConfig {
  private userOptions?: IOptions;
  private container?: Element;
  private containerWidth?: number;
  private containerHeight?: number;
  private containerViewportLeft?: number;
  private containerViewportTop?: number;
  private static instance: Config;
  private static instances: Config[] = [];
  private static instanceId: number = 0;
  private instanceId: number;
  private defaultOptions: IOptions = {
    orientation: "horizontal",
    min: 0,
    max: 100,
    value: 0,
    step: 1,
    trackHeight: 6,
    fill: true,
    tooltip: true,
    tooltipForm: "square",
    thumbSize: 15,
    doublePoint: false,
    label: true,
    labelStyles: {
      height: 20,
      marginTop: 10,
      marginBottom: 30
    },
    labelString: "Range-Slider",
    valueInLabel: true,
    ticks: true,
    maxTicks: 20,
    tickBar: true,
    tickFontSize: 11,
    thumbColor: "#E65837FF",
    trackColor: "#E5E5E5FF",
    fillColor: "#E65837FF",
    tooltipColor: "#E65837FF",
    rulerColor: "#C4C4C4FF"
  };
  private constructor(options?: IOptions, container?: HTMLElement) {
    Config.instanceId++;
    this.instanceId = Config.instanceId;
    this.userOptions = options;
    this.container = container;
    container?.setAttribute("data-id", `${this.instanceId}`);
  }
  public static set(container: HTMLElement, options?: IOptions): Config {
    if (!options?.instanceId) {
      Config.instance = new Config(options, container);
      Config.instances.push(Config.instance);
    } else {
      throw new Error("This instance is already set");
    }
    return Config.instance;
  }
  public static getInstance(): Config {
    return Config.instance;
  }
  public static getInstanceById(instanceId: number): Config {
    return Config.instances[instanceId - 1];
  }

  private getCurrentContainerProportions(): number {
    let max = this.userOptions?.max
      ? (this.userOptions.max as number)
      : this.defaultOptions.max;
    let min = this.userOptions?.min
      ? (this.userOptions.min as number)
      : this.defaultOptions.min;
    (max = max as number), (min = min as number);
    const proportion = this.getCurrentOrientationValue() / (max - min);
    return proportion;
  }
  private getCurrentOrientationValue(): number {
    return this.userOptions?.orientation &&
      this.userOptions?.orientation == "horizontal"
      ? this.getContainerSize().containerWidth
      : this.getPluginHeight();
  }
  private getContainerSize(): {
    containerHeight: number;
    containerWidth: number;
  } {
    if (this.container) {
      this.containerWidth = parseInt(getComputedStyle(this.container).width);
      this.containerHeight = parseInt(getComputedStyle(this.container).height);
    }
    return {
      containerHeight: this.containerHeight as number,
      containerWidth: this.containerWidth as number
    };
  }
  private getLabelHeight(): number {
    const labelHeight = this.defaultOptions.labelStyles
      ? this.defaultOptions.labelStyles.height +
        this.defaultOptions.labelStyles.marginBottom +
        this.defaultOptions.labelStyles.marginTop
      : this.containerHeight;
    return labelHeight as number;
  }
  private getPluginHeight(): number {
    return this.getContainerSize().containerHeight - this.getLabelHeight();
  }
  private decorateUserOptions(options: IOptions): IOptions {
    if (this.container) {
      options.containerWidth = this.getContainerSize().containerWidth;
      options.containerHeight = this.getContainerSize().containerHeight;

      options.pluginHeight = this.getPluginHeight();
      options.instanceId = this.instanceId;
      options.containerProportion = this.getCurrentContainerProportions();

      return options;
    }
    return options;
  }
  public updateOptions(opt: IOptions): void {
    this.userOptions = Object.assign({}, this.userOptions, opt);
    // console.log(Config.instances);
  }
  public updateOptionsExact(config: Config, opt: IOptions): void {
    config.userOptions = Object.assign({}, config.userOptions, opt);
  }
  // public updateOptions(opt: IOptions): void {
  //   this.userOptions = cloneDeep(opt);
  // }

  public static getConfigObjectById(id: number): {
    pluginId: number;
    config: Config;
  } {
    return {
      pluginId: id,
      config: Config.instances[id]
    };
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
