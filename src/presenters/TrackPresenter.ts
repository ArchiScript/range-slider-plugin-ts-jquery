import { ITrackView } from "../types/IViews/ITrackView";
import { ITrackModel } from "../types/IModels/ITrackModel";
import { ITrackPresenter } from "../types/IPresenters/ITrackPresenter";
import { IObserver } from "../types/IObserver";
import { Mediator } from "./Mediator";
import { ConfigService } from "../ConfigService/ConfigService";
import { Config } from "../ConfigService/Config";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { Ruler } from "../models/Ruler";
import { config } from "chai";

export class TrackPresenter implements ITrackPresenter, IObserver {
  private mediator?: Mediator;
  private options: IOptions = Config.getInstance().getOptions();
  private ruler: Ruler;
  private tickStep: number;
  private $trackElement: HTMLElement;
  constructor(private trackModel: ITrackModel, private trackView: ITrackView) {
    this.trackModel = trackModel;
    this.trackView = trackView;
    this.$trackElement = trackView.getTrackElement();
    console.log(this.$trackElement);

    this.ruler = new Ruler();
    this.tickStep = this.options.tickStep
      ? this.options.tickStep
      : this.ruler.getCalculatedTickStep(this.options.max as number);
    this.init();
  }

  init(): void {
    this.trackModel.addObserver(this);
    this.trackView.addPositionChangeListener(this.trackClickHandler.bind(this));
    this.updateView();

    console.log(this.options);
  }

  update(clickPosition: number): void {
    this.updateView();
  }
  private updateView(): void {
    this.trackView.render(
      this.trackModel.getWidth(),
      this.trackModel.getHeight(),
      this.tickStep
    );
  }
  private test(): void {
    console.log("testing");
  }
  onThumbPositionChange(position: number): void {}
  trackClickHandler(e: MouseEvent | TouchEvent): void {
    if (e instanceof MouseEvent) {
      const startPoint =
        this.options.orientation === "horizontal"
          ? this.$trackElement.getBoundingClientRect().left
          : this.$trackElement.getBoundingClientRect().top;
      let position: number =
        this.options.orientation === "horizontal"
          ? e.clientX - startPoint + (this.options.thumbSize as number) / 2
          : e.clientY - startPoint + (this.options.thumbSize as number) / 2;
      console.log(`startPoint ----${startPoint}`);
      console.log(
        `---containerViewportLeft: ${this.$trackElement.offsetLeft}\n ---containerViewportTop: ${this.$trackElement.offsetTop}`
      );
      console.log(position);
      this.onThumbPositionChange(position);
      this.mediator?.notifyTrackClick(position);
    }
  }
  setMediator(mediator?: Mediator): void {
    if (mediator) this.mediator = mediator;
  }
  getTrackStartPoint(): { left: number; top: number } {
    return {
      left: this.$trackElement.getBoundingClientRect().left,
      top: this.$trackElement.getBoundingClientRect().top
    };
  }
}
