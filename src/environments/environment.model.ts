import { GridConfig } from "src/app/grid/grid";

export interface IEnvironment {
  production: boolean,
  backend: string,
  grid: GridConfig
}
