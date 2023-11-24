import { environment } from "src/environments/environment";

const config = environment.grid as GridConfig

export class GridBox {
  id!: string
  row!: number;
  col!: number;
  constructor(row: number, col: number) {
    this.id = `${row}:${col}`;
    this.row = row;
    this.col = col;
  }
}

export class GridConfig {
  size!: number;
  background!: BackgroundConfig;
  line!: LineConfig;
  text!: TextConfig;
  smallBox!: SmallBoxConfig;
  bigBox!: BigBoxConfig;
  bar!: BarConfig;

  constructor() {
    this.size = config.size;
    this.background = config.background;
    this.line = config.line;
    this.text = config.text;
    this.smallBox = config.smallBox;
    this.bigBox = config.bigBox;
    this.bar = config.smallBox;
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

export class SmallBoxConfig extends GridBoxConfig { }

export class BigBoxConfig extends GridBoxConfig { }

export class BarConfig extends GridBoxConfig { }