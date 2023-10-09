import Mocha from "mocha";
import chai from "chai";
import { expect } from "chai";

import * as components from "../components/components";

import { el } from "./thumb.spec";
import Mock from "./Mock";

const mockOpts: components.IOptions = {
  max: 200,
  step: 5,
  trackHeight: 10
};
const mock = new Mock(el, mockOpts).getMockRangeSlider();

describe("Test userOptions merged with defaults", () => {
  it("options should have step value = 5", () => {
    expect(mock.options.step).to.equal(5);
  });

  it("options should have min value = 0", () => {
    expect(mock.options.min).to.equal(0);
  });
  it("options should have max value = 200", () => {
    expect(mock.options.max).to.equal(200);
  });
  it("options should have initial value = 0", () => {
    expect(mock.options.value).to.equal(0);
  });
  it("options should have track height = 10", () => {
    expect(mock.options.trackHeight).to.equal(10);
  });
  it("options should have tooltip = true", () => {
    expect(mock.options.tooltip).to.be.true;
  });
  it("options should have thumbsize = 15", () => {
    expect(mock.options.thumbSize).to.equal(15);
  });
  it("options should have doublePoing = false", () => {
    expect(mock.options.doublePoint).to.be.false;
  });
  it("options should have container width = 300", () => {
    expect(mock.options.containerWidth).to.equal(300);
  });
});

describe("Test Config updateOptions()", () => {
  it("updateOptions() should set an option stringValues", () => {
    components.Config.getInstance().updateOptions({
      stringValues: ["one", "two", "three"]
    });
    expect("stringValues" in components.Config.getInstance().getOptions()).to.be
      .true;
  });
});
