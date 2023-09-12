import { ISettableOptions } from "./types/IConfigurationService/ISettableOptions";
export class Dashboard {
  private dashboard: HTMLElement;
  private dashboardInner!: HTMLElement;
  private rangeSliderControls!: HTMLElement;
  private title!: HTMLElement;
  private rangeSliderForm!: HTMLFormElement;
  private currentPlugin!: JQuery<HTMLElement>;
  private currentPluginId: number;
  private pluginInstances: JQuery<HTMLElement>[];
  constructor(container: HTMLElement, instances: JQuery<HTMLElement>[]) {
    this.dashboard = container;
    this.pluginInstances = instances;
    this.currentPluginId = 1;
    this.currentPlugin = this.pluginInstances[this.currentPluginId - 1];
    this.render();
    this.onSumbitOptions();
  }
  update(): void {
    this.render();
  }
  private render(): void {
    const opts = this.getSettableOptionsList();
    this.dashboardInner = document.createElement("div");
    this.dashboardInner.setAttribute("class", "dashboard__inner");
    this.rangeSliderControls = document.createElement("div");
    this.rangeSliderControls.setAttribute(
      "class",
      "range-slider-controls controls-container-1"
    );
    this.title = document.createElement("div");

    this.title.setAttribute("class", "range-slider-controls__title");
    this.updateTitle();
    this.rangeSliderForm = document.createElement("form");
    this.rangeSliderForm.setAttribute("class", "range-slider-controls__form");

    opts.forEach((opt) => {
      this.rangeSliderForm.innerHTML += `
      <div class="range-slider-controls__control">
              <label for="${opt}">${opt}</label>
              <input type="text" name="${opt}" class="range-slider-controls__input"></div>
      `;
    });
    this.rangeSliderForm.innerHTML += `
    <div class="range-slider-controls__control"><button class="range-slider-controls__button"
                value="set options">set options</div>`;

    this.rangeSliderControls.appendChild(this.title);
    this.rangeSliderControls.appendChild(this.rangeSliderForm);
    this.dashboardInner.appendChild(this.rangeSliderControls);
    this.dashboard.appendChild(this.dashboardInner);
  }
  updateTitle(): void {
    this.title.innerHTML = ` Setting plugin instance - ${this.currentPluginId}`;
  }
  private getSettableOptionsList(): string[] {
    const keys: (keyof ISettableOptions)[] = [
      "orientation",
      "doublePoint",
      "trackHeight",
      "max",
      "min",
      "thumbSize",
      "value",
      "ticks",
      "tickStep",
      "step",
      "tooltip",
      "label",
      "stringValues",
      "reversedOrder",
      "thumbColor",
      "trackColor",
      "fillColor",
      "tooltipColor",
      "rulerColor",
      "tickFontSize",
      "tooltipForm",
      "fill",
      "tickBar"
    ];
    return keys;
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

  private onSumbitOptions(): void {
    this.rangeSliderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let formDataObject: Record<string, string | number> = {};
      const formData = new FormData(this.rangeSliderForm);

      for (const [key, value] of formData.entries()) {
        if (value) {
          formDataObject[key] = isNaN(Number(value))
            ? value.toString()
            : Number(value);
        }
      }

      console.log(this.currentPlugin);
      this.currentPlugin.updateOptions(formDataObject);
      console.log(this.currentPlugin.config.getOptions());
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
