import { GridBox } from "./grid-box";
import { GridUnit, GridUnitConfig } from "./grid-unit";
import { GridBoxesComponent } from "../components/grid-boxes/grid-boxes.component";
import { environment } from "src/environments/environment";

export const config = environment.config.boxes as GridBoxesConfig

export class GridBoxes extends GridUnit {
  override component?: GridBoxesComponent;
  override details: GridBoxesDetails = new GridBoxesDetails();
  override config: GridBoxesConfig = new GridBoxesConfig();

  active?: GridBox = undefined;
  elements: GridBox[] = [];
}

export class GridBoxesDetails {
  height: number = 0;
  width: number = 0;
  total: number = 0;
  rows: number = 0;
  columns: number = 0;
  box: number = 0;
}

export class GridBoxesConfig extends GridUnitConfig {
  constructor() {
    super(config.color)
  }
}