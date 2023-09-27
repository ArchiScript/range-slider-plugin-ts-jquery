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

import { IChangeEvent } from "types/IChangeEvent";
import { EventDispatcher } from "EventDispatcher";

import $ from "jquery";
function rangeSlider(
  this: JQuery<HTMLElement>,
  opts?: IOptions
): JQuery<HTMLElement> {
  let pluginInstance: JQuery<HTMLElement> = this;

  this.each(function () {
    const container = this;

    const options = Config.set(container, opts).getOptions();
    pluginInstance.id = options.instanceId as number;
    // console.log(pluginInstance.id);
    pluginInstance.config = Config.getInstanceById(pluginInstance.id);
    const id = options.instanceId as number;
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
    pluginInstance.getValue = function (): number | number[] {
      const value = thumbPresenter.getValue();
      return value;
    };
    pluginInstance.updateOptions = function (
      options: IOptions
    ): JQuery<HTMLElement> {
      // Config.getInstance().updateOptions(options);
      pluginInstance.config.updateOptionsExact(pluginInstance.config, options);
      console.log(pluginInstance.config.getOptions());
      update(container, id);
      return pluginInstance;
    };
    pluginInstance.getOptions = function (): IOptions {
      return Config.getInstance().getOptions();
    };

    pluginInstance.onChange = function (userHandler: Function): void {
      thumbPresenter.ExternalAddOnChangeListener(userHandler);
    };

    pluginInstance.getContainer = function (): HTMLElement {
      return container;
    };
    pluginInstance.getPluginConfig = function (): {
      pluginId: number;
      config: Config;
    } {
      const conf = Config.getConfigObjectById(id);
      return conf;
    };

    pluginInstance.getContainerId = function (): number {
      return options.instanceId as number;
    };
  });

  return pluginInstance;
}

function update(container: HTMLElement, id: number): void {
  const instances = $(container).data("rangeSliderInstances");
  if (instances) {
    instances.trackModel.updateOptions(id);
    instances.trackView.updateOptions(id);
    instances.trackPresenter.updateOptions(id);
    instances.thumbModel.updateOptions(id);
    if (Array.isArray(instances.thumbView)) {
      instances.thumbView.forEach(
        (view: { updateOptions: (id: number) => void }) =>
          view.updateOptions(id)
      );
    } else {
      instances.thumbView.updateOptions(id);
    }

    instances.thumbPresenter.updateOptions(id);
    instances.fillModel.updateOptions(id);
    instances.fillView.updateOptions(id);
    instances.fillPresenter.updateOptions();
    instances.rangeSliderModel.updateOptions(id);
    instances.rangeSliderView.updateOptions(id);
    instances.rangeSliderPresenter.updateOptions(id);
  }
}

$.fn.rangeSlider = rangeSlider;
