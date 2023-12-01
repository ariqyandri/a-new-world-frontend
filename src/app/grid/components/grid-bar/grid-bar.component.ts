import { Component, ElementRef, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, firstValueFrom, takeUntil } from 'rxjs';
import { GridService } from 'src/app/grid/services/grid.service';
import { GridBarService } from '../../services/grid-bar.service';
import { GridBar } from '../../models/grid-bar';
import { GridConfig, GridDetails } from '../../models/grid';

@Component({
  selector: 'app-grid-bar',
  templateUrl: './grid-bar.component.html',
  styleUrl: './grid-bar.component.scss'
})
export class GridBarComponent implements OnDestroy {
  public bar$?: BehaviorSubject<GridBar | undefined>

  private _destroyed$ = new Subject<void>()
  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  constructor(
    private el: ElementRef,
    private gridService: GridService,
    private barService: GridBarService
  ) {
    this.register();
    this.draw()
  }

  async register() {
    await firstValueFrom(this.gridService.draw$)
      .then(() => {
        this.barService.build(this)
        this.bar$ = this.barService.bar$
      })
  }

  async draw() {
    this.gridService.draw()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(({ config, details }) => {
        this.setStyling(config);
        this.setDimensions(config, details);
      })
  }

  setStyling(config?: GridConfig) {
    if (!config) return;

    const el = this.el.nativeElement as HTMLElement;
    el.style.background = config.bar.color;
    el.style.color = config.text.color;
    el.style.fontFamily = config.text.fontFamily;
    el.style.borderTopWidth = config.line.width + 'px';
    el.style.borderTopColor = config.line.color;
  }

  setDimensions(config?: GridConfig, details?: GridDetails) {
    if (!config || !details) return;

    const el = this.el.nativeElement as HTMLElement;
    el.style.height = details.boxHeight + 'px';
    el.style.width = (details.bar?.width || details.width) + 'px';
  }
}
