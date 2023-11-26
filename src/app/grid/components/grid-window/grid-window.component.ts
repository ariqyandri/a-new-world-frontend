import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest, map, takeUntil } from 'rxjs';
import { GridWindowConfig, GridWindowView, GridConfig, GridSize, GridBox } from 'src/app/grid/grid';
import { GridService } from 'src/app/grid/grid.service';

@Component({
  selector: 'app-grid-window',
  templateUrl: './grid-window.component.html',
  styleUrl: './grid-window.component.scss'
})
export class GridWindowComponent {
  public active$ = new BehaviorSubject<GridBox | undefined>(undefined);
  public view?: GridWindowView;

  private _gridSize?: GridSize;
  private _config?: GridWindowConfig;
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
        this._config = config?.gridBar;
        this.setStyling(config);
      })
    this.gridService.size$
      .pipe(takeUntil(this._destroyed$))
      .subscribe((size) => {
        this._gridSize = size
        this.setDimensions();
      })
    this.gridService.state$
      .pipe(map((state) => state?.active), takeUntil(this._destroyed$))
      .subscribe((active) => {
        this.active$.next(active);
        this.setActive(active)
      })
  }

  setActive(active?: GridBox) {
    const el = this.el.nativeElement as HTMLElement;

    el.style.display = active ? 'block' : 'none'
    if (active && this._gridSize) {
      if (active?.col / this._gridSize.columns > (0.5)) {
        el.style.left = '0'
        el.style.right = 'unset'
      } else {
        el.style.right = '0'
        el.style.left = 'unset'
      }
    }
  }

  setStyling(gridConfig?: GridConfig) {
    if (!this._config || !gridConfig) return;

    const el = this.el.nativeElement as HTMLElement;
    el.style.background = this._config.color
    el.style.minWidth = gridConfig.size + 'px'
    el.style.color = gridConfig.text.color
  }

  setDimensions() {
    if (!this._config || !this._gridSize) return;

    const el = this.el.nativeElement as HTMLElement;
    switch (this._config.view) {
      case GridWindowView.FULL:
        el.style.height = '100%'
        el.style.width = '100%'
        break;
      case GridWindowView.WINDOW:
      default:
        el.style.height = this._gridSize.box * (Math.ceil(this._gridSize.rows / 2) + 1) + 'px'
        el.style.width = this._gridSize.box * (Math.ceil((this._gridSize.columns / 2) - 0.5)) + 'px'
        el.style.bottom = '0'
        el.style.right = '0'
        break;
    }
  }

  setPosition() {
    // Adjust from the position / where the grid is clicked
  }

  close() {
    this.gridService.setState(undefined)
  }

  @HostListener("click", ['$event'])
  onClick(event: MouseEvent) {
    if (this.el.nativeElement.contains(event.target)) {
      this.gridService.setState(undefined)
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEsc(event: KeyboardEvent) {
    this.gridService.setState(undefined, 'active');
    event.preventDefault()
  }

}
