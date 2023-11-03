import Mocha from "mocha";
import chai from "chai";
import { expect } from "chai";

import { Ruler } from "../models/Ruler";

describe("Test Ruler Calculations", () => {
  let ruler: Ruler = new Ruler();
  describe("Ruler GetCalculatedTickStep", () => {
    it("getCalculatedTickStep() should have tickStep 100 if max 800", () => {
      ruler.setMax(800);
      expect(ruler.getCalculatedTickStep()).to.equal(100);
    });
    it("getCalculatedTickStep() should have tickStep 1 if max 8", () => {
      ruler.setMax(8);
      expect(ruler.getCalculatedTickStep()).to.equal(1);
    });
    it("getCalculatedTickStep() should have tickStep 50 if max 850", () => {
      ruler.setMax(850);
      expect(ruler.getCalculatedTickStep()).to.equal(50);
    });
    it("getCalculatedTickStep() should have tickStep 500 if max 3500", () => {
      ruler.setMax(3500);
      expect(ruler.getCalculatedTickStep()).to.equal(500);
    });
    it("getCalculatedTickStep() should have tickStep 2 if max 30", () => {
      ruler.setMax(30);
      expect(ruler.getCalculatedTickStep()).to.equal(2);
    });
    it("getCalculatedTickStep() should have tickStep 10 if max 90", () => {
      ruler.setMax(90);
      expect(ruler.getCalculatedTickStep()).to.equal(10);
    });
    it("getCalculatedTickStep() should have tickStep 200 if max 2200", () => {
      ruler.setMax(2200);
      expect(ruler.getCalculatedTickStep()).to.equal(200);
    });
    it("getCalculatedTickStep() should have tickStep 183 if max 1830", () => {
      ruler.setMax(1830);
      expect(ruler.getCalculatedTickStep()).to.equal(183);
    });
    it("getCalculatedTickStep() should have tickStep 3 if max 27", () => {
      ruler.setMax(27);
      expect(ruler.getCalculatedTickStep()).to.equal(3);
    });
  });
  describe("Test Ruler helper calculations", () => {
    it("isFirstDigitPlain() should have significant number of 300 to be plain number", () => {
      expect(ruler.isFirstDigitPlain(300)).to.be.true;
    });
    it("isFirstDigitPlain() should have significant number of 340 to be not plain number", () => {
      expect(ruler.isFirstDigitPlain(340)).to.be.false;
    });
    it("getValidMultipliers() should have array of valid dividers of 300", () => {
      const dividers: number[] = [
        1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 25, 30, 50, 60, 75, 100, 150
      ];

      const calcDividers: number[] = ruler.getValidMultipliers(300);
      console.log("dividers:");
      console.log(calcDividers);
      for (let i = 0; i < calcDividers.length - 1; i++) {
        expect(calcDividers[i]).to.equal(dividers[i]);
      }
    });
    it("isValidPartition() should have number of ticks value_30 = 10 >6<20 = true", () => {
      expect(ruler.isValidPartition(30, 300)).to.be.true;
    });
    it("isValidPartition() should have number of ticks value_100 = 3 >6<20 = false", () => {
      expect(ruler.isValidPartition(100, 300)).to.be.false;
    });
    it("isValidPartition() should have number of ticks value_6 = 50 >6<20 = false", () => {
      expect(ruler.isValidPartition(6, 300)).to.be.false;
    });
    it("getValidTickStepsArr() should have returned array of valid tickSteps from 300 = [ 15, 20, 25, 30, 50 ]", () => {
      const validArr = ruler.getValidTickStepsArr(300);
      const expectArr = [15, 20, 25, 30, 50];
      for (let i = 0; i < validArr.length - 1; i++) {
        expect(validArr[i]).to.equal(expectArr[i]);
      }
    });
    it("getFavorableTickStep() should have userfriendly tickStep out of array of valid = 50", () => {
      const validArr: number[] = ruler.getValidTickStepsArr(300);
      expect(ruler.getFavorableTickStep(validArr, 300)).to.equal(20);
    });
    it("removeTrailingZeros() should have a type of returned object { num: number; grade: number } =true", () => {
      type expectObjectType = { num: number; grade: number };
      const expectObj = ruler.removeTrailingZeros(300);
      expect(
        typeof expectObj === "object" &&
          "num" in expectObj &&
          "grade" in expectObj
      ).to.be.true;
    });
    it("removeTrailingZeros() should have an object of num (300)= num with no zeros =3,grade = zeros removed=2", () => {
      expect(ruler.removeTrailingZeros(300).num).to.equal(3);
      expect(ruler.removeTrailingZeros(300).grade).to.equal(2);
    });

    it("setMaxTicks(30) should set max ticks calculating validPartition = true", () => {
      ruler.setMaxTicks(30);
      expect(ruler.isValidPartition(10, 300)).to.be.true;
    });
    it("setMaxTicks(25) should set max ticks calculating validPartition = false", () => {
      ruler.setMaxTicks(25);
      expect(ruler.isValidPartition(10, 300)).to.be.false;
    });
  });
});
