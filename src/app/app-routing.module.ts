import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { FrameComponent } from './frame/frame.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FrameComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
