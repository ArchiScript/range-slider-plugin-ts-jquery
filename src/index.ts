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
plugin1.updateOptions({
  orientation: "horizontal",
  tooltipColor: "orange",
  max: 1000
});

const plugin2 = $(".container-2").rangeSlider({
  max: 500,
  value: 288,
  tickStep: 100,
  // reversedOrder: true,
  // doublePoint: true,
  thumbSize: 15,
  trackHeight: 6,
  tooltipForm: "round",
  orientation: "vertical"
  // trackColor: "linear-gradient(to right, green, red)"
});

$(".container-3").rangeSlider({
  max: 1200,
  value: [320, 950],
  tickStep: 200,
  // reversedOrder: true,
  doublePoint: true,
  thumbSize: 15,
  trackHeight: 6,
  tooltipColor: "#51B7A9FF",
  fillColor: "#51B7A9FF",
  thumbColor: "#51B7A9FF",
  tickBar: false
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
  trackHeight: 6,
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
  trackHeight: 6,
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
  trackHeight: 6,
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
  trackHeight: 6,
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
  trackHeight: 6,
  tooltipColor: "green"
  // trackColor: "linear-gradient(to right, green, red)"
});
