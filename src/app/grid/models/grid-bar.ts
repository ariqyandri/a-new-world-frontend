import { GridUnit, GridUnitConfig } from "./grid-unit";
import { GridBarComponent } from "../components/grid-bar/grid-bar.component";
import { environment } from "src/environments/environment";

export const config = environment.config.bar

export class GridBar extends GridUnit {
  override component?: GridBarComponent;
  override details: GridBarDetails = new GridBarDetails();
  override config: GridBarConfig = new GridBarConfig();

}

export class GridBarDetails {
  height: number = 0;
  width: number = 0;
}

export class GridBarConfig extends GridUnitConfig {
  constructor() {
    super(config.color)
  }
}