import { ITrackView } from "../types/IViews/ITrackView";
import { ITrackModel } from "../types/IModels/ITrackModel";
import { ITrackPresenter } from "../types/IPresenters/ITrackPresenter";
import { IObserver } from "../types/IObserver";
import { Mediator } from "./Mediator";
import { Config } from "../ConfigService/Config";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { Ruler } from "../models/Ruler";
import { config } from "chai";

export class TrackPresenter implements ITrackPresenter, IObserver {
  private mediator?: Mediator;
  private options: IOptions;
  private ruler!: Ruler;
  private tickStep!: number;
  private $trackElement!: HTMLElement;
  constructor(private trackModel: ITrackModel, private trackView: ITrackView) {
    this.options = Config.getInstance().getOptions();
    this.trackModel = trackModel;
    this.trackView = trackView;
    this.init();
  }
  updateOptions(id: number): void {
    this.options = Config.getInstanceById(id).getOptions();
    this.init();
  }
  init(): void {
    this.$trackElement = this.trackView.getTrackElement();

    this.tickStep = this.options.tickStep
      ? this.options.tickStep
      : this.trackView
          .getRuler()
          .getCalculatedTickStep(this.options.max as number);
    this.trackModel.addObserver(this);
    this.trackView.addPositionChangeListener(this.trackClickHandler.bind(this));
    this.updateView();
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
