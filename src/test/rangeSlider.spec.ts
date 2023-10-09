import Mocha from "mocha";
import chai from "chai";
import { expect } from "chai";

import * as components from "../components/components";

import { mock } from "./thumb.spec";

describe("Test Range-sliderView", () => {
  it("getTrackView() should return a TrackView", () => {
    expect(mock.rangeSliderView.getTrackView() instanceof components.TrackView)
      .to.be.true;
  });
  it("getThumbView() should return a ThumbView", () => {
    expect(mock.rangeSliderView.getThumbView() instanceof components.ThumbView)
      .to.be.true;
  });
  it("getFillView() should return a FillView", () => {
    expect(mock.rangeSliderView.getFillView() instanceof components.FillView).to
      .be.true;
  });
});
