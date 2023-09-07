import Mocha from "mocha";
import chai from "chai";
import { expect } from "chai";

import * as components from "../components/components";

import { el } from "./thumb.spec";
import Mock from "./Mock";

const mockOpts: components.IOptions = {
  max: 200,
  step: 5
};
const mock = new Mock(el, mockOpts).getMockRangeSlider();

describe("Test Config", () => {
  it("should set an option stringValues", () => {
    components.Config.getInstance().updateOptions({
      stringValues: ["one", "two", "three"]
    });
    expect("stringValues" in components.Config.getInstance().getOptions()).to.be
      .true;
  });
});

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
