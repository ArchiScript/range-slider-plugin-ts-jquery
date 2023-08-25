import Mocha from "mocha";
import chai from "chai";
import { assert, expect } from "chai";
import Mock from "./Mock";
import { JSDOM } from "jsdom";
import { IOptions } from "../types/IConfigurationService/IOptions";
import * as puppeteer from "puppeteer";
import { chromium, Browser, Page } from "playwright";

import * as components from "../components/components";

const jsdom = new JSDOM(
  '<!doctype html><html><body><div class="test" style="margin-left: 200px"></div></body></html>'
);
const { window } = jsdom;

global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.Element = window.Element;
global.Node = window.Node;
global.getComputedStyle = window.getComputedStyle;

const el = jsdom.window.document.querySelector(".test") as HTMLElement;

el.style.width = "300px";

const mockOpts: IOptions = {
  max: 200,
  step: 5
};
const mock = new Mock(el, mockOpts).getMockRangeSlider();
export { mock };
describe("Test RangeSlider Thumb-single", () => {
  before(() => {});

  describe("Test userOptions merged with defaults", () => {
    it("should have options step value = 5", () => {
      expect(mock.options.step).to.equal(5);
    });

    it("should have options min value = 0", () => {
      expect(mock.options.min).to.equal(0);
    });
    it("should have options max value = 200", () => {
      expect(mock.options.max).to.equal(200);
    });
    it("should have options initial value = 0", () => {
      expect(mock.options.value).to.equal(0);
    });
    it("should have options track height = 10", () => {
      expect(mock.options.trackHeight).to.equal(10);
    });
    it("should have options tooltip = true", () => {
      expect(mock.options.tooltip).to.be.true;
    });
    it("should have options thumbsize = 15", () => {
      expect(mock.options.thumbSize).to.equal(15);
    });
    it("should have options doublePoing = false", () => {
      expect(mock.options.doublePoint).to.be.false;
    });
    it("should have options container width = 300", () => {
      expect(mock.options.containerWidth).to.equal(300);
    });
  });

  describe("Test thumbModel", () => {
    it("should have the value of set value = 62", () => {
      mock.thumbModel.setValue(62);
      expect(mock.thumbModel.getValue()).to.equal(62);
    });

    it("should have correct proportion container width/max value 300-15/200=1.425", () => {
      expect(mock.thumbModel.getProportion()).to.equal(1.425);
    });

    it("should have correct computed style for container width", () => {
      const containerWidth = mock.thumbModel.getContainerWidth();
      expect(containerWidth).to.equal(300);
    });

    it("should have options step position = 5*proportion(1.425)=7.125", () => {
      expect(mock.thumbModel.getStep()).to.equal(7.125);
    });
    it("should have position of set position = 42", () => {
      mock.thumbModel.setPosition(42);
      expect(mock.thumbModel.getPosition()).to.equal(42);
    });
    it("sould have isDragging = false", () => {
      expect(mock.thumbModel.isDragging).to.be.false;
    });
    it("shold have observerList length = 1 ", () => {
      expect(mock.thumbModel.getObservers().length).to.equal(1);
    });
  });

  describe("Test thumbPresenter", () => {
    it("should have correct value for isDoubleThumb = false", () => {
      const isDoubleThumb = mock.thumbPresenter.isDouble;
      expect(isDoubleThumb).to.be.false;
    });

    it("should have initial value = 0", () => {
      expect(mock.thumbPresenter.getValue()).to.equal(0);
    });

    it("should have validated value if set wrong(-10) = 0, if set > max = max- thumb width = 285", () => {
      expect(mock.thumbPresenter.validateMinMax(-10)).to.equal(0);
      expect(mock.thumbPresenter.validateMinMax(320)).to.equal(285);
    });
    it("should have round position according to step proportion, if pos= 42.35=>42.75", () => {
      expect(mock.thumbPresenter.setStep(42.35)).to.equal(42.75);
    });
  });

  describe("Test thumbView", () => {
    const thumb = el.querySelector(".range-slider__thumb") as HTMLElement;
    let thView = mock.thumbView as components.ThumbView;

    it("should have an HTMLElement thumb !=null", () => {
      expect(thumb != null).to.be.true;
    });
    it("should have a thumb data-id = 1", () => {
      expect(thumb.dataset.id).equal("1");
    });
    it("should have a thumb  initial data-value = 0", () => {
      mock.thumbModel.setValue(0);
      mock.thumbPresenter.setThumbDataValue(mock.thumbView);
      expect(thumb.dataset.value).equal("0");
    });
    it("should have a thumb data-value = the set data-value =48", () => {
      mock.thumbModel.setValue(48);
      expect(thumb.dataset.value).equal("48");
    });
    it("should have a thumbView id = 1", () => {
      expect(thView.getThumbViewId()).to.equal(1);
    });

    it("should have current thumb current position(marginLeft) = 42", () => {
      mock.thumbModel.setPosition(42);
      expect(thView.getThumbCurrentPosition()).to.equal(42);
    });
    it("should have type of returned thumb = HTMLElement", () => {
      expect(thView.getThumbElement() instanceof HTMLElement).to.be.true;
    });
  });
});

describe("Test Range-slider Double-point", () => {
  const mockOpts: IOptions = {
    max: 200,
    step: 10,
    value: [30, 70],
    doublePoint: true
  };

  const el = jsdom.window.document.querySelector(".test") as HTMLElement;
  el.style.width = "300px";

  const mock = new Mock(el, mockOpts).getMockRangeSlider();
  describe("Test ThumbModel Double-point", () => {
    it("should have an instance id of mock class = 2", () => {
      expect(mock.options.instanceId).to.be.equal(2);
    });
    it("should have double-point = true", () => {
      expect(mock.options.doublePoint).to.be.true;
    });
    it("should have type of position = Array", () => {
      expect(Array.isArray(mock.thumbModel.getPosition())).to.be.true;
    });
    it("should have a valueArr of set valueArr = 54,78", () => {
      let setArr: number[] = [54, 78];
      mock.thumbModel.setValue(setArr);
      let getArr: number[] = mock.thumbModel.getValue() as number[];
      let arraysEqual: boolean =
        getArr[0] === setArr[0] && getArr[1] === setArr[1];

      expect(arraysEqual).to.be.true;
    });
    it("should have position of set position Array = 56,99", () => {
      let posArr: number[] = [56, 99];
      mock.thumbModel.setPosition(posArr);
      expect(mock.thumbModel.getPosition()).to.equal(posArr);
    });
  });
  describe("Test thumbView Double-point", () => {
    let viewsArr: components.ThumbView[] =
      mock.rangeSliderView.getThumbViews() as components.ThumbView[];
    it("should have array of views", () => {
      expect(Array.isArray(viewsArr)).to.be.true;
    });
    it("should return correct double-point position array", () => {
      let posArr = [23, 65];
      mock.thumbModel.setPosition(posArr);
      let viewsArr =
        mock.rangeSliderView.getThumbViews() as components.ThumbView[];
      let movement: number = 77;
      mock.thumbPresenter.setThumbDataValue(viewsArr);
      mock.thumbPresenter.setTestActiveThumb(
        viewsArr[1].getThumbElement(),
        viewsArr
      );

      viewsArr.forEach((view, index) =>
        view.render(posArr[index], mock.thumbModel.getValue())
      );
      let newPos: number[] = mock.thumbPresenter.setDoubleThumbPosition(
        movement,
        viewsArr
      );
      let arraysEqual = posArr[0] === newPos[0] && movement === newPos[1];
      expect(arraysEqual).to.be.true;
    });

    it("should have a tooltip HTMLElement", () => {
      if (Array.isArray(mock.thumbView)) {
        mock.thumbView.forEach((view) => {
          expect(view.getTooltipElement() instanceof HTMLElement).to.be.true;
        });
      } else {
        expect(mock.thumbView.getTooltipElement());
      }
    });
  });
});
