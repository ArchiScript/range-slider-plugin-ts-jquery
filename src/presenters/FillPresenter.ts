import { IFillPresenter } from "../types/IPresenters/IFillPresenter";
import { IFillModel } from "../types/IModels/IFillModel";
import { IFillView } from "../types/IViews/IFillView";
import { IObserver } from "../types/IObserver";
import { Mediator } from "./Mediator";
import { ThumbPresenter } from "./ThumbPresenter";
export class FillPresenter implements IFillPresenter, IObserver {
  private model: IFillModel;
  private view: IFillView;
  private mediator?: Mediator;
  constructor(model: IFillModel, view: IFillView) {
    this.model = model;
    this.view = view;
    this.init();
  }
  init(): void {
    this.model.addObserver(this);
  }
  update(value: number | number[]): void {
    this.view.render(value, this.model.getFillWidth());
  }
  updateValue(value: number | number[]): void {
    this.model.setFillPosition(value);
  }
  setMediator(mediator: Mediator): void {
    if (mediator) this.mediator = mediator;
  }
  public onThumbPositionChange(position: number | number[]): void {
    this.updateValue(position);
  }
}
