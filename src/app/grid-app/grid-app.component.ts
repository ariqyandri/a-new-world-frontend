import { Component } from '@angular/core';
import { GridService } from '../grid/services/grid.service';

@Component({
  selector: 'app-grid-app',
  templateUrl: './grid-app.component.html',
  styleUrl: './grid-app.component.scss'
})
export class GridAppComponent {
  constructor(
    private gridService: GridService
  ) {
    // this.gridService.grid$.subscribe((res) => console.log(res))
  }
}
