import { Component, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { GridService } from '../services/grid.service';
import { GridBox } from '../models/grid-box';
import { GridBoxesDetails } from '../models/grid-boxes';
import { GridDetails } from '../models/grid';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnDestroy {
  constructor(
    private el: ElementRef,
    private gridService: GridService
  ) {
  }

  ngOnDestroy(): void {
    // this.gridService.destroy()
  }
}
