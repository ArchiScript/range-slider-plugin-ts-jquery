import { IOptions } from "./IOptions";
export interface IConfig {
  getOptions(): IOptions;
  setOptions(options: IOptions): void;
}
