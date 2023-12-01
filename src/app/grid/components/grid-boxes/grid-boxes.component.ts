import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject, filter, first, firstValueFrom, takeUntil } from 'rxjs';
import { GridService } from '../../services/grid.service';
import { GridBoxes, GridBoxesDetails } from '../../models/grid-boxes';
import { GridBox } from '../../models/grid-box';
import { GridBoxesService } from '../../services/grid-boxes.service';
import { GridConfig, GridDetails } from '../../models/grid';

@Component({
  selector: 'app-grid-boxes',
  templateUrl: './grid-boxes.component.html',
  styleUrl: './grid-boxes.component.scss'
})
export class GridBoxesComponent implements OnDestroy, AfterViewInit {
  public boxes$?: BehaviorSubject<GridBoxes | undefined>
  public boxes: GridBox[] = [];

  private _destroyed$ = new Subject<void>()
  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  constructor(
    private el: ElementRef,
    private gridService: GridService,
    private boxesService: GridBoxesService,
  ) {
    this.boxes$ = this.boxesService.boxes$
  }

  ngAfterViewInit(): void {
    this.register();
    this.draw()
  }

  register() {
    this.gridService.draw()
      .pipe(first())
      .subscribe(() => {
        this.boxesService.register(this)
      })
  }

  draw() {
    this.gridService.draw()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(({ config, details }) => {
        this.setStyling(config);
        this.build(config, details);
      })
  }

  setStyling(config: GridConfig) {
    if (!config) return;

    const el = this.el.nativeElement as HTMLElement;
    el.style.background = config.boxes?.background?.color || config.background.color;    
    el.style.setProperty('--translate', -config.line.width + 'px')
    el.style.setProperty('--line-width', config.line.width + 'px')
    el.style.setProperty('--line-color', config.line.color)
  }

  build(config: GridConfig, details: GridDetails) {
    if (!config || !details) return;
    const columns = details.columns;
    const rows = details.rows;

    const el = this.el.nativeElement as HTMLElement;
    el.style.height = details.height - details.boxHeight + 'px';
    el.style.width = (details.boxes?.width || details.width) + 'px';
    el.style.gridTemplateColumns = `repeat(${columns}, ${(details.boxes?.width || details.width) / columns}px)`;
    el.style.gridTemplateRows = `repeat(${rows}, ${(details.boxes?.height || details.height) / rows}px)`;
    el.style.backgroundSize = `${(details.boxes?.width || details.width) / columns}px ${(details.boxes?.height || details.height) / rows}px`
    el.style.setProperty('--box-size', `${(details.boxes?.width || details.width) / columns}px ${(details.boxes?.height || details.height) / rows}px`)

    if (this.boxes.length > 0) {
      this.boxes = [];
    }

    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= columns; col++) {
        const index = (columns * (row - 1)) + col - 1
        const box = new GridBox(index, row, col);
        this.boxes.push(box);
      }
    }

    this.setDetails(rows, columns, config);
  }

  setDetails(rows: number, columns: number, config: GridConfig) {
    let details = new GridBoxesDetails()
    details.box = window.innerWidth / columns;
    details.width = window.innerWidth;
    details.height = rows * details.box - config.line.width;
    details.rows = rows;
    details.columns = columns;
    details.total = rows * columns;

    this.boxesService.setDetails(details);
  }
}