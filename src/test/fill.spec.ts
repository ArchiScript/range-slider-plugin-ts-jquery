import Mocha from "mocha";
import chai from "chai";
import { expect } from "chai";

import * as components from "../components/components";

import { mock } from "./thumb.spec";

describe("Test RangeSlider Fill", () => {
  describe("Test fillModel", () => {
    it("should have the correct fill width= pos 55 + thumb 15 = 70 ", () => {
      expect(mock.fillModel.calculateFillWidth(55)).to.equal(70);
    });

    it("should have the fill position of set fill position = 67", () => {
      mock.fillModel.setFillPosition(67);
      expect(mock.fillModel.getFillPosition()).to.equal(67);
    });

    it("should have the fill array position of set fill array position = 67,143", () => {
      mock.fillModel.setFillPosition([67, 143]);
      let getArr: number[] = mock.fillModel.getFillPosition() as number[];
      let arraysEqual = getArr[0] === 67 && getArr[1] === 143;
      expect(arraysEqual).to.be.true;
    });

    it("should have the fill width = pos1 143 - pos2 67 + thumb 15= 91", () => {
      expect(mock.fillModel.getFillWidth()).to.equal(91);
    });
  });

  describe("Test fillView", () => {
    it("should have fill element returned from fillView", () => {
      let fill = mock.fillView.getFillElement();
      expect(fill instanceof HTMLElement).to.be.true;
      expect(fill.classList.contains("range-slider__fill")).to.be.true;
      
    });
  });
});
