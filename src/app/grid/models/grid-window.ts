import { environment } from "src/environments/environment";
import { GridBox } from "./grid-box";
import { GridUnit, GridUnitConfig } from "./grid-unit";
import { GridWindowComponent } from "../components/grid-window/grid-window.component";

export const config = environment.config.window as GridWindowConfig

export class GridWindow extends GridUnit {
  override component?: GridWindowComponent;
  override details: GridWindowDetails = new GridWindowDetails();
  override config: GridWindowConfig = new GridWindowConfig();

  active?: GridBox = undefined;
}

export class GridWindowDetails {
  height: number = 0;
  width: number = 0;
}

export class GridWindowConfig extends GridUnitConfig {
  view!: GridWindowView;
  constructor() {
    super(config.color)
    this.view = config.view
  }
}

export enum GridWindowView {
  FULL = 'FULL',
  WINDOW = 'WINDOW'
}
