import { IThumbPresenter } from "../types/IPresenters/IThumbPresenter";
import { IThumbModel } from "../types/IModels/IThumbModel";
import { IThumbView } from "../types/IViews/IThumbView";
import { IObserver } from "../types/IObserver";
import { ThumbView } from "../views/ThumbView";
import { ConfigService } from "../ConfigService/ConfigService";
import { Config } from "../ConfigService/Config";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { Mediator } from "./Mediator";

export class ThumbPresenter implements IThumbPresenter, IObserver {
  private model: IThumbModel;
  private view: ThumbView | ThumbView[];
  private mediator?: Mediator;
  private position: number | number[];
  private activeThumb?: HTMLElement;
  private value: number | number[];
  private dragBound!: EventListenerOrEventListenerObject;
  private stopDragBound!: EventListenerOrEventListenerObject;
  private observers: IObserver[] = [];
  private options: IOptions = Config.getInstance().getOptions();
  private step: number;
  public isDoubleThumb: boolean;

  constructor(model: IThumbModel, view: ThumbView | ThumbView[]) {
    this.model = model;
    this.view = view;
    this.step = this.model.getStep();
    this.position = this.model.getProportionValue(
      this.options.value as number | number[]
    );
    this.value = this.model.getValue();
    this.isDoubleThumb = this.isDouble;
    this.init();
  }

  init(): void {
    this.model.addObserver(this);
    this.model.setPosition(this.position);
    this.addDragListeners(this);

    this.test();
    this.updateView();
  }

  addDragListeners(context: ThumbPresenter): void {
    if (this.view instanceof ThumbView) {
      this.view.addStartDragListener(this.startDrag.bind(context));
    } else if (Array.isArray(this.view)) {
      this.view.forEach((thumbView) => {
        thumbView.addStartDragListener(this.startDrag.bind(context));
      });
    }
  }
  getValue(): number | number[] {
    return this.value;
  }

  private get isDouble(): boolean {
    return Array.isArray(this.view);
  }
  setMediator(mediator: Mediator): void {
    if (mediator) this.mediator = mediator;
  }

  addObserver(observer: IObserver): void {
    this.observers.push(observer);
  }

  private notifyObservers(): void {
    for (const observer of this.observers) {
      if (typeof this.model.getValue() == "number") {
        observer.update(this.model.getValue() as number);
      } else if (Array.isArray(this.model.getValue())) {
        observer.update(this.model.getValue() as number[]);
      }

      console.log(`notifyobserver: ${this.model.getValue()}`);
    }
  }

  update(value: number): void {
    this.updateView();
  }

  updatePosition(value: number | number[]): void {
    this.model.setPosition(value);
  }

  setThumbDataValue(thumb: ThumbView | ThumbView[]): void {
    const currentVal: number | number[] = this.model.getValue();
    if (thumb instanceof ThumbView && typeof currentVal == "number") {
      thumb.getThumbElement().dataset.value = currentVal.toString();
    } else if (Array.isArray(thumb) && Array.isArray(currentVal)) {
      for (let i = 0; i <= thumb.length - 1; i++) {
        thumb[i].getThumbElement().dataset.value = currentVal[i].toString();
      }
    }
  }

  updateView(): void {
    if (this.view instanceof ThumbView) {
      this.view.render(this.model.getPosition());
    } else if (Array.isArray(this.view)) {
      this.view.forEach((thumbView) =>
        thumbView.render(this.model.getPosition())
      );
    }

    this.setThumbDataValue(this.view);
  }

  public getCurrentPosition(): number | number[] {
    return this.position;
  }

  public getCurrentFillPosition(): number | number[] {
    let posArr: number | number[] = this.getCurrentPosition();
    let thumbSize = this.options.thumbSize as number;
    if (Array.isArray(posArr)) {
      return [posArr[0], posArr[1]];
    } else {
      return posArr;
    }
  }

  private startDrag(e: MouseEvent | TouchEvent): void {
    e.preventDefault();
    this.activeThumb = e.target as HTMLElement;
    this.setActiveThumb(this.activeThumb);
    this.model.enableDrag();
    this.dragBound = this.drag.bind(this) as EventListener;
    this.stopDragBound = this.stopDrag.bind(this) as EventListener;
    document.addEventListener("mousemove", this.dragBound);
    document.addEventListener("touchmove", this.dragBound);
    document.addEventListener("mouseup", this.stopDragBound);
    document.addEventListener("touchend", this.stopDragBound);
  }

  setActiveThumb(thumb: HTMLElement) {
    if (!Array.isArray(this.view)) {
      thumb.classList.add("active");
    } else {
      let thumbs = this.view.map((v) => v.getThumbElement());
      thumbs.forEach((thumb) => thumb.classList.remove("active"));
      thumb.classList.add("active");
      this.view.forEach((v) => {
        if (v.getThumbElement() === thumb) {
          v.isActive = true;
        } else {
          v.isActive = false;
        }
      });
    }
  }
  private drag(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    const startPoint: number = this.options.containerViewportLeft as number;
    console.log(`______${startPoint}`);

    let currentPosition =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;

    let movementX =
      currentPosition -
      this.model.getMin() -
      this.model.getThumbSize() / 2 -
      startPoint;

    console.log(
      `:::::: movementX = clientX: ${currentPosition} - thumbSize/2:   ${
        this.model.getThumbSize() / 2
      } - startPoint ${startPoint} = movementX ${movementX} step: ${this.model.getStep()}`
    );

    movementX = this.validateMinMax(movementX);

    movementX = this.setStep(movementX);

    if (Array.isArray(this.view)) {
      let newPositionArr: number[] = this.setDoubleThumbPosition(
        movementX,
        this.view
      );

      this.updatePosition(newPositionArr);
      let fillThumbWidth = newPositionArr[1];
      newPositionArr = [newPositionArr[0], fillThumbWidth];
      this.mediator?.setFill(newPositionArr);
    } else {
      this.updatePosition(movementX);
      this.mediator?.setFill(movementX);
    }

    this.notifyObservers();
  }
  setStep(position: number): number {
    if (this.model.getStep()) {
      let step: number = this.model.getStep();
      return Math.round(position / step) * step;
    }
    return position;
  }

  setDoubleThumbPosition(movement: number, viewArr: ThumbView[]): number[] {
    let currentPositionArr: number[];
    let newPositionArr: number[] = [];
    currentPositionArr = viewArr.map((v) => v.getThumbCurrentPosition());

    if (viewArr[0].isActive && movement > currentPositionArr[1]) {
      movement = currentPositionArr[1] - this.step;
    } else if (viewArr[1].isActive && movement < currentPositionArr[0]) {
      movement = currentPositionArr[0] + this.step;
    }
    newPositionArr = viewArr[0].isActive
      ? [movement, currentPositionArr[1]]
      : [currentPositionArr[0], movement];

    return newPositionArr;
  }

  private stopDrag(): void {
    this.model.disableDrag();
    document.removeEventListener("mousemove", this.dragBound);
    document.removeEventListener("touchmove", this.dragBound);
    document.removeEventListener("mouseup", this.stopDragBound);
    document.removeEventListener("touchend", this.stopDragBound);
  }

  validateMinMax(pos: number): number {
    let max = this.model.getContainerWidth() - this.model.getThumbSize();
    if (pos < 0) {
      pos = 0;
    } else if (pos > max) {
      pos = max;
    }
    return pos;
  }

  public onTrackClick(clickPosition: number): void {
    let pos: number | number[];
    clickPosition -= this.model.getThumbSize();
    clickPosition = this.validateMinMax(clickPosition);
    console.log(`____clickpos__${clickPosition}`);
    let intersection: number = 0;

    if (!Array.isArray(this.model.getPosition())) {
      pos = clickPosition;
      pos = this.setStep(pos);
    } else {
      let posArr: number[] = this.model.getPosition() as number[];
      intersection = posArr[1] - posArr[0];

      if (clickPosition - posArr[0] < intersection / 2) {
        pos = [this.setStep(clickPosition), posArr[1]];
      } else if (clickPosition - posArr[0] > intersection / 2) {
        pos = [posArr[0], this.setStep(clickPosition)];
      } else {
        pos = [this.setStep(clickPosition), posArr[1]];
      }
    }

    this.updatePosition(pos);
    this.mediator?.setFill(pos);
    this.notifyObservers();
  }

  private test(): void {
    console.log(`---------options.value  ${this.options.value}`);
  }
  setTestActiveThumb(thumb: HTMLElement, thumbViews: ThumbView[]): void {
    if (Array.isArray(thumbViews)) {
      thumbViews.forEach((v) => {
        if (v.getThumbElement() == thumb) {
          v.isActive = true;
        }
      });
      this.activeThumb = thumb;
    }
  }
}
