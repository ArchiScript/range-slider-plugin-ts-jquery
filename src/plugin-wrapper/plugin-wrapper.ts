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
import { Config } from "../ConfigService/Config";

import $ from "jquery";
function rangeSlider(
  this: JQuery<HTMLElement>,
  opts?: IOptions
): JQuery<HTMLElement> {
  let pluginInstance: JQuery<HTMLElement> = this;

  this.each(function () {
    const container = this;

    Config.set(container, opts).getOptions();
    const rangeSliderView = new RangeSliderView(container);
    const rangeSliderModel = new RangeSlider();
    const trackView = rangeSliderView.getTrackView();
    const trackModel = new TrackModel();
    const trackPresenter = new TrackPresenter(trackModel, trackView);
    const thumbView = rangeSliderView.getThumbView();
    const thumbModel = new ThumbModel();
    const thumbPresenter = new ThumbPresenter(thumbModel, thumbView);
    const fillView = rangeSliderView.getFillView();
    const fillModel = new FillModel();
    const fillPresenter = new FillPresenter(fillModel, fillView);
    const rangeSliderPresenter = new RangeSliderPresenter(
      rangeSliderModel,
      rangeSliderView,
      trackPresenter,
      thumbPresenter,
      fillPresenter
    );
    $(container).data("rangeSliderInstances", {
      rangeSliderPresenter,
      rangeSliderView,
      rangeSliderModel,
      trackView,
      trackModel,
      trackPresenter,
      thumbView,
      thumbModel,
      thumbPresenter,
      fillView,
      fillModel,
      fillPresenter
    });

    pluginInstance.setValue = function (
      value: number | number
    ): JQuery<HTMLElement> {
      thumbPresenter.externalSetValue(value);
      return pluginInstance;
    };
    pluginInstance.updateOptions = function (
      options: IOptions
    ): JQuery<HTMLElement> {
      Config.getInstance().updateOptions(options);

      update(container);
      return pluginInstance;
    };
  });

  return pluginInstance;
}

function update(container: HTMLElement): void {
  const instances = $(container).data("rangeSliderInstances");
  if (instances) {
    const options = Config.getInstance().getOptions();

    instances.trackModel.updateOptions(options);
    instances.trackView.updateOptions(options);
    instances.trackPresenter.updateOptions(options);
    instances.thumbModel.updateOptions(options);
    instances.thumbView.updateOptions(options);
    instances.thumbPresenter.updateOptions(options);
    instances.fillModel.updateOptions(options);
    instances.fillView.updateOptions(options);
    instances.fillPresenter.updateOptions(options);
    instances.rangeSliderModel.updateOptions(options);
    instances.rangeSliderView.updateOptions(options);
    instances.rangeSliderPresenter.updateOptions(options);
  }
}

$.fn.rangeSlider = rangeSlider;

// $.fn.rangeSlider = function (opts?: IOptions) {
//   return rangeSlider.call(this, opts);
// };
