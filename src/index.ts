import "./assets/styles/style.scss";
import $ from "jquery";
import "./plugin-wrapper/plugin-wrapper";
import Mock from "./test/Mock";

$(".range-slider-container").rangeSlider({
  // value: [100, 250],
  value: 0,
  max: 800,
  step: 20,
  doublePoint: false
});

const el = document.querySelector(".test") as HTMLElement;
const mock = new Mock(el).getMockRangeSlider();
console.log(mock.thumbModel.getContainerWidth());
