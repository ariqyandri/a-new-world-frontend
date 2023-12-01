import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { GridBarComponent } from "./components/grid-bar/grid-bar.component";
import { GridBoxComponent } from "./components/grid-box/grid-box.component";
import { GridWindowComponent } from "./components/grid-window/grid-window.component";
import { GridComponent } from "./grid.component";
import { GridRoutingModule } from "./grid.routing";
import { CommonModule } from "@angular/common";
import { pages } from "./pages/pages";
import { GridBoxesComponent } from './components/grid-boxes/grid-boxes.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    GridComponent,
    GridBarComponent,
    GridBoxComponent,
    GridBoxesComponent,
    GridWindowComponent,
    ...pages,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GridRoutingModule,
    CommonModule
  ],
  exports: [],
  providers: [],
  bootstrap: []
})
export class GridModule { }
