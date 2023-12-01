import { GridUnit, GridUnitConfig } from "./grid-unit";
import { GridBoxComponent } from "../components/grid-box/grid-box.component";
import { environment } from "src/environments/environment";

export const config = environment.config.boxes as GridBoxConfig

export class GridBox extends GridUnit {
  override component?: GridBoxComponent;
  override details: GridBoxDetails = new GridBoxDetails();

  active: boolean = false;
  index!: number;
  row!: number;
  col!: number;
  get id() {
    return `${this.index}:${this.row}:${this.col}`
  };

  constructor(index: number, row: number, col: number) {
    super()
    this.index = index;
    this.row = row;
    this.col = col;
  }
}

export class GridBoxDetails {
  height: number = 0;
  width: number = 0;
}

export class GridBoxConfig extends GridUnitConfig {
  constructor() {
    super(config.color)
  }
}