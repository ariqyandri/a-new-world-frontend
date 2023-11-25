import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FrameComponent } from "./frame/frame.component";
import { GridBarComponent } from "./components/grid-bar/grid-bar.component";
import { GridBoxComponent } from "./components/grid-box/grid-box.component";
import { GridWindowComponent } from "./components/grid-window/grid-window.component";
import { GridComponent } from "./grid.component";
import { GridRoutingModule } from "./grid.routing";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    GridComponent,
    GridWindowComponent,
    GridBoxComponent,
    GridBarComponent,
    FrameComponent,
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
