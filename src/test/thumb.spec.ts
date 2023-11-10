import Mocha from "mocha";
import chai from "chai";
import { assert, expect } from "chai";
import Mock from "./Mock";
import { JSDOM } from "jsdom";
import { IOptions } from "../types/IConfigurationService/IOptions";
import sinon from "sinon";
import * as components from "../components/components";

const jsdom = new JSDOM(
  '<!doctype html><html><body><div class="test-plugin--1" style="margin-left: 200px"></div><div class="test-plugin--2" style="margin-left: 200px"></div></body></html>'
);
const { window } = jsdom;

global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.Element = window.Element;
global.Node = window.Node;
global.getComputedStyle = window.getComputedStyle;

export const el = jsdom.window.document.querySelector(
  ".test-plugin--1"
) as HTMLElement;
export const el2 = jsdom.window.document.querySelector(
  ".test-plugin--2"
) as HTMLElement;

el.style.width = "300px";
el.style.height = "350px";
el2.style.width = "300px";
const mockOpts: IOptions = {
  max: 200,
  min: 0,
  step: 5,
  thumbAnimation: false
};
const mock = new Mock(el, mockOpts).getMockRangeSlider();
export { mock };
describe("Test RangeSlider Thumb-single", () => {
  describe("Test thumbModel", () => {
    it("setValue() should have the value of set value = 62", () => {
      mock.thumbModel.setValue(62);
      expect(mock.thumbModel.getValue()).to.equal(62);
    });

    it("getValue() should have initial value = 0", () => {
      mock.thumbModel.setValue(0);
      expect(mock.thumbPresenter.getValue()).to.equal(0);
    });

    it("getProportion() should have correct proportion container width/max value 300-15/200=1.425", () => {
      expect(mock.thumbModel.getProportion()).to.equal(1.425);
    });

    it("getContainerWidth() should have correct computed style for container width", () => {
      const containerWidth = mock.thumbModel.getContainerWidth();
      expect(containerWidth).to.equal(300);
    });

    it("getStep() should have options step position = 5*proportion(1.425)=7.125", () => {
      expect(mock.thumbModel.getStep()).to.equal(7.125);
    });
    it("set/getPosition() should have position of set position = 42", () => {
      mock.thumbModel.setPosition(42);
      expect(mock.thumbModel.getPosition()).to.equal(42);
    });
    it("getThumbSize() should return the size of the thumb = 15", () => {
      expect(mock.thumbModel.getThumbSize()).to.equal(15);
    });

    it("getMin() should return current Min = 0", () => {
      expect(mock.thumbModel.getMin()).to.equal(0);
    });

    it("getMax() should return current Max = 200", () => {
      expect(mock.thumbModel.getMax()).to.equal(200);
    });

    it("convertToValue()  should have converted position 105 to value = 74", () => {
      expect(mock.thumbModel.convertToValue(105)).to.equal(74);
    });

    it("convertToPosition() should have converted value 105 to position 149.625", () => {
      expect(mock.thumbModel.convertToPosition(105)).to.equal(149.625);
    });
    it("isDragging should have = false", () => {
      expect(mock.thumbModel.isDragging).to.be.false;
    });
    it("enableDrag() should make isDragging to be true", () => {
      mock.thumbModel.disableDrag();
      expect(mock.thumbModel.isDragging).to.be.false;
    });
    it("disableDrag() should make isDragging to be false again", () => {
      mock.thumbModel.enableDrag();
      expect(mock.thumbModel.isDragging).to.be.true;
    });
    it("getObservers() should have observerList length = 1 ", () => {
      expect(mock.thumbModel.getObservers().length).to.equal(1);
    });
    it("validateAscendingArr() should have reversed arr [75,25] if not ascending [25,75]", () => {
      const validatedArr = mock.thumbModel.validateAscendingArr([
        75, 25
      ]) as number[];
      const validated =
        (validatedArr[0] as number) === 25 &&
        (validatedArr[1] as number) === 75;
      expect(validated).to.be.true;
    });
    it("mergeWithPosition() should have merged object = {[62,70],[88,100]}", () => {
      const mergedObj = mock.thumbModel.mergeWithPosition([88, 100]);
      expect("val" in mergedObj && "pos" in mergedObj).to.be.true;
      let val: number[] = mergedObj.val as number[],
        pos: number[] = mergedObj.pos as number[];
      expect(val[0] == 62 && val[1] == 70).to.be.true;
      expect(pos[0] == 88 && pos[1] == 100).to.be.true;
    });

    it("mergeWithValue() should have merged object = {[144,266],[205.2,379.05]}", () => {
      const mergedObj = mock.thumbModel.mergeWithValue([144, 266]);
      expect("val" in mergedObj && "pos" in mergedObj).to.be.true;
      let val: number[] = mergedObj.val as number[],
        pos: number[] = mergedObj.pos as number[];
      expect(val[0] == 144 && val[1] == 266).to.be.true;
      expect(pos[0] == 205.2 && pos[1] == 379.05).to.be.true;
    });

    it("setContainerOrientationValue() should have a current orientation container size (300 - thumbSize = 285)", () => {
      expect(mock.thumbModel.setContainerOrientationValue()).to.equal(285);
    });

    it("getContainerHeight() should return the container height-label = 290", () => {
      expect(mock.thumbModel.getContainerHeight()).to.equal(290);
    });

    it("splitNum() should return arr each number accum the prev =>30 to 3 parts = [10, 20, 30]", () => {
      const arr: number[] = mock.thumbModel.splitNum(30, 3);

      expect(arr[0]).to.equal(10);
      expect(arr[1]).to.equal(20);
      expect(arr[2]).to.equal(30);
    });

    it("validateStep() should have correct step if step>max step =200 else <min step = 0", () => {
      expect(mock.thumbModel.validateStep(1000)).to.equal(
        mock.thumbModel.getMax()
      );
      expect(mock.thumbModel.validateStep(-5)).to.equal(
        mock.thumbModel.getMin()
      );
    });
  });

  describe("Test thumbPresenter", () => {
    it("isDouble should have correct value for isDoubleThumb = false", () => {
      const isDoubleThumb = mock.thumbPresenter.isDouble;
      expect(isDoubleThumb).to.be.false;
    });

    it("validateMinMax() should have validated value if set wrong(-10) = 0, if set > max = max- thumb width = 285", () => {
      expect(mock.thumbPresenter.validateMinMax(-10)).to.equal(0);
      expect(mock.thumbPresenter.validateMinMax(320)).to.equal(285);
    });
    it("setStep() should have round position according to step proportion, if pos= 42.35=>42.75", () => {
      expect(mock.thumbPresenter.setStep(42.35)).to.equal(42.75);
    });
    it("getStartPointFromMediator() should get a start point position through mediator", () => {
      const startPoint = mock.thumbPresenter.getStartPointFromMediator();
      expect(startPoint).to.equal(0);
    });
    it("set/getMediator() should set the mediator and to be instanceof Mediator", () => {
      const mockMediator = mock.rangeSliderPresenter.getMediator();

      mock.thumbPresenter.setMediator(mockMediator);
      expect(mockMediator instanceof components.Mediator).to.be.true;
    });

    it("getCurrentPosition() should have the current pos = 0", () => {
      expect(mock.thumbPresenter.getCurrentPosition()).to.equal(0);
    });

    it("getCurrentFillPosition() should have the current fillPos = 0", () => {
      expect(mock.thumbPresenter.getCurrentFillPosition()).to.equal(0);
    });
    it("validateIfStepMismatch() should have adjusted step if not fit the last or first step = 7.125", () => {
      expect(mock.thumbPresenter.validateIfStepMismatch(282)).to.equal(7.125);
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
    it("setThumbDataValue() should have a thumb  initial data-value = 0", () => {
      mock.thumbModel.setValue(0);
      mock.thumbPresenter.setThumbDataValue(mock.thumbView);
      expect(thumb.dataset.value).equal("0");
    });
    it("setThumbDataValue() should have a thumb data-value = the set data-value =48", () => {
      mock.thumbModel.setValue(48);
      expect(thumb.dataset.value).equal("48");
    });
    it("getThumbViewId() should have a thumbView id = 1", () => {
      expect(thView.getThumbViewId()).to.equal(1);
    });

    it("getThumbCurrentPosition() should have current thumb current position(marginLeft) = 42", () => {
      mock.thumbModel.setPosition(42);
      expect(thView.getThumbCurrentPosition()).to.equal(42);
    });
    it("getThumbElement() should have type of returned thumb = HTMLElement", () => {
      expect(thView.getThumbElement() instanceof HTMLElement).to.be.true;
    });
    it("getTooltip() should return tooltip element", () => {
      expect(thView.getTooltipElement() instanceof HTMLElement).to.be.true;
    });
  });
});

describe("Test Range-slider Thumb-double", () => {
  const mockOpts: IOptions = {
    max: 200,
    step: 10,
    value: [30, 70],
    doublePoint: true,
    thumbAnimation: false
  };

  const el = jsdom.window.document.querySelector(
    ".test-plugin--1"
  ) as HTMLElement;
  el.style.width = "300px";

  const mock = new Mock(el, mockOpts).getMockRangeSlider();
  describe("Test ThumbModel Double-point", () => {
    it("options should have an instance id of mock class = 2", () => {
      expect(mock.options.instanceId).to.be.equal(2);
    });
    it("options should have double-point = true", () => {
      expect(mock.options.doublePoint).to.be.true;
    });
    it("getPosition() should have type of position = Array", () => {
      expect(Array.isArray(mock.thumbModel.getPosition())).to.be.true;
    });
    it("set/getValue() should have a valueArr of set valueArr = 54,78", () => {
      let setArr: number[] = [54, 78];
      mock.thumbModel.setValue(setArr);
      let getArr: number[] = mock.thumbModel.getValue() as number[];
      let arraysEqual: boolean =
        getArr[0] === setArr[0] && getArr[1] === setArr[1];

      expect(arraysEqual).to.be.true;
    });
    it("set/getPosition() should have position of set position Array = 56,99", () => {
      let posArr: number[] = [56, 99];
      mock.thumbModel.setPosition(posArr);
      expect(mock.thumbModel.getPosition()).to.equal(posArr);
    });

    it("convertToValueReversed() should have value in reversed order(from the end) [17, 45] to [188,168]", () => {
      mock.thumbModel.setPosition([17, 45]);
      const straightPos = mock.thumbModel.getPosition();

      const convertedReversedToVal: number[] =
        mock.thumbModel.convertToValueReversed(straightPos) as number[];

      const correctReversed =
        convertedReversedToVal[0] === 188 && convertedReversedToVal[1] === 168;
      expect(correctReversed).to.be.true;
    });

    it("convertToPositionReversed() should have pos in reversed order(from the end) [5,25] to [195,175]", () => {
      mock.thumbModel.setValue([5, 25]);
      const straightValue = mock.thumbModel.getValue();

      const reversedToPos =
        mock.thumbModel.convertToPositionReversed(straightValue);
      const convertToVal: number[] = mock.thumbModel.convertToValue(
        reversedToPos
      ) as number[];
      const correctReversed =
        convertToVal[1] === 175 && convertToVal[0] === 195;
      expect(correctReversed).to.be.true;
    });
    it("options should have reversed value if set option reversedOrder: true", () => {
      mock.thumbModel.setPosition([50, 100]);
      mock.options.reversedOrder = true;
      mock.thumbModel.setPosition([50, 100]);
    });
  });
  describe("Test thumbView Double-point", () => {
    let viewsArr: components.ThumbView[] =
      mock.rangeSliderView.getThumbViews() as components.ThumbView[];
    it("getThumbViews() should have array of views", () => {
      expect(Array.isArray(viewsArr)).to.be.true;
    });
    it("setDoubleThumbPosition() should return correct double-point position array", () => {
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

    it("getTooltipElement() should have a tooltip HTMLElement", () => {
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

describe("Test Thumb StringValues", () => {
  const mockOpts: components.IOptions = {
    max: 800,
    stringValues: ["small", "medium", "large"],
    thumbAnimation: false
  };
  const mock = new Mock(el2, mockOpts).getMockRangeSlider();
  const thumb: HTMLElement = el2.querySelector(
    ".range-slider__thumb"
  ) as HTMLElement;

  it("setThumbDataValue() should have if number value=126 string data-value = small", () => {
    mock.thumbModel.setValue(126);
    mock.thumbPresenter.setThumbDataValue(mock.thumbView);
    expect(thumb.dataset.value).to.equal("small");
  });
  it("setThumbDataValue() should have if number value=345 string data-value = medium", () => {
    mock.thumbModel.setValue(345);
    mock.thumbPresenter.setThumbDataValue(mock.thumbView);
    expect(thumb.dataset.value).to.equal("medium");
  });
  it("setThumbDataValue() should have if number value=786 string data-value = large", () => {
    mock.thumbModel.setValue(786);
    mock.thumbPresenter.setThumbDataValue(mock.thumbView);
    expect(thumb.dataset.value).to.equal("large");
  });

  it("getValueString() should return the string value 5 = small", () => {
    expect(mock.thumbModel.getValueString(5)).to.equal("small");
    console.log(mock.thumbModel.getValueString(5));
  });
});
