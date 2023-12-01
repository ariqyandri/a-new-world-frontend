export class GridUnit {
  component?: any;
  template?: any;
  data?: any;
  details!: any;
  config!: GridUnitConfig;
}

export class GridUnitConfig {
  color!: string;
  constructor(color: string) {
    this.color = color
  }
}