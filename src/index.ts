import "./assets/styles/style.scss";
import $ from "jquery";
import "./plugin-wrapper/plugin-wrapper";

const plugin1 = $(".container-1").rangeSlider({
  value: [100, 250],
  // value: 0,
  max: 800,
  step: 20,
  doublePoint: true,
  tooltip: true,
  stringValues: ["small", "medium", "large", "giant"],
  orientation: "vertical",
  reverseOrder: true
});

// plugin1.setValue([50, 420]);

const plugin2 = $(".container-2").rangeSlider({
  max: 500,
  value: 450,
  tickStep: 100,
  reverseOrder: true
});
