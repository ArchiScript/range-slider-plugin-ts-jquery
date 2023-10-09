import Mocha from "mocha";
import chai from "chai";
import { expect } from "chai";

import * as components from "../components/components";

import { mock } from "./thumb.spec";

describe("Test Mediator", () => {
  const mediator = mock.rangeSliderPresenter.getMediator();
  it("getMediator() should have an inistance of Mediator", () => {
    expect(mediator instanceof components.Mediator).to.be.true;
  });
  it("getPosition() should trigger notification of trackClick single pos 89 = pos - 15 & setStep = 71.25", () => {
    mediator.notifyTrackClick(89);
    expect(mock.thumbModel.getPosition()).to.be.equal(71.25);
  });
  it("getFillPosition() should setFill according to set position = 71.25", () => {
    expect(mock.fillModel.getFillPosition()).to.be.equal(71.25);
  });

  it("setFillPosition() should setFill according to set array position = [71.25, 150]", () => {
    const newPos = [71.25, 150];
    mock.fillModel.setFillPosition(newPos);
    const getPos = mock.fillModel.getFillPosition() as number[];
    const isCorrectPosition =
      getPos[0] === newPos[0] && getPos[1] === newPos[1];
    expect(isCorrectPosition).to.be.true;
  });

  it("notifyTrackClick() should trigger notification of trackClick array pos 89 => 55,150 the closest pos to thumb = [ 71.25, 150 ]", () => {
    mock.thumbModel.setPosition([55, 150]);
    mediator.notifyTrackClick(89);
    const newPos = [71.25, 150];
    const getPos = mock.thumbModel.getPosition() as number[];
    const isCorrectPosition =
      getPos[0] === newPos[0] && getPos[1] === newPos[1];
    expect(isCorrectPosition).to.be.true;
  });
});
