import { environment } from "src/environments/environment";

export const config = environment.grid as GridConfig

export enum GridCookie {
  CONFIG = 'grid_config'
}

export class Grid {
  config: GridConfig
  size: GridSize;
  state?: GridState;

  constructor(config?: GridConfig, size?: GridSize, state?: GridState) {
    this.config = config ?? new GridConfig();
    this.size = size ?? new GridSize();
    this.state = state ?? undefined;
  }
}

export type GridState = {
  [key in GridStateType]?: GridBox;
}
export const GRID_STATE_TYPE = ['active', 'highlighted'] as const
export type GridStateType = typeof GRID_STATE_TYPE[number]

export class GridSize {
  height: number = 0;
  width: number = 0;
  rows: number = 0;
  columns: number = 0;

  get box() {
    return this.rows && this.columns ? this.height / this.rows : 0;
  }

  get total() {
    return this.rows && this.columns ? this.rows * this.columns : 0;
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