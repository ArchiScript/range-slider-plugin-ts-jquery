import Mocha from "mocha";
import chai from "chai";
import { assert, expect } from "chai";
import Mock from "./Mock";
import { JSDOM } from "jsdom";
import { IOptions } from "../types/IConfigurationService/IOptions";
import * as puppeteer from "puppeteer";
import { chromium, Browser, Page } from "playwright";

const jsdom = new JSDOM(
  '<!doctype html><html><body><div class="test"></div></body></html>'
);
const { window } = jsdom;

global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.Element = window.Element;
global.Node = window.Node;
global.getComputedStyle = window.getComputedStyle;

describe("Test RangeSlider", () => {
  const mockOpts: IOptions = {
    max: 200,
    step: 10
  };
  const el = jsdom.window.document.querySelector(".test") as HTMLElement;
  el.style.width = "300px";
  const mock = new Mock(el, mockOpts).getMockRangeSlider();
  before(() => {});

  it("should have correct proportion value in comparison to width", () => {
    expect(mock.thumbModel.getProportion()).to.equal(1.425);
  });

  it("should have correct computed style for container width", () => {
    const containerWidth = mock.thumbModel.getContainerWidth();
    expect(containerWidth).to.equal(300);
  });

  it("should have correct value for isDoubleThumb", () => {
    const isDoubleThumb = mock.thumbPresenter.isDoubleThumb;
    expect(isDoubleThumb).to.be.false;
  });

  it("should have initial value equal to zero", () => {
    expect(mock.thumbPresenter.getValue()).to.equal(0);
  });
});
