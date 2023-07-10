export interface IFillView {
  render(value: number): void;
  getFillElement(value: number): HTMLElement;
}
