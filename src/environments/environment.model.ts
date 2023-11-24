import { GridConfig } from "src/app/common/grid/grid";

export interface IEnvironment {
  production: boolean,
  backend: string,
  grid: GridConfig
}
