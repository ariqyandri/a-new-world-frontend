import { environment } from "src/environments/environment";

export const config = environment.grid as GridConfig

export enum GridCookie {
  CONFIG = 'grid_config'
}

export class Grid {
  config: GridConfig = new GridConfig();
  size: GridSize;
  active?: GridBox;

  constructor(config?: GridConfig, size?: GridSize, active?: GridBox) {
    this.config = config ?? new GridConfig();
    this.size = size ?? new GridSize();
    this.active = active;
  }


}

/**
 * 
 */
export class GridSize {
  height: number = 0;
  width: number = 0;
  row: number = 0;
  col: number = 0;

  get box() {
    return this.row && this.col ? this.height / this.col : 0;
  }

  get total() {
    return this.row && this.col ? this.row * this.col : 0;
  }
}

export class GridBox {
  id!: string
  index!: number;
  row!: number;
  col!: number;
  constructor(index: number, row: number, col: number) {
    this.id = `${index}-${row}:${col}`;
    this.index = index;
    this.row = row;
    this.col = col;
  }
}

export class GridConfig {
  size!: number;
  background!: BackgroundConfig;
  line!: LineConfig;
  text!: TextConfig;
  gridBox!: GridBoxConfig;
  gridWindow!: GridWindowConfig;
  gridBar!: GridBarConfig;

  constructor() {
    this.size = config.size;
    this.background = config.background;
    this.line = config.line;
    this.text = config.text;
    this.gridBox = config.gridBox;
    this.gridWindow = config.gridWindow;
    this.gridBar = config.gridBox;
  }
}

export class BackgroundConfig {
  color!: string;
  image?: string;
  constructor(color: string, image?: string) {
    this.color = color ?? config.background.color;
    this.image = image
  }
}

export class LineConfig {
  color!: string;
  width!: number;
  constructor(color: string, width?: number) {
    this.color = color
    this.width = width || environment.grid.line.width
  }
}
export class TextConfig {
  color!: string;
  fontFamily?: string;
  constructor(color: string, fontFamily?: string) {
    this.color = color
    this.fontFamily = fontFamily
  }
}

export class GridBoxConfig extends BackgroundConfig { }

export class GridWindowConfig extends GridBoxConfig {
  view?: GridWindowView;
  constructor(color: string, image?: string, view?: GridWindowView) {
    super(color, image)
    this.view = view || GridWindowView.WINDOW
  }
}

export enum GridWindowView {
  FULL = 'FULL',
  WINDOW = 'WINDOW'
}

export class GridBarConfig extends GridBoxConfig { }