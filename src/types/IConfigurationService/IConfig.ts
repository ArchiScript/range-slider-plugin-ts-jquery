import { IOptions } from "./IOptions";
export interface IConfig {
  getOptions(): IOptions;
  updateOptions(options: IOptions): void;
}
