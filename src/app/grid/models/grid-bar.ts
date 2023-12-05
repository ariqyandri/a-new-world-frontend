import { BackgroundConfig, IGridUnit, IGridUnitConfig, LineConfig, TextConfig } from "./grid";
import { environment } from "src/environments/environment";
import { GridBox } from "./grid-box";

export const config = environment.config.bar as GridBarConfig

export class GridBar implements IGridUnit {
  details: GridBarDetails = new GridBarDetails();
  config: GridBarConfig = new GridBarConfig();


  constructor() { }
}

export class GridBarDetails {
  height: number = 0;
  width: number = 0;
}

export class GridBarConfig implements IGridUnitConfig {
  text?: TextConfig;
  background?: BackgroundConfig;
  line?: LineConfig;
  constructor() {
    this.text = new TextConfig(config?.text?.color)
    this.background = new BackgroundConfig(config?.background?.color)    
    this.line = new LineConfig(config?.line?.color, config?.line?.width)
  }
}