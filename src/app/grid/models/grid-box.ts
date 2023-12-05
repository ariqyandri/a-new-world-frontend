import { BackgroundConfig, IGridUnit, IGridUnitConfig, LineConfig, TextConfig } from "./grid";
import { GridBoxComponent } from "../components/grid-box/grid-box.component";
import { environment } from "src/environments/environment";

export const config = environment.config.boxes as GridBoxConfig

export class GridBoxCollection {
  bar?: {
    [key: string]: GridBox
  }

  boxes?: {
    [key: string]: GridBox
  }

}

export class GridBox implements IGridUnit {
  details: GridBoxDetails = new GridBoxDetails();
  config: GridBoxConfig = new GridBoxConfig();
  data: any

  active: boolean = false;
  index!: number;
  row!: number;
  col!: number;
  get id() {
    return `${this.row}:${this.col}`
  };

  constructor(index: number, row: number, col: number) {
    this.index = index;
    this.row = row;
    this.col = col;
  }
}

export class GridBoxDetails {
  height: number = 0;
  width: number = 0;
}

export class GridBoxConfig implements IGridUnitConfig {
  text?: TextConfig;
  background?: BackgroundConfig;
  line?: LineConfig;
  constructor() {
    this.text = new TextConfig(config?.text?.color)
    this.background = new BackgroundConfig(config?.background?.color)
    this.line = new LineConfig(config?.line?.color, config?.line?.width)
  }
}