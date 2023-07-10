import { IFillPresenter } from "../types/IPresenters/IFillPresenter";
import { IFillModel } from "../types/IModels/IFillModel";
import { IFillView } from "../types/IViews/IFillView";
import { IObserver } from "../types/IObserver";
import { Mediator } from "./Mediator";
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
    this.update(this.model.getFillWidth());
  }
  update(value: number): void {
    this.view.render(value);
  }
  updateValue(value: number): void {
    this.model.setFillWidth(value);
  }
  setMediator(mediator: Mediator): void {
    if (mediator) this.mediator = mediator;
  }
  public onThumbPositionChange(position: number): void {
    this.update(position);
  }
}
