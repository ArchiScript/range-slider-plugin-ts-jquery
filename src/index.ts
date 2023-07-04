import "./assets/styles/style.scss";
import $ from "jquery";
import "./plugin-wrapper/plugin-wrapper";

$("body").rangeSlider({
  orientation: "vertical",
  max: 165,
  min: 0
});
