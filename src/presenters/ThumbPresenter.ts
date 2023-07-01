import { IThumbPresenter } from "../types/IPresenters/IThumbPresenter";
import { IThumbModel } from "../types/IModels/IThumbModel";
import { IThumbView } from "../types/IViews/IThumbView";
import { IObserver } from "../types/IObserver";
export class ThumbPresenter implements IThumbPresenter, IObserver {
  private model: IThumbModel;
  private view: IThumbView;
  // private initialPosition: number;
  // private currentPosition: number;
  private position: number;
  private dragBound!: EventListenerOrEventListenerObject;
  private stopDragBound!: EventListenerOrEventListenerObject;
  private observers: IObserver[] = [];

  constructor(model: IThumbModel, view: IThumbView) {
    this.model = model;
    this.view = view;
    // this.initialPosition = this.model.getInitialPosition();
    // this.currentPosition = this.model.getCurrentPosition();
    this.position = this.model.getPosition();
    this.init();
    console.log(this.observers);
  }

  init(): void {
    this.model.addObserver(this);
    this.updateView();
    this.view.addStartDragListener(this.startDrag.bind(this));
  }

  addObserver(observer: IObserver): void {
    this.observers.push(observer);
  }
  private notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.model.getPosition());
    }
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
  getCurrentPosition(): number {
    return this.position;
  }
  private startDrag(e: MouseEvent | TouchEvent): void {
    e.preventDefault();
    this.model.enableDrag();
    this.dragBound = this.drag.bind(this) as EventListener;
    this.stopDragBound = this.stopDrag.bind(this) as EventListener;
    document.addEventListener("mousemove", this.dragBound);
    document.addEventListener("touchmove", this.dragBound);
    document.addEventListener("mouseup", this.stopDragBound);
    document.addEventListener("touchend", this.stopDragBound);

    // testing
    let str: string = "";
    str = e instanceof MouseEvent ? `${e.clientX}` : "touch";
    console.log(`drag start at - ${str}`);
  }

  private drag(event: MouseEvent | TouchEvent): void {
    event.preventDefault();

    const currentPosition =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    let movementX = currentPosition - this.position - this.model.getThumbSize();
    if (movementX < 0) {
      movementX = 0;
    } else if (movementX > this.model.getMax()) {
      movementX = this.model.getMax();
    }
    this.updatePosition(movementX);
    this.notifyObservers();
  }
  private stopDrag(): void {
    this.model.disableDrag();
    document.removeEventListener("mousemove", this.dragBound);
    document.removeEventListener("touchmove", this.dragBound);
    document.removeEventListener("mouseup", this.stopDragBound);
    document.removeEventListener("touchend", this.stopDragBound);
    console.log(`is dragging: ${this.model.isDragging}`);
  }
}
