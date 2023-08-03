import Mocha from "mocha";
import chai from "chai";
import { expect } from "chai";

import * as components from "../components/components";

import { mock } from "./thumb.spec";

describe("Test RangeSlider Track", () => {
  describe("Test trackModel", () => {
    it("should have a current track width in % according to options = 100%", () => {
      expect(mock.trackModel.getWidth()).to.equal(100);
    });
    it("should have a track width equal to set width 400 (%)", () => {
      mock.trackModel.setWidth(400);
      expect(mock.trackModel.getWidth()).to.equal(400);
    });
    it("should have a track height equal to default options = 10 (px)", () => {
      expect(mock.trackModel.getHeight()).to.equal(10);
    });

    it("should have a track height equal to set height 30 (px)", () => {
      mock.trackModel.setHeight(30);
      expect(mock.trackModel.getHeight()).to.equal(30);
    });
  });
  describe("Test trackView", () => {
    it("should have a returned track HTMLElement = true", () => {
      expect(mock.trackView.getTrackElement() instanceof HTMLElement).to.be
        .true;
    });
    it("should have a class of returned track element = range-slider__track", () => {
      expect(
        mock.trackView
          .getTrackElement()
          .classList.contains("range-slider__track")
      ).to.be.true;
    });
  });
});
