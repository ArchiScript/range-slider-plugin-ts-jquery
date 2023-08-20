import "./assets/styles/style.scss";
import $ from "jquery";
import "./plugin-wrapper/plugin-wrapper";

const plugin = $(".range-slider-container").rangeSlider({
  value: [100, 250],
  // value: 0,
  max: 800,
  step: 20,
  doublePoint: true,
  tooltip: true,
  stringValues: ["small", "medium", "large", "giant"],
  orientation: "vertical"
});

plugin.setValue([50, 420]);
