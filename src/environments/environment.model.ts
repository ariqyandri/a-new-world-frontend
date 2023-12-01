import { GridConfig } from "src/app/grid/models/grid";

export interface IEnvironment {
  production: boolean,
  backend: string,
  config: GridConfig
}
