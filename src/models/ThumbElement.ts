export class ThumbElement implements IThumbElement {
  public element!: HTMLDivElement;
  public position!: number;
  constructor(element: HTMLDivElement, position: number) {
    this.element = element;
    this.position = position;
  }
  public updatePosition(position: number): void {
    this.position = position;
  }
}
