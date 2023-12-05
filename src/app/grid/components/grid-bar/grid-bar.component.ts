import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, Subject, firstValueFrom, takeUntil } from 'rxjs';
import { GridService } from 'src/app/grid/services/grid.service';
import { GridBarService } from '../../services/grid-bar.service';
import { GridBar } from '../../models/grid-bar';
import { GridConfig, GridDetails, GridStyleProperty } from '../../models/grid';
import { GridBox } from '../../models/grid-box';

@Component({
  selector: 'app-grid-bar',
  templateUrl: './grid-bar.component.html',
  styleUrl: './grid-bar.component.scss'
})
export class GridBarComponent implements OnDestroy, AfterViewInit {
  public bar$?: BehaviorSubject<GridBar | undefined>
  public boxes: GridBox[] = [];

  @ViewChild('boxesContainer', { read: ElementRef }) boxesContainer?: ElementRef;

  private _destroyed$ = new Subject<void>()
  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  constructor(
    private el: ElementRef,
    private gridService: GridService,
    private barService: GridBarService,
  ) {
    this.bar$ = this.barService.bar$
  }

  ngAfterViewInit(): void {
    this.register();
    this.draw()
  }

  register() {
    firstValueFrom(this.gridService.draw())
      .then(() => this.barService.register())
  }

  draw() {
    this.gridService.draw()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(({ config, details }) => {
        this.setStyling(config);
        this.build(config, details);
      })
  }

  setStyling(config?: GridConfig) {
    if (!config) return;

    const el = this.el.nativeElement as HTMLElement;
    el.style.border = `${config.bar?.line?.width || config.line.width}px ${config.bar?.line?.color || config.line.color} solid`
    el.style.borderTop = 'none'
    el.style.background = config.bar?.background?.color || config.background.color;
    el.style.color = config.bar?.text?.color || config.text.color;
    el.style.fontFamily = config.bar?.text?.fontFamily || config.text.fontFamily;
  }

  build(config?: GridConfig, details?: GridDetails) {
    if (!config || !details) return;
    const columns = details.columns;
    const rows = 1;

    const el = this.el.nativeElement as HTMLElement;
    el.style.height = details.boxHeight + 'px';
    el.style.width = (details.bar?.width || details.width) + 'px';

    const boxesEl = this.boxesContainer?.nativeElement
    boxesEl.style.gridTemplateColumns = `repeat(${columns}, ${details.boxWidth}px)`;
    boxesEl.style.gridTemplateRows = `repeat(${rows}, ${details.boxHeight}px)`;

    if (this.boxes.length > 0) {
      this.boxes = [];
    }

    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= columns; col++) {
        const index = (columns * (row - 1)) + col - 1
        const box = new GridBox(index, row, col);
        this.boxes.push(box);
      }
    }
  }
}
