import { IThumbPresenter } from "../types/IPresenters/IThumbPresenter";
import { IThumbModel } from "../types/IModels/IThumbModel";
import { IThumbView } from "../types/IViews/IThumbView";
import { IObserver } from "../types/IObserver";
export class ThumbPresenter implements IThumbPresenter, IObserver {
  private model: IThumbModel;
  private view: IThumbView;

  constructor(model: IThumbModel, view: IThumbView) {
    this.model = model;
    this.view = view;
    this.init();
  }

  init(): void {
    this.model.addObserver(this);
    this.updateView();
  }

  update(value: number): void {
    this.updateView();
  }
  updatePosition(value: number): void {
    this.model.setPosition(value);
    console.log(`pos - ${this.model.getPosition()}`);
  }
  updateView(): void {
    this.view.render(this.model.getPosition());
  }
  incrementHandler(): void {
    this.model.incrementPos();
  }
}
