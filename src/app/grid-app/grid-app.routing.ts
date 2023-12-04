import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridAppComponent } from './grid-app.component';

const routes: Routes = [
  {
    path: '',
    component: GridAppComponent,
    children: [
      {
        path: 'play',
        pathMatch: 'full',
        component: GridAppComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GridAppRoutingModule { }
