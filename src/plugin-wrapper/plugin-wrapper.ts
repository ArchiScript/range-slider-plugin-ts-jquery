import { RangeSliderView } from "../views/RangeSliderView";
import { RangeSlider } from "../models/RangeSlider";
import { RangeSliderPresenter } from "../presenters/RangeSliderPresenter";
import { TrackPresenter } from "../presenters/TrackPresenter";
import { TrackModel } from "../models/TrackModel";
import { TrackView } from "../views/TrackView";
import { ThumbModel } from "../models/ThumbModel";
import { ThumbPresenter } from "../presenters/ThumbPresenter";
import { IOptions } from "../types/IOptions";

import $ from "jquery";
export function rangeSlider(
  this: JQuery<HTMLElement>,
  opts: IOptions
): JQuery<HTMLElement> {
  this.each(function () {
    const container = this;
    const view = new RangeSliderView(container);
    const model = new RangeSlider();
    const trackView = view.getTrackView();
    const trackModel = new TrackModel();
    const trackPresenter = new TrackPresenter(trackModel, trackView);
    const thumbView = view.getThumbView();
    const thumbModel = new ThumbModel();
    const thumbPresenter = new ThumbPresenter(thumbModel, thumbView);
    const presenter = new RangeSliderPresenter(
      model,
      view,
      trackPresenter,
      thumbPresenter,
      opts
    );
  });
  return this;
}

$.fn.rangeSlider = rangeSlider;
