import { Component, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, config, firstValueFrom, takeUntil } from 'rxjs';
import { Grid, GridConfig, GridDetails } from 'src/app/grid/models/grid';
import { GridService } from 'src/app/grid/services/grid.service';
import { GridBox } from './models/grid-box';
import { GridBoxesDetails } from './models/grid-boxes';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements OnDestroy {
  public grid$!: BehaviorSubject<Grid | undefined>;

  constructor(
    private el: ElementRef,
    private gridService: GridService
  ) {
    this.build();
    this.grid$ = this.gridService.grid$;
  }

  ngOnDestroy(): void {
    this.gridService.destroy();
  }

  async build(grid?: Grid) {
    const _grid = grid ?? await this.gridService.build()
    const config = _grid?.config
    if (!config) return;

    const size = config.size;
    const columns = Math.floor(window.innerWidth / size);
    const rows = Math.floor(window.innerHeight / size)

    const el = this.el.nativeElement as HTMLElement

    let details = grid ? grid.details : new GridDetails();
    details.height = el.offsetHeight;
    details.width = el.offsetWidth;
    details.rows = rows;
    details.columns = columns;
    details.total = rows * columns;
    details.boxHeight = details.height / details.rows;
    details.boxWidth = details.width / details.columns;

    this.gridService.update('details', details)
  }


  @HostListener('window:resize', ['$event'])
  async resize() {
    this.build(await firstValueFrom(this.grid$))
  }
}

// implements OnDestroy {
//   public grid$ ?: BehaviorSubject<Grid | undefined>;

//   private _destroyed$ = new Subject<void>()
//   ngOnDestroy(): void {
//     this._destroyed$.next();
//     this._destroyed$.complete();
//   }

//   constructor(
//     private el: ElementRef,
//     private gridService: GridService
//   ) {
//     this.grid$ = this.gridService.grid$;
//     this.gridService.config$
//       .pipe(takeUntil(this._destroyed$))
//       .subscribe((res) => this.setStyling(res));
//     this.gridService.details$
//       .subscribe();
//   }

//   setStyling(config ?: GridConfig) {
//     if (!config) return;

//     const el = this.el.nativeElement as HTMLElement;
//     el.style.background = config.background.color;
//   }
// }