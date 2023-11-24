import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GridConfig, SmallBoxConfig } from 'src/app/common/grid/grid';
import { GridService } from 'src/app/common/grid/grid.service';

@Component({
  selector: 'app-small-box',
  templateUrl: './small-box.component.html',
  styleUrl: './small-box.component.scss'
})
export class SmallBoxComponent {
  @Input() row?: number
  @Input() col?: number

  private _config?: SmallBoxConfig;

  constructor(
    private elementRef: ElementRef,
    private gridService: GridService
  ) {
    this.gridService.gridConfig$
      .subscribe((config) => {
        this._config = config?.smallBox;
        this.setStyling(config)
      })
  }

  setStyling(gridConfig?: GridConfig) {
    if (!gridConfig || !this._config) return;

    const el = (this.elementRef.nativeElement as HTMLElement);
    el.style.background = this._config.color
    el.style.minWidth = gridConfig.size + 'px'
    el.style.color = gridConfig.text.color
  }
}
