import { IThumbPresenter } from "../types/IPresenters/IThumbPresenter";
import { IThumbModel } from "../types/IModels/IThumbModel";
import { IThumbView } from "../types/IViews/IThumbView";
import { IObserver } from "../types/IObserver";
import { ConfigService } from "../ConfigService/ConfigService";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { Mediator } from "./Mediator";
export class ThumbPresenter implements IThumbPresenter, IObserver {
  private model: IThumbModel;
  private view: IThumbView;
  private mediator?: Mediator;
  private position: number;
  private value: number;
  // private startPosition: number;
  private dragBound!: EventListenerOrEventListenerObject;
  private stopDragBound!: EventListenerOrEventListenerObject;
  private observers: IObserver[] = [];
  private options: IOptions = ConfigService.getInstance().getOptions();
  constructor(model: IThumbModel, view: IThumbView) {
    this.model = model;
    this.view = view;
    this.position = this.model.getProportionValue(this.options.value as number);
    this.value = this.model.getValue();
    this.init();
  }

  init(): void {
    this.model.addObserver(this);
    this.model.setPosition(this.position);
    this.view.addStartDragListener(this.startDrag.bind(this));
    this.test();
    this.updateView();
  }
  getValue(): number {
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
      observer.update(this.model.getValue());
      console.log(`notifyobserver: ${this.model.getValue()}`);
    }
  }
  update(value: number): void {
    this.updateView();
  }

  updatePosition(value: number): void {
    this.model.setPosition(value);
  }
  updateView(): void {
    this.view.render(this.model.getPosition());
  }

  public getCurrentPosition(): number {
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

    let currentPosition =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;

    let movementX =
      currentPosition - this.model.getMin() - this.model.getThumbSize();

    let max = this.model.getContainerWidth() - this.model.getThumbSize();
    if (movementX < 0) {
      movementX = 0;
    } else if (movementX > max) {
      movementX = max;
    }
    this.updatePosition(movementX);
    this.model.setValue(movementX);
    this.mediator?.setFill(movementX + (this.options.thumbSize as number));

    console.log(
      `========= getValue${this.model.getValue()}+++++++ movementX: ${movementX}`
    );
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
  public onTrackClick(clickPosition: number): void {
    const pos = clickPosition - this.model.getThumbSize();
    console.log(`clickPosition ${pos}`);
    this.updatePosition(pos);
    this.model.setValue(pos);
    this.notifyObservers();
    console.log(`----set value: ${pos}`);
  }
  getInitPosition(): number {
    return this.model.getProportionValue(this.position);
  }
  private test(): void {
    this.mediator?.setFill(44);
  }
}
