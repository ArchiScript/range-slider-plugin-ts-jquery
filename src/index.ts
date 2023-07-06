import "./assets/styles/style.scss";
import $ from "jquery";
import "./plugin-wrapper/plugin-wrapper";

$("body").rangeSlider({
  valueMin: 54,
  max: 253,
  step: 4
});
