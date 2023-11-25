import { Component, ElementRef, HostListener } from '@angular/core';
import { Grid, GridBox, GridConfig, GridSize } from 'src/app/grid/grid';
import { GridService } from 'src/app/grid/grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
  public boxes: GridBox[] = [];

  private _grid?: Grid;
  private _config?: GridConfig;

  constructor(
    private elementRef: ElementRef,
    private gridService: GridService,
  ) {
    this.gridService.grid$
      .subscribe((grid) => this._grid = grid);

    this.gridService.config$
      .subscribe((config) => {
        this._config = config;
        this.drawGrid();
      });
  }

  drawGrid() {
    if (!this._config) return;

    this.setBoxes();
    this.setStyling();
  }

  setStyling() {
    if (!this._config) return;

    const el = this.elementRef.nativeElement as HTMLElement;
    el.style.background = this._config.line.color;
    el.style.gap = this._config.line.width + 'px';
    el.style.gridTemplateColumns = `repeat(auto-fill, minmax(${this._config.size}px, 1fr))`
  }

  @HostListener('window:resize', ['$event'])
  setBoxes() {
    if (!this._config) return;

    const size = this._config.size,
      rows = Math.floor(window.innerWidth / size),
      columns = Math.floor(window.innerHeight / size) - 1;

    this.boxes = [];
    for (let row = 1; row <= columns; row++) {
      for (let col = 1; col <= rows; col++) {
        this.boxes.push(new GridBox(this.boxes.length, row, col));
      }
    }

    this.setSize(rows, columns);
  }

  setSize(rows: number, columns: number) {
    setTimeout(() => {
      let size = new GridSize()
      size.height = (this.elementRef.nativeElement as HTMLElement).offsetHeight;
      size.width = (this.elementRef.nativeElement as HTMLElement).offsetWidth;
      size.row = rows;
      size.col = columns;

      this.gridService.setSize(size);
    });
  }
}