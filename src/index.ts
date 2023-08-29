import "./assets/styles/style.scss";
import $ from "jquery";
import "./plugin-wrapper/plugin-wrapper";

const plugin1 = $(".container-1").rangeSlider({
  // value: [100, 250],
  value: 47,
  max: 800,
  step: 20,
  // doublePoint: true,
  tooltip: true,
  stringValues: ["small", "medium", "large", "giant"],
  orientation: "vertical",
  reversedOrder: true
  // tooltipForm: "round"
});

// plugin1.setValue([50, 420]);

const plugin2 = $(".container-2").rangeSlider({
  max: 500,
  value: 288,
  tickStep: 100,
  // reversedOrder: true,
  // doublePoint: true,
  thumbSize: 15,
  trackHeight: 8,
  tooltipForm: "round"
  // trackColor: "linear-gradient(to right, green, red)"
});

$(".container-3").rangeSlider({
  max: 1200,
  value: [320, 950],
  tickStep: 200,
  // reversedOrder: true,
  doublePoint: true,
  thumbSize: 15,
  trackHeight: 8,
  tooltipColor: "green"
  // trackColor: "linear-gradient(to right, green, red)"
});

$(".container-4").rangeSlider({
  max: 1200,
  value: [320, 950],
  tickStep: 200,
  fill: false,
  // reversedOrder: true,
  doublePoint: true,
  thumbSize: 15,
  trackHeight: 8,
  tooltipColor: "green",
  trackColor: "linear-gradient(to right, blue, green)"
});
$(".container-5").rangeSlider({
  max: 1200,
  value: [320, 950],
  tickStep: 200,
  // reversedOrder: true,
  doublePoint: true,
  thumbSize: 15,
  trackHeight: 8,
  tooltipColor: "green"
  // trackColor: "linear-gradient(to right, green, red)"
});
$(".container-6").rangeSlider({
  max: 1200,
  value: [320, 950],
  tickStep: 200,
  // reversedOrder: true,
  doublePoint: true,
  thumbSize: 15,
  trackHeight: 8,
  tooltipColor: "green"
  // trackColor: "linear-gradient(to right, green, red)"
});
$(".container-7").rangeSlider({
  max: 1200,
  value: [320, 950],
  tickStep: 200,
  // reversedOrder: true,
  doublePoint: true,
  thumbSize: 15,
  trackHeight: 8,
  tooltipColor: "green"
  // trackColor: "linear-gradient(to right, green, red)"
});
$(".container-8").rangeSlider({
  max: 1200,
  value: [320, 950],
  tickStep: 200,
  // reversedOrder: true,
  doublePoint: true,
  thumbSize: 15,
  trackHeight: 8,
  tooltipColor: "green"
  // trackColor: "linear-gradient(to right, green, red)"
});
