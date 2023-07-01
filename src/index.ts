import "./assets/styles/style.scss";
import { RangeSliderView } from "./views/RangeSliderView";
import { RangeSlider } from "./models/RangeSlider";
import { RangeSliderPresenter } from "./presenters/RangeSliderPresenter";
import { TrackPresenter } from "./presenters/TrackPresenter";
import { TrackModel } from "./models/TrackModel";
import { TrackView } from "./views/TrackView";
import { ThumbModel } from "./models/ThumbModel";
import { ThumbPresenter } from "./presenters/ThumbPresenter";
// import { rangeSlider } from "./plugin-wrapper/plugin-wrapper";

const cont: HTMLElement = document.querySelector(".range-slider__container")!;
const view = new RangeSliderView(cont);
const model = new RangeSlider();
const trackView = view.getTrackView();
const trackModel = new TrackModel();
const trackPresenter = new TrackPresenter(trackModel, trackView);
const thumbView = view.getThumbView();
const thumbModel = new ThumbModel();
const thumbPresenter = new ThumbPresenter(
  thumbModel,
  thumbView
);
const presenter = new RangeSliderPresenter(
  model,
  view,
  trackPresenter,
  thumbPresenter
);
