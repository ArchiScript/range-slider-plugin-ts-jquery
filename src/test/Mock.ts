import { RangeSliderView } from "../views/RangeSliderView";
import { RangeSlider } from "../models/RangeSlider";
import { RangeSliderPresenter } from "../presenters/RangeSliderPresenter";
import { TrackPresenter } from "../presenters/TrackPresenter";
import { TrackModel } from "../models/TrackModel";
import { TrackView } from "../views/TrackView";
import { ThumbModel } from "../models/ThumbModel";
import { ThumbPresenter } from "../presenters/ThumbPresenter";
import { ThumbView } from "../views/ThumbView";
import { FillModel } from "../models/FillModel";
import { FillPresenter } from "../presenters/FillPresenter";
import { FillView } from "../views/FillView";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { ConfigService } from "../ConfigService/ConfigService";
import { Config } from "../ConfigService/Config";

interface MockRangeSliderObject {
  options: IOptions;
  container: HTMLElement;
  rangeSliderView: RangeSliderView;
  rangeSliderModel: RangeSlider;
  rangeSliderPresenter: RangeSliderPresenter;
  trackView: TrackView;
  trackModel: TrackModel;
  trackPresenter: TrackPresenter;
  thumbView: ThumbView | ThumbView[];
  thumbModel: ThumbModel;
  thumbPresenter: ThumbPresenter;
  fillView: FillView;
  fillModel: FillModel;
  fillPresenter: FillPresenter;
}

export default class Mock {
  private options: IOptions;
  private container: HTMLElement;
  private rangeSliderView: RangeSliderView;
  private rangeSliderModel: RangeSlider;
  private rangeSliderPresenter: RangeSliderPresenter;
  private trackView: TrackView;
  private trackModel: TrackModel;
  private trackPresenter: TrackPresenter;
  private thumbView: ThumbView | ThumbView[];
  private thumbModel: ThumbModel;
  private thumbPresenter: ThumbPresenter;
  private fillView: FillView;
  private fillModel: FillModel;
  private fillPresenter: FillPresenter;

  constructor(parentElement: HTMLElement) {
    this.container = parentElement;
    this.options = Config.set(this.container, {
      max: 200,
      step: 5
    }).getOptions();
    this.rangeSliderView = new RangeSliderView(this.container);
    this.rangeSliderModel = new RangeSlider();
    this.trackView = this.rangeSliderView.getTrackView();
    this.trackModel = new TrackModel();
    this.trackPresenter = new TrackPresenter(this.trackModel, this.trackView);
    this.thumbView = this.rangeSliderView.getThumbView();
    this.thumbModel = new ThumbModel();
    this.thumbPresenter = new ThumbPresenter(this.thumbModel, this.thumbView);
    this.fillView = this.rangeSliderView.getFillView();
    this.fillModel = new FillModel();
    this.fillPresenter = new FillPresenter(this.fillModel, this.fillView);
    this.rangeSliderPresenter = new RangeSliderPresenter(
      this.rangeSliderModel,
      this.rangeSliderView,
      this.trackPresenter,
      this.thumbPresenter,
      this.fillPresenter
    );
  }
  private renderMockElement(): void {
    document.body.appendChild(this.getMockContainer());
  }

  getMockContainer(): HTMLElement {
    const container: HTMLElement = document.createElement("div");
    container.setAttribute("class", "mock-container");
    return container;
  }

  getMockRangeSlider(): MockRangeSliderObject {
    return {
      options: this.options,
      container: this.container,
      rangeSliderView: this.rangeSliderView,
      rangeSliderModel: this.rangeSliderModel,
      rangeSliderPresenter: this.rangeSliderPresenter,
      trackView: this.trackView,
      trackModel: this.trackModel,
      trackPresenter: this.trackPresenter,
      thumbView: this.thumbView,
      thumbModel: this.thumbModel,
      thumbPresenter: this.thumbPresenter,
      fillView: this.fillView,
      fillModel: this.fillModel,
      fillPresenter: this.fillPresenter
    };
  }
}
