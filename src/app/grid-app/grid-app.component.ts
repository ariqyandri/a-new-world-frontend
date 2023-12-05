import { AfterViewInit, Component, TemplateRef, ViewChild, Type } from '@angular/core';
import { GridService } from '../grid/services/grid.service';
import { GridData, GridDataCollection, GridDataGroup } from '../grid/models/grid-data';
import { GridDataConstructorService } from '../grid/services/grid-data-constuctor.service';
import { BoxComponent } from './components/box/box.component';
// import { GridDataCollectionService } from '../grid/services/grid-data-collection.service';

@Component({
  selector: 'app-grid-app',
  templateUrl: './grid-app.component.html',
  styleUrl: './grid-app.component.scss'
})
export class GridAppComponent implements AfterViewInit {

  @ViewChild('box', { read: TemplateRef }) box!: TemplateRef<any>;

  constructor(
    private gdc: GridDataConstructorService
  ) {
  }

  async ngAfterViewInit(): Promise<void> {
    this.gdc.constructBar(
      new GridDataGroup([
        new GridData('7', this.box)
      ])
    )
    this.gdc.constructBoxes([
      new GridDataGroup([
        new GridData(''),
        new GridData('A'),
        new GridData('New'),
        new GridData('World'),
      ], new GridData('Where'), new GridData('Dawns'))
    ], 1)
  }

  onClick(data: any) {
    console.log(data);
  }
}
