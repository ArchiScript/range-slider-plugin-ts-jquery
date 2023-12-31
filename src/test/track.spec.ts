import Mocha from "mocha";
import chai from "chai";
import { expect } from "chai";

import * as components from "../components/components";

import { mock, el } from "./thumb.spec";

describe("Test RangeSlider Track", () => {
  describe("Test trackModel", () => {
    it("getWidth() should have a current track width according to options = 300", () => {
      expect(mock.trackModel.getWidth()).to.equal(300);
    });
    it("setWidth() should have a track width equal to set width 400 (%)", () => {
      mock.trackModel.setWidth(400);
      expect(mock.trackModel.getWidth()).to.equal(400);
    });
    it("getHeight() should have a track height equal to default options = 6 (px)", () => {
      expect(mock.trackModel.getHeight()).to.equal(6);
    });

    it("setHeight() should have a track height equal to set height 30 (px)", () => {
      mock.trackModel.setHeight(30);
      expect(mock.trackModel.getHeight()).to.equal(30);
    });
  });
  describe("Test trackView", () => {
    it("getTrackElement() should have a returned track HTMLElement = true", () => {
      expect(mock.trackView.getTrackElement() instanceof HTMLElement).to.be
        .true;
    });

    it("getTrackElement() should have a class of returned track element = range-slider__track", () => {
      expect(
        mock.trackView
          .getTrackElement()
          .classList.contains("range-slider__track")
      ).to.be.true;
    });
    it("getRuler() should have Ruler instance = true", () => {
      expect(mock.trackView.getRuler() instanceof components.Ruler).to.be.true;
    });
  });
  describe("Test trackPresenter", () => {
    it("getTrackStartPoint() should get trackElement's start point as an object {left:number,top: number}", () => {
      const returnObj: { left: number; top: number } =
        mock.trackPresenter.getTrackStartPoint();
      expect(typeof mock.trackPresenter.getTrackStartPoint() == "object").to.be
        .true;
      expect("left" in returnObj && "top" in returnObj).to.be.true;
    });
  });
});
