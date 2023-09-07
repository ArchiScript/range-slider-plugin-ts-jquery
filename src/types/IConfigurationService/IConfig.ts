import { IOptions } from "./IOptions";
export interface IConfig {
  getOptions(): IOptions;
  updateOptions(options: IOptions): void;
  updateOptionsExact(config: IConfig, options: IOptions): void;
}
