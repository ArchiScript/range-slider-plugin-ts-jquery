import { IThumbPresenter } from "../types/IPresenters/IThumbPresenter";
import { IThumbModel } from "../types/IModels/IThumbModel";
import { IThumbView } from "../types/IViews/IThumbView";
import { IObserver } from "../types/IObserver";
import { ThumbView } from "../views/ThumbView";
import { Config } from "../ConfigService/Config";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { Mediator } from "./Mediator";
import { IChangeEvent } from "../types/IChangeEvent";
import { EventDispatcher } from "../EventDispatcher";

type NumberOrArray = number | number[];

export class ThumbPresenter implements IThumbPresenter, IObserver {
  private model: IThumbModel;
  private view: ThumbView | ThumbView[];
  private mediator?: Mediator;
  private position!: NumberOrArray;
  private activeThumb?: HTMLElement;
  private value!: NumberOrArray;
  private dragBound!: EventListenerOrEventListenerObject;
  private stopDragBound!: EventListenerOrEventListenerObject;
  private observers: IObserver[] = [];
  private options: IOptions;
  private step!: number;
  private isDoubleThumb!: boolean;
  private eventDispatcher: EventDispatcher;
  private changeEvent: IChangeEvent;
  public startPoint?: number;

  constructor(model: IThumbModel, view: ThumbView | ThumbView[]) {
    this.options = Config.getInstance().getOptions();
    this.model = model;
    this.view = view;
    this.eventDispatcher = new EventDispatcher();
    this.changeEvent = {};
    this.model.addObserver(this);
    this.addDragListeners(this);
    this.init();
  }

  updateOptions(id: number): void {
    this.options = Config.getInstanceById(id).getOptions();
    this.init();
  }
  init(): void {
    this.step = this.model.getStep();
    this.position = this.model.getPosition();
    this.value = this.model.getValue();
    this.isDoubleThumb = this.isDouble;
    this.model.setPosition(this.position);
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
  getValue(): NumberOrArray {
    return this.model.getValue();
  }

  get isDouble(): boolean {
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
      observer.update(this.model.getValue() as number);
    }
  }

  update(value: number): void {
    this.updateView();
  }

  updatePosition(value: NumberOrArray): void {
    this.model.setPosition(value);
  }

  setThumbDataValue(thumb: ThumbView | ThumbView[]): void {
    const currentVal: NumberOrArray = this.model.getValue();
    const stringVal: string | string[] | undefined = this.options.stringValues
      ? this.model.getValueString(currentVal)
      : undefined;
    if (thumb instanceof ThumbView && typeof currentVal == "number") {
      if (!stringVal) {
        thumb.getThumbElement().dataset.value = currentVal.toString();
      } else {
        thumb.getThumbElement().dataset.value = stringVal as string;
      }
    } else if (Array.isArray(thumb) && Array.isArray(currentVal)) {
      if (!stringVal) {
        for (let i = 0; i <= thumb.length - 1; i++) {
          thumb[i].getThumbElement().dataset.value = currentVal[i].toString();
        }
      } else {
        for (let i = 0; i <= thumb.length - 1; i++) {
          thumb[i].getThumbElement().dataset.value = stringVal[i];
        }
      }
    }
  }

  updateView(): void {
    let strVal = this.options.stringValues
      ? this.model.getValueString(this.model.getValue())
      : "";
    if (this.view instanceof ThumbView) {
      this.view.render(
        this.model.getPosition(),
        this.model.getValue(),
        this.model.getValueString(this.model.getValue())
      );
    } else if (Array.isArray(this.view)) {
      this.view.forEach((thumbView) =>
        thumbView.render(
          this.model.getPosition(),
          this.model.getValue(),
          this.model.getValueString(this.model.getValue())
        )
      );
    }

    this.setThumbDataValue(this.view);
  }

  public getCurrentPosition(): number | number[] {
    return this.position;
  }

  public getCurrentFillPosition(): number | number[] {
    let posArr: NumberOrArray = this.getCurrentPosition();
    if (Array.isArray(posArr)) {
      return [posArr[0], posArr[1]];
    } else {
      return posArr;
    }
  }

  getTargetThumb(event: MouseEvent | TouchEvent): HTMLElement {
    event.preventDefault();
    let thumb: HTMLElement;
    let eventTarget = event.target as HTMLElement;
    if (eventTarget.classList.contains("range-slider__tooltip")) {
      thumb = eventTarget.closest(".range-slider__thumb") as HTMLElement;
    } else {
      thumb = eventTarget;
    }
    return thumb;
  }

  removeDraggingThumbClass(): void {
    const thumbs = this.getThumbs();
    if (!Array.isArray(thumbs)) {
      thumbs.classList.remove("dragging");
    } else {
      thumbs.forEach((thumb) => {
        thumb.classList.remove("dragging");
      });
    }
  }

  setDraggingThumbClass(activeThumb: HTMLElement): void {
    activeThumb.classList.add("dragging");
  }

  private startDrag(e: MouseEvent | TouchEvent): void {
    this.activeThumb = this.getTargetThumb(e);

    this.setActiveThumb(this.activeThumb);
    this.model.enableDrag();
    this.dragBound = this.drag.bind(this) as EventListener;
    this.stopDragBound = this.stopDrag.bind(this) as EventListener;
    document.addEventListener("mousemove", this.dragBound);
    document.addEventListener("touchmove", this.dragBound);
    document.addEventListener("mouseup", this.stopDragBound);
    document.addEventListener("touchend", this.stopDragBound);
  }

  getThumbs(): HTMLElement | HTMLElement[] {
    if (!Array.isArray(this.view)) {
      return this.view.getThumbElement();
    } else {
      return this.view.map((v) => v.getThumbElement());
    }
  }
  setActiveThumb(thumb: HTMLElement) {
    if (!Array.isArray(this.view)) {
      thumb.classList.add("active");
      this.view.isActive = true;
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

  public getStartPointFromMediator(): number {
    const obj = this.mediator?.getStartPointFromTrack() as {
      left: number;
      top: number;
    };

    const startPoint =
      this.options.orientation === "horizontal" ? obj.left : obj.top;
    return startPoint;
  }

  private drag(event: MouseEvent | TouchEvent): void {
    const targetThumb = this.getTargetThumb(event);

    this.setDraggingThumbClass(targetThumb);

    const startPoint = this.getStartPointFromMediator();
    event.preventDefault();
    let currentPosition: number;

    if (this.options.orientation === "horizontal") {
      currentPosition =
        event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    } else {
      currentPosition =
        event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    }

    let movement = currentPosition - this.model.getThumbSize() / 2 - startPoint;

    movement = this.setStep(movement);
    movement = this.validateMinMax(movement);

    if (Array.isArray(this.view) && this.options.doublePoint) {
      let newPositionArr: number[] = this.setDoubleThumbPosition(
        movement,
        this.view
      );

      this.updatePosition(newPositionArr);
      let fillThumbWidth = newPositionArr[1];
      newPositionArr = [newPositionArr[0], fillThumbWidth];
      this.mediator?.setFill(newPositionArr);
    } else {
      this.updatePosition(movement);
      this.mediator?.setFill(movement);
    }

    this.notifyObservers();
  }

  externalSetValue(value: NumberOrArray): void {
    if (Array.isArray(value) && this.options.reversedOrder) {
      value = value.reverse();
    }
    this.model.setValue(value);

    this.mediator?.setFill(this.model.getPosition());
    this.notifyObservers();
  }

  setStep(position: number): number {
    if (this.model.getStep()) {
      let step: number = this.model.getStep();
      step = this.validateIfStepMismatch(position);
      return Math.round(position / step) * step;
    }
    return position;
  }

  setDoubleThumbPosition(movement: number, viewArr: ThumbView[]): number[] {
    let currentPositionArr: number[];
    let newPositionArr: number[] = [];
    let step = this.model.getStep();
    let min = this.model.getMin();

    currentPositionArr = viewArr.map((v) => v.getThumbCurrentPosition());

    if (viewArr[0].isActive && movement >= currentPositionArr[1] - step) {
      movement = currentPositionArr[1] - step;
    } else if (
      viewArr[1].isActive &&
      movement <= currentPositionArr[0] + step
    ) {
      movement = currentPositionArr[0] + step;
    }

    newPositionArr = viewArr[0].isActive
      ? [movement, currentPositionArr[1]]
      : [currentPositionArr[0], movement];

    return newPositionArr;
  }

  public ExternalAddOnChangeListener(handler: Function): void {
    this.eventDispatcher.addEventListener((event: IChangeEvent) => {
      handler();
    });
  }
  private stopDrag(): void {
    this.model.disableDrag();
    this.removeDraggingThumbClass();
    document.removeEventListener("mousemove", this.dragBound);
    document.removeEventListener("touchmove", this.dragBound);
    document.removeEventListener("mouseup", this.stopDragBound);
    document.removeEventListener("touchend", this.stopDragBound);

    this.eventDispatcher.dispatchEvent(this.changeEvent);
  }
  private countContainerMax(): number {
    let max: number =
      this.options.orientation === "horizontal"
        ? this.model.getContainerWidth() - this.model.getThumbSize()
        : this.model.getContainerHeight() - this.model.getThumbSize();
    return max;
  }
  validateMinMax(pos: number): number {
    const max = this.countContainerMax();
    const min = this.model.getMin();
    if (pos < 0) {
      pos = 0;
    } else if (pos > max) {
      pos = max;
    }
    return pos;
  }

  validateIfStepMismatch(pos: number): number {
    const max = this.countContainerMax();
    return pos >= max && max % this.step !== 0 ? max % this.step : this.step;
  }

  public onTrackClick(clickPosition: number): void {
    let pos: number | number[];
    clickPosition -= this.model.getThumbSize();
    clickPosition = this.validateMinMax(clickPosition);
    let intersection: number = 0;

    if (!Array.isArray(this.model.getPosition())) {
      pos = this.setStep(clickPosition);
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
    this.eventDispatcher.dispatchEvent(this.changeEvent);
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
