import "./assets/styles/style.scss";
import $ from "jquery";
import "./plugin-wrapper/plugin-wrapper";
import { IOptions } from "./components/components";
import { Dashboard } from "./Dashboard";

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

window.addEventListener("DOMContentLoaded", () => {
  const dashboardContainer = document.querySelector(
    ".dashboard"
  ) as HTMLElement;

  function plugins(): JQuery<HTMLElement>[] {
    const pluginsArr: JQuery<HTMLElement>[] = [];

    const plugin1 = $(".container-1").rangeSlider({
      max: 800,
      value: [100, 250],
      // value: 47,

      step: 20,
      doublePoint: true,

      stringValues: ["small", "medium", "large", "giant"],
      orientation: "vertical",
      reversedOrder: true
      // tooltipForm: "round"
    });

    plugin1.onChange(() => {
      console.log("работает!");
      console.log(plugin1.getValue());
    });
    // plugin1.updateOptions({
    //   // orientation: "horizontal",
    //   tooltipColor: "orange",
    //   max: 1000
    // });
    // plugin1.setValue([50, 420]);
    // plugin1.updateOptions({ tooltipColor: "blue" });
    pluginsArr.push(plugin1);

    const plugin2 = $(".container-2").rangeSlider({
      max: 500,
      // value: 288,
      value: [100, 250],
      // tickStep: 100,
      // reversedOrder: true,
      doublePoint: true,
      thumbSize: 15,
      trackHeight: 6,
      tooltipForm: "round"
      // orientation: "vertical"
      // trackColor: "linear-gradient(to right, green, red)"
    });
    pluginsArr.push(plugin2);
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
    pluginsArr.push(plugin3);
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
      trackColor: "linear-gradient(to right, white, green)"
    });
    pluginsArr.push(plugin4);
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
    pluginsArr.push(plugin5);

    // console.log(plugin5.getPluginConfig());
    // plugin5.updateOptions({ max: 1400, tooltipColor: "black" });
    // console.log(plugin1.config.getOptions());
    const plugin6 = $(".container-6").rangeSlider({
      max: 1200,
      // value: [320, 950],
      value: 688,
      // tickStep: 200,
      // reversedOrder: true,

      doublePoint: false,
      thumbSize: 15,
      trackHeight: 6,
      tooltipColor: "green"
      // trackColor: "linear-gradient(to right, green, red)"
    });
    pluginsArr.push(plugin6);
    const plugin7 = $(".container-7").rangeSlider({
      max: 1200,
      value: [322, 950],
      tickStep: 200,
      // reversedOrder: true,
      doublePoint: true,
      thumbSize: 15,
      trackHeight: 6,
      orientation: "vertical",
      tooltipColor: "green"
      // trackColor: "linear-gradient(to right, green, red)"
    });
    pluginsArr.push(plugin7);
    // onSumbitOptions(plugin1);

    const plugin8 = $(".container-8").rangeSlider({
      max: 1200,
      // value: 977,
      value: [125, 950],
      tickStep: 200,
      // reversedOrder: true,
      doublePoint: true,
      thumbSize: 15,
      trackHeight: 6,
      tooltipColor: "green",
      orientation: "vertical"
      // trackColor: "linear-gradient(to right, green, red)"
    });
    pluginsArr.push(plugin8);
    // onSumbitOptions(plugin2);
    // onModifyButtonClick();
    const plugin9 = $(".container-9").rangeSlider({ orientation: "vertical" });
    pluginsArr.push(plugin9);

    return pluginsArr;
  }

  onModifyButtonClick();
  const pluginsInstances = plugins();
  const dashboard = new Dashboard(dashboardContainer, pluginsInstances);

  function onModifyButtonClick(): void {
    const buttons = document.querySelectorAll(
      ".range-slider-display__modify-button"
    );
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const target: HTMLElement = e.target as HTMLElement;
        let modifyButton: HTMLElement = target.classList.contains(
          "range-slider-display__modify-button"
        )
          ? target
          : (target.closest(
              ".range-slider-display__modify-button"
            ) as HTMLElement);

        buttons.forEach((button) => {
          button.classList.remove("active");
        });
        modifyButton.classList.add("active");

        dashboard.setCurrentPluginId(
          parseInt(modifyButton.dataset.value as string)
        );
        dashboard.updateTitle();
      });
    });
  }
});
