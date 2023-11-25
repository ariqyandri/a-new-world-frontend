import { Component, ElementRef, Input } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { GridWindowConfig, GridWindowView, GridConfig, GridSize } from 'src/app/grid/grid';
import { GridService } from 'src/app/grid/grid.service';

@Component({
  selector: 'app-grid-window',
  templateUrl: './grid-window.component.html',
  styleUrl: './grid-window.component.scss'
})
export class GridWindowComponent {
  public view?: GridWindowView;

  private _config?: GridWindowConfig;

  constructor(
    private elementRef: ElementRef,
    private gridService: GridService
  ) {
    this.gridService.config$
      .subscribe((config) => {
        this._config = config?.gridBar;
        this.setStyling(config);
      })
    this.gridService.size$
      .subscribe((size) => {
        this.setDimensions(size);
      })
  }

  setStyling(gridConfig?: GridConfig) {
    if (!this._config || !gridConfig) return;

    const el = this.elementRef.nativeElement as HTMLElement;
    el.style.background = this._config.color
    el.style.minWidth = gridConfig.size + 'px'
    el.style.color = gridConfig.text.color
  }

  setDimensions(size?: GridSize) {
    if (!this._config || !size) return;

    const el = this.elementRef.nativeElement as HTMLElement;
    switch (this._config.view) {
      case GridWindowView.FULL:
        el.style.height = '100%'
        el.style.width = '100%'
        break;
      case GridWindowView.WINDOW:
      default:
        el.style.height = size.box * 4 + 'px'
        el.style.width = size.box * 4 + 'px'
        el.style.bottom = '0'
        el.style.right = '0'
        break;
    }
  }

  setPosition() {
    // Adjust from the position / where the grid is clicked
  }
}
