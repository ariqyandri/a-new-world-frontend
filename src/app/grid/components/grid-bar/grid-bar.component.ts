import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { GridBarConfig, GridConfig, GridSize } from 'src/app/grid/grid';
import { GridService } from 'src/app/grid/grid.service';

@Component({
  selector: 'app-grid-bar',
  templateUrl: './grid-bar.component.html',
  styleUrl: './grid-bar.component.scss'
})
export class GridBarComponent {
  private _config?: GridBarConfig;

  constructor(
    private elementRef: ElementRef,
    private gridService: GridService
  ) {

    combineLatest([this.gridService.config$, this.gridService.size$])
      .subscribe(([config, size]) => {
        this._config = config?.gridBar;
        this.setStyling(config);
        this.setDimensions(size, config);
      })
  }

  setStyling(gridConfig?: GridConfig) {
    if (!this._config || !gridConfig) return;

    const el = this.elementRef.nativeElement as HTMLElement;
    el.style.background = this._config.color;
    el.style.color = gridConfig.text.color;
    el.style.borderTopWidth = gridConfig.line.width + 'px';
    el.style.borderTopColor = gridConfig.line.color;
  }

  setDimensions(size?: GridSize, gridConfig?: GridConfig) {
    if (!size || !gridConfig) return;

    const el = this.elementRef.nativeElement as HTMLElement;
    el.style.height = (window.innerHeight - size.height - gridConfig?.line.width) + 'px';
    el.style.top = size.height + 'px';
  }
  
  @HostListener('hover', ['$event']) onHover() {

  }
}
