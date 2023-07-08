import "./assets/styles/style.scss";
import $ from "jquery";
import "./plugin-wrapper/plugin-wrapper";

$(".range-slider-container").rangeSlider({
  valueMin: 126,
  max: 253,
  step: 4
});
