import { IChangeEvent } from "types/IChangeEvent";
export class EventDispatcher {
  private handlers: ((event: IChangeEvent) => void)[] = [];

  addEventListener(callback: (event: IChangeEvent) => void) {
    this.handlers.push(callback);
  }

  dispatchEvent(event: IChangeEvent) {
    this.handlers.forEach((handler) => handler(event));
  }
}
