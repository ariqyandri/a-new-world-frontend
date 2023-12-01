import { BackgroundConfig, IGridUnit, IGridUnitConfig, LineConfig, TextConfig } from "./grid";
import { GridBarComponent } from "../components/grid-bar/grid-bar.component";
import { environment } from "src/environments/environment";
import { GridBox } from "./grid-box";

export const config = environment.config.bar as GridBarConfig

export class GridBar implements IGridUnit {
  component?: GridBarComponent;
  details: GridBarDetails = new GridBarDetails();
  config: GridBarConfig = new GridBarConfig();

  active: Boolean = true;
  elements: { [key: string]: GridBox } = {};

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
    this.line = new LineConfig(config?.line?.color)
  }
}