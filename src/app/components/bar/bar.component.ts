import { Component, ElementRef, Input } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { BarConfig, GridConfig } from 'src/app/common/grid/grid';
import { GridService } from 'src/app/common/grid/grid.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss'
})
export class BarComponent {
  public config$!: BehaviorSubject<GridConfig | undefined>;

  private _config?: BarConfig;

  constructor(
    private elementRef: ElementRef,
    private gridService: GridService
  ) {
    combineLatest([this.gridService.gridConfig$, this.gridService.gridHeight$])
      .subscribe(([config, height]) => {
        this._config = config?.bar;
        this.setStyling(config, height)
      })
  }

  setStyling(gridConfig?: GridConfig, height?: number) {
    if (!this._config || !gridConfig || !height) return;

    const el = this.elementRef.nativeElement as HTMLElement;
    el.style.color = gridConfig.text.color
    el.style.background = this._config.color
    el.style.height = (window.innerHeight - height - gridConfig.line.width) + 'px';
    el.style.top = height + 'px';
    el.style.borderTopWidth = gridConfig.line.width + 'px';
    el.style.borderTopColor = gridConfig.line.color;
  }
}
