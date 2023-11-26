import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest, takeUntil } from 'rxjs';
import { GridBarConfig, GridBox, GridConfig, GridSize } from 'src/app/grid/grid';
import { GridService } from 'src/app/grid/grid.service';

@Component({
  selector: 'app-grid-bar',
  templateUrl: './grid-bar.component.html',
  styleUrl: './grid-bar.component.scss'
})
export class GridBarComponent {
  private _config?: GridBarConfig;
  private _destroyed$ = new Subject<void>()
  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  constructor(
    private el: ElementRef,
    private gridService: GridService
  ) {
    combineLatest([this.gridService.config$, this.gridService.size$])
      .pipe(takeUntil(this._destroyed$))
      .subscribe(([config, size]) => {
        this._config = config?.gridBar;
        this.setStyling(config);
        this.setDimensions(size, config);
      })
  }

  setStyling(gridConfig?: GridConfig) {
    if (!this._config || !gridConfig) return;

    const el = this.el.nativeElement as HTMLElement;
    el.style.background = this._config.color;
    el.style.color = gridConfig.text.color;
    el.style.borderTopWidth = gridConfig.line.width + 'px';
    el.style.borderTopColor = gridConfig.line.color;
  }

  setDimensions(size?: GridSize, gridConfig?: GridConfig) {
    if (!size || !gridConfig) return;

    const el = this.el.nativeElement as HTMLElement;
    el.style.height = (window.innerHeight - size.height - gridConfig?.line.width) + 'px';
    el.style.top = size.height + 'px';
  }
}
