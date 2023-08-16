import { RangeSliderView } from "../views/RangeSliderView";
import { RangeSlider } from "../models/RangeSlider";
import { RangeSliderPresenter } from "../presenters/RangeSliderPresenter";
import { TrackPresenter } from "../presenters/TrackPresenter";
import { TrackModel } from "../models/TrackModel";
import { TrackView } from "../views/TrackView";
import { ThumbModel } from "../models/ThumbModel";
import { ThumbPresenter } from "../presenters/ThumbPresenter";
import { FillModel } from "../models/FillModel";
import { FillPresenter } from "../presenters/FillPresenter";
import { FillView } from "../views/FillView";
import { IOptions } from "../types/IConfigurationService/IOptions";
import { ConfigService } from "../ConfigService/ConfigService";
import { Config } from "../ConfigService/Config";
// import "../types/range-slider.d";

import $ from "jquery";
function rangeSlider(
  this: JQuery<HTMLElement>,
  opts?: IOptions
): JQuery<HTMLElement> {
  const pluginInstance: JQuery<HTMLElement> = this;
  this.each(function () {
    const container = this;

    const options = Config.set(container, opts).getOptions();
    const view = new RangeSliderView(container);
    const model = new RangeSlider();
    const trackView = view.getTrackView();
    const trackModel = new TrackModel();
    const trackPresenter = new TrackPresenter(trackModel, trackView);
    const thumbView = view.getThumbView();
    const thumbModel = new ThumbModel();
    const thumbPresenter = new ThumbPresenter(thumbModel, thumbView);
    const fillView = view.getFillView();
    const fillModel = new FillModel();
    const fillPresenter = new FillPresenter(fillModel, fillView);
    const presenter = new RangeSliderPresenter(
      model,
      view,
      trackPresenter,
      thumbPresenter,
      fillPresenter
    );
    pluginInstance.setValue = function (
      value: number | number
    ): JQuery<HTMLElement> {
      thumbPresenter.externalSetValue(value);
      return pluginInstance;
    };
  });

  return pluginInstance;
}

$.fn.rangeSlider = rangeSlider;

// $.fn.rangeSlider = function (opts?: IOptions) {
//   return rangeSlider.call(this, opts);
// };
