import "./assets/styles/style.scss";
import $ from "jquery";
import "./plugin-wrapper/plugin-wrapper";

$(".range-slider-container").rangeSlider({
  value: 100,
  max: 800,
  step: 4
});
