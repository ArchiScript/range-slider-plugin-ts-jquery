import { IPresenter } from "../types/IPresenter";
import { IRangeSlider } from "../types/IRangeSlider";
import { IRangeSliderView } from "../types/IRangeSliderView";
import { IObserver } from "../types/IObserver";

class RangeSliderPresenter implements IPresenter, IObserver {
  constructor(private model: IRangeSlider, private view: IRangeSliderView) {
    this.model = model;
    this.view = view;
  }

  init(): void {
    this.model.addObserver(this);
    this.view.addValueChangeListener(this.updateValue.bind(this));
    this.updateView();
  }

  update(value: number): void {
    this.updateView();
  }

  updateValue(value: number): void {
    this.model.setValue(value);
  }

  private updateView(): void {
    const value = this.model.getValue();
    this.view.render(value);
  }
}
