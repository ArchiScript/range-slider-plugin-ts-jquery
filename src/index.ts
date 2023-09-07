import "./assets/styles/style.scss";
import $ from "jquery";
import "./plugin-wrapper/plugin-wrapper";
import { IOptions } from "./components/components";

function onBurgerClick(): void {
  const displays = document.querySelectorAll(".range-slider-display");
  displays.forEach((display) => {
    const burger = display.querySelector(".burger");
    const control = display.querySelector(".range-slider-controls");
    burger?.addEventListener("click", () => {
      control?.classList.toggle("enabled");
    });
  });
}
onBurgerClick();

function onSumbitOptions(plugin: JQuery<HTMLElement>): void {
  const currentPlugin = plugin;
  console.log(currentPlugin.getOptions());

  const form = document.querySelector(
    ".range-slider-controls__form"
  ) as HTMLFormElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let formDataObject: Record<string, string | number> = {};
    const formData = new FormData(form);

    console.log(plugin.getOptions().instanceId);

    for (const [key, value] of formData.entries()) {
      if (value) {
        formDataObject[key] = isNaN(Number(value))
          ? value.toString()
          : Number(value);
      }
    }
    // localStorage.setItem(
    //   `formData-${currentPlugin.getOptions().instanceId}`,
    //   JSON.stringify(formDataObject)

    currentPlugin.updateOptions(formDataObject);
    console.log(currentPlugin.config.getOptions());
  });
}

window.addEventListener("DOMContentLoaded", () => {
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
    // orientation: "horizontal",
    tooltipColor: "orange",
    max: 1000
  });
  plugin1.updateOptions({ tooltipColor: "blue" });

  const plugin2 = $(".container-2").rangeSlider({
    max: 500,
    value: 288,
    // tickStep: 100,
    // reversedOrder: true,
    // doublePoint: true,
    thumbSize: 15,
    trackHeight: 6,
    tooltipForm: "round",
    orientation: "vertical"
    // trackColor: "linear-gradient(to right, green, red)"
  });

  const plugin3 = $(".container-3").rangeSlider({
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

  const plugin4 = $(".container-4").rangeSlider({
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
  const plugin5 = $(".container-5").rangeSlider({
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

  // console.log(plugin5.getPluginConfig());
  plugin5.updateOptions({ max: 1400, tooltipColor: "black" });
  // console.log(plugin1.config.getOptions());
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
    value: [322, 950],
    tickStep: 200,
    // reversedOrder: true,
    doublePoint: true,
    thumbSize: 15,
    trackHeight: 6,
    tooltipColor: "green"
    // trackColor: "linear-gradient(to right, green, red)"
  });
  // onSumbitOptions(plugin1);

  $(".container-8").rangeSlider({
    max: 1200,
    value: [125, 950],
    tickStep: 200,
    // reversedOrder: true,
    doublePoint: true,
    thumbSize: 15,
    trackHeight: 6,
    tooltipColor: "green"
    // trackColor: "linear-gradient(to right, green, red)"
  });
  onSumbitOptions(plugin2);
});
