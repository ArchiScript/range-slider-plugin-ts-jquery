import { IRangeSliderView } from "../types/IViews/IRangeSliderView";
import { TrackView } from "./TrackView";
import { ThumbView } from "./ThumbView";
import { FillView } from "./FillView";
import { IOptions, LabelStyles } from "../types/IConfigurationService/IOptions";
import { Config } from "../ConfigService/Config";

export class RangeSliderView implements IRangeSliderView {
  private $container: HTMLElement;
  private $pluginElement: HTMLElement;
  private $trackView!: TrackView;
  private $label: HTMLElement;
  private $title: HTMLElement;
  private $thumbView!: ThumbView | ThumbView[];
  private $trackElement!: HTMLElement;
  private $fillView!: FillView;
  private options: IOptions;

  constructor(container: HTMLElement) {
    this.options = Config.getInstance().getOptions();
    this.$container = container;
    this.$pluginElement = document.createElement("div");
    this.$label = document.createElement("div");
    this.$title = document.createElement("h1");
    this.$trackView = new TrackView(this.$pluginElement);
    this.$thumbView = this.getThumbViews();
    this.$fillView = new FillView(this.$trackView.getTrackElement());
    this.init();
  }
  init(): void {
    const classStr: string = `range-slider--${this.options.orientation}`;
    this.$pluginElement.setAttribute("class", `range-slider ${classStr}`);
    this.$label.setAttribute("class", "range-slider__label");
    // this.renderLabel();
    // this.render();
  }

  updateOptions(id: number): void {
    this.options = Config.getInstanceById(id).getOptions();
    this.init();
  }

  getThumbViews(): ThumbView | ThumbView[] {
    if (!this.options.doublePoint) {
      return new ThumbView(this.$pluginElement) as ThumbView;
    } else {
      const thumbs = [];
      for (let i = 1; i <= 2; i++) {
        thumbs.push(new ThumbView(this.$pluginElement));
      }
      return thumbs as ThumbView[];
    }
  }

  private renderLabel(value: number | number[]): void {
    const valueStr = this.options.labelString ? this.options.labelString : "";
    if (this.options.label && valueStr) {
      const inner = this.options.valueInLabel
        ? `${valueStr} -- ${value}`
        : valueStr;
      this.$label.textContent = inner;
      const labelStyles = this.options.labelStyles as LabelStyles;
      this.applyLabelStyles(labelStyles);
      this.$container.appendChild(this.$label);
    }
  }

  private applyLabelStyles(labelStyles: LabelStyles): void {
    this.$label.style.height = `${labelStyles.height}px`;
    this.$label.style.marginTop = `${labelStyles.marginTop}px`;
    this.$label.style.marginBottom = `${labelStyles.marginBottom}px`;
  }

  render(value: number | number[]): void {
    this.renderLabel(value);
    this.$container.appendChild(this.$pluginElement);
    this.$pluginElement.appendChild(this.$trackView.getTrackElement());
    this.renderThumbView();
  }

  private renderThumbView(): void {
    if (this.$thumbView instanceof ThumbView) {
      this.$trackView
        .getTrackElement()
        .appendChild(this.$thumbView.getThumbElement());
    } else if (Array.isArray(this.$thumbView)) {
      this.$thumbView.forEach((view) =>
        this.$trackView.getTrackElement().appendChild(view.getThumbElement())
      );
    }
  }

  getTrackView(): TrackView {
    return this.$trackView;
  }
  getThumbView(): ThumbView | ThumbView[] {
    if (this.$thumbView instanceof ThumbView) {
      return this.$thumbView as ThumbView;
    } else {
      return this.$thumbView as ThumbView[];
    }
  }
  getFillView(): FillView {
    return this.$fillView;
  }
  addValueChangeListener(listener: Function): void {
    this.$pluginElement.addEventListener("click", () => {
      listener();
    });
  }
  getContainerWidth(): number {
    return parseInt(getComputedStyle(this.$container).width);
  }
}
