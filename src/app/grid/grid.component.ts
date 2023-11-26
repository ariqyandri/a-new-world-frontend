import { Component, ElementRef, HostListener } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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
  private _destroyed$ = new Subject<void>()
  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  constructor(
    private el: ElementRef,
    private gridService: GridService,
  ) {
    this.gridService.grid$
      .pipe(takeUntil(this._destroyed$))
      .subscribe((grid) => this._grid = grid);

    this.gridService.config$
      .pipe(takeUntil(this._destroyed$))
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

    const el = this.el.nativeElement as HTMLElement;
    el.style.background = this._config.line.color;
    el.style.gap = this._config.line.width + 'px';
    el.style.gridTemplateColumns = `repeat(auto-fill, minmax(${this._config.size}px, 1fr))`
  }

  @HostListener('window:resize', ['$event'])
  setBoxes() {
    if (!this._config) return;

    const size = this._config.size,
      rows = Math.floor(window.innerHeight / size) - 1,
      columns = Math.floor(window.innerWidth / size);

    this.boxes = [];
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= columns; col++) {
        this.boxes.push(new GridBox(this.boxes.length, row, col));
      }
    }

    this.setSize(rows, columns);
  }

  setSize(rows: number, columns: number) {
    setTimeout(() => {
      let size = new GridSize()
      size.height = (this.el.nativeElement as HTMLElement).offsetHeight;
      size.width = (this.el.nativeElement as HTMLElement).offsetWidth;
      size.rows = rows;
      size.columns = columns;

      this.gridService.setSize(size);
    });
  }
}