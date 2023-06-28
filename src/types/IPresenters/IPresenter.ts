import { TrackPresenter } from "../../presenters/TrackPresenter";
export interface IPresenter {
  trackPresenter: TrackPresenter;
  init(): void;
  updateValue(value: number): void;
}
