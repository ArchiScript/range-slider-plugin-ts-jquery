import { ISettableOptions } from "./types/IConfigurationService/ISettableOptions";
import type { PropertyTypes } from "./types/IConfigurationService/ISettableOptions";
import type { StringKeysSettableOptions } from "./types/IConfigurationService/ISettableOptions";
import { forIn, values } from "lodash";

type propertyTypedStringOptions = PropertyTypes<StringKeysSettableOptions>;

export class Dashboard {
  private dashboard: HTMLElement;
  private dashboardInner!: HTMLElement;
  private rangeSliderControls!: HTMLElement;
  private title!: HTMLElement;
  private rangeSliderForm!: HTMLFormElement;
  private currentPlugin: JQuery<HTMLElement>;
  private currentPluginId: number;
  private pluginInstances: JQuery<HTMLElement>[];

  constructor(container: HTMLElement, instances: JQuery<HTMLElement>[]) {
    this.dashboard = container;
    this.pluginInstances = instances;
    this.currentPluginId = 1;
    this.currentPlugin = this.pluginInstances[this.currentPluginId - 1];
    this.init();
  }

  init(): void {
    this.dashboardInner = document.createElement("div");
    this.dashboardInner.setAttribute("class", "dashboard__inner");
    this.rangeSliderControls = document.createElement("div");
    this.rangeSliderControls.setAttribute(
      "class",
      "range-slider-controls controls-container-1"
    );
    this.title = document.createElement("div");
    this.title.setAttribute("class", "range-slider-controls__title");
    this.rangeSliderForm = document.createElement("form");
    this.rangeSliderForm.setAttribute("class", "range-slider-controls__form");
    this.updateTitle();
    this.renderForm();
    this.attachFormToDashboard();
    this.onFormSubmit();
  }
  update(): void {
    this.renderForm();
  }
  updateTitle(): void {
    this.title.innerHTML = ` Setting plugin instance - ${this.currentPluginId}`;
  }
  private renderForm(): void {
    const optsObj = this.getStringSettableOptions();

    for (const [key, value] of Object.entries(optsObj)) {
      this.rangeSliderForm.innerHTML += `
      <div class="range-slider-controls__control">
              <label for="${key}">${key}</label>
              <input type="text" name="${key}" data-type="${value}"
       class="range-slider-controls__input"></div>
      `;
    }
    this.rangeSliderForm.innerHTML += `
    <div class="range-slider-controls__control"><button class="range-slider-controls__button"
                value="set options">set options</div>`;
  }

  private attachFormToDashboard(): void {
    this.rangeSliderControls.appendChild(this.title);
    this.rangeSliderControls.appendChild(this.rangeSliderForm);
    this.dashboardInner.appendChild(this.rangeSliderControls);
    this.dashboard.appendChild(this.dashboardInner);
  }

  getStringSettableOptions(): propertyTypedStringOptions {
    return {
      orientation: "string",
      doublePoint: "boolean",
      trackHeight: "number",
      max: "number",
      min: "number",
      thumbSize: "number",
      value: "number|number[]",
      ticks: "boolean",
      tickStep: "number",
      maxTicks: "number",
      step: "number",
      tooltip: "boolean",
      label: "string",
      stringValues: "string[]",
      reversedOrder: "boolean",
      thumbColor: "string",
      trackColor: "string",
      fillColor: "string",
      tooltipColor: "string",
      rulerColor: "string",
      tickFontSize: "number",
      tooltipForm: "string",
      fill: "boolean",
      tickBar: "boolean"
    };
  }

  setCurrentPluginId(pluginId: number): void {
    this.currentPluginId = pluginId;
    this.setDashboardDataValue(this.currentPluginId);
    this.currentPlugin = this.pluginInstances[this.currentPluginId - 1];
    console.log(this.currentPlugin);
  }

  getCurrentPluginId(): number {
    return this.currentPluginId;
  }

  parseValueByType(
    value: string | number | boolean | number[] | string[],
    type: string
  ): string | number | boolean | number[] | string[] {
    let result: string | number | boolean | number[] | string[];
    switch (type) {
      case "string":
        result = value.toString();
        break;
      case "string[]":
        const strToArr: string[] = value
          .toString()
          .split(",")
          .map((str) => str.trim());
        result = strToArr;
        break;
      case "number|number[]":
        if (value.toString().match(/[.,]/)) {
          const strToArrNum: number[] = value
            .toString()
            .split(/[.,]/)
            .map((val) => Number(val));
          result = strToArrNum;
          console.log(result);
        } else {
          result = Number(value);
        }
        break;
      case "boolean":
        if (value === "true") {
          result = true;
        } else {
          result = false;
        }
        break;
      default:
        result = value;
    }
    return result;
  }

  parseForm(
    form: HTMLFormElement
  ): Record<string, string | number | boolean | number[] | string[]> {
    const obj: Record<string, string | number | boolean | number[] | string[]> =
      {};
    for (let i = 0; i < form.elements.length; i++) {
      const formControl = form.elements[i];
      if (formControl instanceof HTMLInputElement && formControl.value !== "") {
        const key = formControl.name;
        let value: string | number | boolean | number[] | string[];
        value = this.parseValueByType(
          formControl.value,
          formControl.dataset.type as string
        );
        console.log(value);
        obj[key] = value;
      }
    }
    return obj;
  }
  private onFormSubmit(): void {
    this.rangeSliderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let formDataObject: Partial<ISettableOptions> = {};
      const formData = new FormData(this.rangeSliderForm);

      const data = this.parseForm(this.rangeSliderForm);
      formDataObject = data;

      this.currentPlugin.updateOptions(formDataObject);
    });
  }

  private setDashboardDataValue(value: number): void {
    this.dashboard.dataset.value = value.toString();
  }
  getCurrentPlugin(): JQuery<HTMLElement> {
    if (this.dashboard.dataset.value) {
      return this.pluginInstances[this.currentPluginId - 1];
    } else return this.pluginInstances[0];
  }
}
