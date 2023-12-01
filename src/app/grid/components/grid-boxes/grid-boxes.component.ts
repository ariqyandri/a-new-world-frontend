import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject, filter, firstValueFrom, takeUntil } from 'rxjs';
import { DataService } from '../../services/data.service';
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
export class GridBoxesComponent {
  public boxes$?: BehaviorSubject<GridBoxes | undefined>
  public boxes: GridBox[] = [];

  @ViewChild('box') box?: ElementRef<HTMLElement>;

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
    this.register();
    this.draw()
  }

  async register() {
    await firstValueFrom(this.gridService.draw$)
      .then(() => {
        console.log('bild');
        
        this.boxesService.build(this)
        this.boxes$ = this.boxesService.boxes$
      })
  }

  async draw() {
    this.gridService.draw()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(({ config, details }) => {
        this.setStyling(config);
        this.setBoxes(config, details);
      })
  }

  async setStyling(config: GridConfig) {
    if (!config) return;

    const el = this.el.nativeElement as HTMLElement;
    el.style.background = config.line.color || config.background.color;
    // el.style.gridTemplateColumns = `repeat(auto-fill, minmax(${config.size}px, 1fr))`
    
  }

  async setBoxes(config: GridConfig, details: GridDetails) {
    if (!config) return;

    const el = this.el.nativeElement as HTMLElement;
    el.style.background = config.line.color || config.background.color;
    el.style.gap = config.line.width + 'px';
    el.style.gridTemplateColumns = `repeat(2, 100px)`;
    el.style.gap = config.line.width + 'px';

    const columns = details.columns;
    const rows = details.rows;

    this.boxes = [];
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= columns; col++) {
        const box = new GridBox((rows * (row - 1)) + col, row - 1, col - 1)
        this.boxes.push(box);
      }
    }

    // this.setDetails(rows, columns, config);
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

    const el = this.el.nativeElement as HTMLElement;
    el.style.height = details.height + 'px'
  }
}