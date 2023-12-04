import { environment } from "src/environments/environment";
import { GridBox } from "./grid-box";
import { BackgroundConfig, IGridUnit, IGridUnitConfig, LineConfig, TextConfig } from "./grid";

export const config = environment.config.window as GridWindowConfig

export class GridWindow implements IGridUnit  {
  template?: any;
  details: GridWindowDetails = new GridWindowDetails();
  config: GridWindowConfig = new GridWindowConfig();

  active?: GridBox = undefined;

  constructor() { }
}

export class GridWindowDetails {
  height: number = 0;
  width: number = 0;
}

export class GridWindowConfig implements IGridUnitConfig {
  text?: TextConfig;
  background?: BackgroundConfig;
  line?: LineConfig;
  view!: GridWindowView;
  constructor() {
    this.text = new TextConfig(config?.text?.color)
    this.background = new BackgroundConfig(config?.background?.color)    
    this.line = new LineConfig(config?.line?.color)
    this.view = config?.view
  }
}

export enum GridWindowView {
  FULL = 'FULL',
  WINDOW = 'WINDOW'
}
