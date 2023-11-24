import { Component, ElementRef, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BigBoxConfig, GridConfig } from 'src/app/common/grid/grid';
import { GridService } from 'src/app/common/grid/grid.service';

@Component({
  selector: 'app-big-box',
  templateUrl: './big-box.component.html',
  styleUrl: './big-box.component.scss'
})
export class BigBoxComponent {

  private _config?: BigBoxConfig;

  constructor(
    private elementRef: ElementRef,
    private gridService: GridService
  ) {
    this.gridService.gridConfig$
      .subscribe((config) => {
        this._config = config?.bigBox;
        this.setStyling()
      })
  }

  setStyling() {
    if (!this._config) return;

    const el = this.elementRef.nativeElement as HTMLElement;
  }
}
