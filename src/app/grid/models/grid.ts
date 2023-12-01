import { environment } from "src/environments/environment";
import { GridBar, GridBarConfig, GridBarDetails } from "./grid-bar";
import { GridBoxes, GridBoxesConfig, GridBoxesDetails } from "./grid-boxes";
import { GridWindow, GridWindowConfig, GridWindowDetails } from "./grid-window";
import { GridBoxConfig, GridBoxDetails } from "./grid-box";

export const config = environment.config as GridConfig

export enum GridCookie {
  CONFIG = 'grid_config'
}

export class Grid {
  boxes?: GridBoxes;
  bar?: GridBar;
  window?: GridWindow;
  details: GridDetails = new GridDetails();
  config: GridConfig = new GridConfig();
}

export class GridDetails {
  height: number = 0;
  width: number = 0;
  total: number = 0;
  rows: number = 0;
  columns: number = 0;
  boxHeight: number = 0;
  boxWidth: number = 0;
  boxes?: GridBoxesDetails;
  bar?: GridBarDetails;
  window?: GridWindowDetails;
}

export class GridConfig {
  size!: number;
  background!: BackgroundConfig;
  line!: LineConfig;
  text!: TextConfig;
  box!: GridBoxConfig;
  boxes!: GridBoxesConfig;
  bar!: GridBarConfig;
  window!: GridWindowConfig;

  constructor() {
    this.size = config.size;
    this.background = config.background;
    this.line = config.line;
    this.text = config.text;
    this.box = new GridBoxConfig()
    this.boxes = new GridBoxesConfig()
    this.bar = new GridBarConfig()
    this.window = new GridWindowConfig()
  }
}

export class BackgroundConfig {
  color!: string;
  image?: string;

  constructor() {
    this.color = config.background.color;
    this.image = config.background.image;
  }
}

export class LineConfig {
  color!: string;
  width!: number;

  constructor() {
    this.width = config.line.width;
    this.color = config.line.color;
  }
}
export class TextConfig {
  color!: string;
  fontFamily!: string;
  
  constructor() {
    this.color = config.text!.color;
    this.fontFamily = config.text!.fontFamily;
  }
}
