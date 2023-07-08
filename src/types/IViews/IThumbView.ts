import { IPositionObj } from "../IConfigurationService/IPositionObj";
export interface IThumbView {
  // render(value: number): void;
  render(positionObj: IPositionObj): void;
  addValueChangeListener(listener: Function): void;
  addStartDragListener(listener: Function): void;
}
