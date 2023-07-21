import { IThumbPresenter } from "../types/IPresenters/IThumbPresenter";
import { IThumbModel } from "../types/IModels/IThumbModel";
import { IThumbView } from "../types/IViews/IThumbView";
import { IObserver } from "../types/IObserver";
import { ThumbView } from "../views/ThumbView";
import { ConfigService } from "../ConfigService/ConfigService";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { Mediator } from "./Mediator";
import { timers } from "jquery";
export class ThumbPresenter implements IThumbPresenter, IObserver {
  private model: IThumbModel;
  private view: ThumbView | ThumbView[];
  private mediator?: Mediator;
  private position: number | number[];
  private activeThumb?: HTMLElement;
  private static position: number | number[];
  private value: number | number[];
  private dragBound!: EventListenerOrEventListenerObject;
  private stopDragBound!: EventListenerOrEventListenerObject;
  private observers: IObserver[] = [];
  private options: IOptions = ConfigService.getInstance().getOptions();
  private step: number;

  constructor(model: IThumbModel, view: ThumbView | ThumbView[]) {
    this.model = model;
    this.view = view;
    this.step = this.model.getStep();
    this.position = this.model.getProportionValue(
      this.options.value as number | number[]
    );
    this.value = this.model.getValue();

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
  updateView(): void {
    if (this.view instanceof ThumbView) {
      this.view.render(this.model.getPosition());
    } else if (Array.isArray(this.view)) {
      this.view.forEach((thumbView) =>
        thumbView.render(this.model.getPosition())
      );
    }
  }

  public getCurrentPosition(): number | number[] {
    return this.position;
  }
  public getCurrentFillPosition(): number | number[] {
    let posArr: number[] = this.getCurrentPosition() as number[];
    let thumbSize = this.options.thumbSize as number;
    return [posArr[0], posArr[1] + thumbSize];
  }
  private startDrag(e: MouseEvent | TouchEvent): void {
    e.preventDefault();
    this.activeThumb = e.target as HTMLElement;
    this.model.enableDrag();
    this.dragBound = this.drag.bind(this) as EventListener;
    this.stopDragBound = this.stopDrag.bind(this) as EventListener;
    document.addEventListener("mousemove", this.dragBound);
    document.addEventListener("touchmove", this.dragBound);
    document.addEventListener("mouseup", this.stopDragBound);
    document.addEventListener("touchend", this.stopDragBound);
  }

  private drag(event: MouseEvent | TouchEvent): void {
    event.preventDefault();

    let currentPosition =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;

    let movementX =
      currentPosition - this.model.getMin() - this.model.getThumbSize();
    console.log(`movenent before check ========${movementX}`);
    movementX = this.validateMinMax(movementX);

    if (Array.isArray(this.view)) {
      let newPositionArr: number[] = this.setDoubleThumbPosition(
        movementX,
        this.view
      );
      console.log(`newPositionArr ========${newPositionArr}`);

      this.updatePosition(newPositionArr);
      this.model.setValue(newPositionArr);
      let fillThumbWidth = newPositionArr[1] + this.model.getThumbSize();
      newPositionArr = [newPositionArr[0], fillThumbWidth];
      this.mediator?.setFill(newPositionArr);
    } else {
      this.updatePosition(movementX);
      this.model.setValue(movementX);
      this.mediator?.setFill(movementX + this.model.getThumbSize());
    }

    this.notifyObservers();
  }

  private setDoubleThumbPosition(
    movement: number,
    viewArr: ThumbView[]
  ): number[] {
    let currentPositionArr: number[];
    let newPositionArr: number[] = [];
    currentPositionArr = viewArr.map((v) => v.getThumbCurrentPosition());

    let i: number = parseInt(this.activeThumb?.dataset.id!) - 1;

    if (i == 0 && movement > currentPositionArr[1]) {
      movement = currentPositionArr[1] - this.step;
    } else if (i == 1 && movement < currentPositionArr[0]) {
      movement = currentPositionArr[0] + this.step;
    }
    newPositionArr =
      i == 0
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
    console.log(`is dragging: ${this.model.isDragging}`);
  }

  private validateMinMax(movement: number): number {
    let max = this.model.getContainerWidth() - this.model.getThumbSize();
    if (movement < 0) {
      movement = 0;
    } else if (movement > max) {
      movement = max;
    }
    return movement;
  }

  public onTrackClick(clickPosition: number): void {
    const pos = clickPosition - this.model.getThumbSize();
    console.log(`clickPosition ${pos}`);
    this.updatePosition(pos);
    this.model.setValue(pos);
    this.notifyObservers();
    console.log(`----set value: ${pos}`);
  }

  private test(): void {
    // this.mediator?.setFill(44);
    console.log(`getPos-------- ${ThumbView.id}`);
    console.log(`step----------${this.step}`);
  }
}
