import { environment } from "src/environments/environment";
import { GridBar, GridBarConfig, GridBarDetails } from "./grid-bar";
import { GridBoxes, GridBoxesConfig, GridBoxesDetails } from "./grid-boxes";
import { GridWindow, GridWindowConfig, GridWindowDetails } from "./grid-window";
import { GridBoxCollection, GridBoxConfig, GridBoxDetails } from "./grid-box";

export const config = environment.config as GridConfig

export enum GridCookie {
  CONFIG = 'grid_config'
}

export class Grid {
  boxes?: GridBoxes;
  bar?: GridBar;
  window?: GridWindow;
  boxCollection?: GridBoxCollection;
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
  box?: GridBoxConfig;
  boxes?: GridBoxesConfig;
  bar?: GridBarConfig;
  window?: GridWindowConfig;

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

export enum GridStyleProperty {
  SIZE = '--size',
  BACKGROUND_COLOR = '--background-color',
  BACKGROUND_IMAGE = '--background-image',
  LINE_COLOR = '--line-color',
  LINE_WIDTH = '--line-width',
  TEXT_COLOR = '--text-color',
  TEXT_FONT_FAMILY = '--text-font-family',
}

export class BackgroundConfig {
  color!: string;
  image?: string;

  constructor(color?: string) {
    this.color = color ?? config.background.color;
    this.image = config.background.image;
  }
}

export class LineConfig {
  color!: string;
  width!: number;

  constructor(color?: string) {
    this.color = color ?? config.line.color;
    this.width = config.line.width;
  }
}
export class TextConfig {
  color!: string;
  fontFamily!: string;

  constructor(color?: string) {
    this.color = color ?? config.text!.color;
    this.fontFamily = config.text!.fontFamily;
  }
}

export interface IGridUnit {
  component?: any;
  template?: any;
  data?: any;
  details?: any;
}

export interface IGridUnitConfig {
  text?: TextConfig;
  background?: BackgroundConfig;
  line?: LineConfig;
}