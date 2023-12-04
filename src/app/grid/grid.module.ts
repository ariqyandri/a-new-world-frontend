import { NgModule } from "@angular/core";
import { GridBarComponent } from "./components/grid-bar/grid-bar.component";
import { GridBoxComponent } from "./components/grid-box/grid-box.component";
import { GridWindowComponent } from "./components/grid-window/grid-window.component";
import { GridComponent } from "./grid.component";
import { CommonModule } from "@angular/common";
import { GridBoxesComponent } from './components/grid-boxes/grid-boxes.component';
import { GridTemplateDirective } from "./directives/grid-template.directive";

@NgModule({
  declarations: [
    GridComponent,
    GridBarComponent,
    GridBoxComponent,
    GridBoxesComponent,
    GridWindowComponent,
    GridTemplateDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    GridComponent
  ],
})
export class GridModule { }
