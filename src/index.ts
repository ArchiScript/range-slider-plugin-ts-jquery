import "./assets/styles/style.scss";
import $ from "jquery";
import "./plugin-wrapper/plugin-wrapper";

$("body").rangeSlider({
  min: 54,
  max: 253,
  step: 4
});
