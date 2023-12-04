import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./grid-app/grid-app.module').then((m) => m.GridAppModule),
  }
  // ,
  // {
  //   path: '',
  //   children: [
  //     {
  //       path: 'app',
  // loadChildren: () => import('./grid/grid.module').then((m) => m.GridModule),
  //     }
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
