export interface IFillView {
  render(value: number | number[]): void;
  getFillElement(value: number): HTMLElement;
}
