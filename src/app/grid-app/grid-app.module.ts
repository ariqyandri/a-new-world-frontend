import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridAppComponent } from './grid-app.component';
import { GridAppRoutingModule } from './grid-app.routing';
import { GridModule } from '../grid/grid.module';
import { BoxComponent } from './components/box/box.component';



@NgModule({
  declarations: [
    GridAppComponent,
    BoxComponent
  ],
  imports: [
    CommonModule,
    GridAppRoutingModule,
    GridModule
  ]
})
export class GridAppModule {
  constructor(){
  }
}
