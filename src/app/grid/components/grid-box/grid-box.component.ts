import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { GridConfig, GridBoxConfig, GridBox } from 'src/app/grid/grid';
import { GridService } from 'src/app/grid/grid.service';

@Component({
  selector: 'app-grid-box',
  templateUrl: './grid-box.component.html',
  styleUrl: './grid-box.component.scss'
})
export class GridBoxComponent {
  @Input() box?: GridBox;

  private _config?: GridBoxConfig;

  constructor(
    private elementRef: ElementRef,
    private gridService: GridService
  ) {
    this.gridService.config$
      .subscribe((config) => {
        this._config = config?.gridBox;
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

  
  @HostListener("click") onClick(){
    if (this.box) {
      this.gridService.setActive(this.box)
    };
  }
}
