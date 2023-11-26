import { Component, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, map, takeUntil } from 'rxjs';
import { GridConfig, GridBoxConfig, GridBox } from 'src/app/grid/grid';
import { GridService } from 'src/app/grid/grid.service';

@Component({
  selector: 'app-grid-box',
  templateUrl: './grid-box.component.html',
  styleUrl: './grid-box.component.scss'
})
export class GridBoxComponent implements OnDestroy {
  @Input() box?: GridBox;
  public highlighted$ = new BehaviorSubject<boolean>(false);

  private _config?: GridBoxConfig;
  private _destroyed$ = new Subject<void>()
  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  constructor(
    private el: ElementRef,
    private gridService: GridService
  ) {
    this.gridService.config$
      .pipe(takeUntil(this._destroyed$))
      .subscribe((config) => {
        this._config = config?.gridBox;
        this.setStyling(config)
      })
    this.gridService.state$
      .pipe(map((state) => state?.highlighted), takeUntil(this._destroyed$))
      .subscribe((box) => {
        if (this.box) {
          this.highlighted$.next(box?.id === this.box?.id);
          this.setHighlight(box?.id === this.box?.id)
        }
      })
  }

  setHighlight(highlighted: boolean) {
    const el = (this.el.nativeElement as HTMLElement);

    if (highlighted) {
      el.style.filter = 'invert(1)'
    } else {
      el.style.filter = 'invert(0)'
    }
  }

  setStyling(gridConfig?: GridConfig) {
    if (!gridConfig || !this._config) return;

    const el = (this.el.nativeElement as HTMLElement);
    el.style.background = this._config.color
    el.style.minWidth = gridConfig.size + 'px'
    el.style.color = gridConfig.text.color
  }


  @HostListener("click", ['$event']) onClick(event: MouseEvent) {
    if (this.el.nativeElement.contains(event.target) && this.box) {
      this.gridService.setState(!this.highlighted$.getValue() ? this.box : undefined)
    }
  }
}
