export interface IFillView {
  render(position: number | number[], width: number ): void;
  getFillElement(value: number): HTMLElement;
}
