import { GridBox } from "./grid-box";
import { BackgroundConfig, IGridUnit, IGridUnitConfig, LineConfig, TextConfig } from "./grid";
import { environment } from "src/environments/environment";

export const config = environment.config.boxes as GridBoxesConfig

export class GridBoxes implements IGridUnit {
  details: GridBoxesDetails = new GridBoxesDetails();
  config: GridBoxesConfig = new GridBoxesConfig();

  active?: GridBox = undefined;

  constructor() { }
}

export class GridBoxesDetails {
  height: number = 0;
  width: number = 0;
  total: number = 0;
  rows: number = 0;
  columns: number = 0;
  box: number = 0;
}

export class GridBoxesConfig implements IGridUnitConfig {
  text?: TextConfig;
  background?: BackgroundConfig;
  line?: LineConfig;
  constructor() {
    this.text = new TextConfig(config?.text?.color)
    this.background = new BackgroundConfig(config?.background?.color)    
    this.line = new LineConfig(config?.line?.color, config?.line?.width)
  }
}