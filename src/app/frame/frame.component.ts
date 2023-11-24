import { Component, ElementRef, HostListener, WritableSignal, signal } from '@angular/core';
import { GridConfig, GridBox } from '../common/grid/grid';
import { GridService } from '../common/grid/grid.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss'
})
export class FrameComponent {
  public config$!: BehaviorSubject<GridConfig | undefined>;
  private _config?: GridConfig;

  constructor(
    private elementRef: ElementRef,
    private gridService: GridService
  ) {
    this.gridService.gridConfig$.next(new GridConfig())
    
    this.config$ = this.gridService.gridConfig$
    this.config$.subscribe((config) => {
      this._config = config;
      this.setStyling()
    })
  }

  setStyling() {
    if (!this._config) return;

    const el = this.elementRef.nativeElement as HTMLElement
    el.style.background = this._config.background.color
  }
}