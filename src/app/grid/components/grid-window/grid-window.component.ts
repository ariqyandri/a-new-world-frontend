import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, first, firstValueFrom, map, mergeWith, takeUntil } from 'rxjs';
import { GridService } from 'src/app/grid/services/grid.service';
import { GridWindow, GridWindowView } from '../../models/grid-window';
import { GridWindowService } from '../../services/grid-window.service';
import { GridBox } from '../../models/grid-box';
import { GridConfig, GridDetails } from '../../models/grid';

@Component({
  selector: 'app-grid-window',
  templateUrl: './grid-window.component.html',
  styleUrl: './grid-window.component.scss'
})
export class GridWindowComponent {
  public window$?: BehaviorSubject<GridWindow | undefined>
  public active$?: BehaviorSubject<GridBox | undefined>

  private _destroyed$ = new Subject<void>()
  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  constructor(
    private el: ElementRef,
    private gridService: GridService,
    private windowService: GridWindowService
  ) {
    this.window$ = this.windowService.window$
  }

  ngAfterViewInit(): void {
    this.register();
    this.draw()
  }

  register() {
    this.gridService.draw()
      .pipe(first())
      .subscribe(() => {
        this.windowService.register(this)
      })
  }

  draw() {
    this.gridService.draw()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(({ config, details }) => {
        this.setStyling(config);
        this.build(config, details);
      })
    combineLatest([this.gridService.draw(), this.windowService.active()])
      .pipe(takeUntil(this._destroyed$))
      .subscribe(([grid, box]) => {
        this.active$?.next(box);
        this.setActive(box, grid.details);
      })
  }

  setStyling(config: GridConfig) {
    if (!config) return;

    const el = this.el.nativeElement as HTMLElement;
    el.style.background = config.window?.background?.color || config.background.color;
    el.style.minWidth = config.size + 'px'
    el.style.color = config.window?.text?.color || config.text.color
  }

  build(config: GridConfig, details: GridDetails) {
    if (!config || !details) return;

    const rows = details.rows;
    const columns = details.columns;
    const el = this.el.nativeElement as HTMLElement;
    switch (config?.window?.view) {
      case GridWindowView.FULL:
        el.style.height = '100%'
        el.style.width = '100%'
        break;
      case GridWindowView.WINDOW:
      default:
        el.style.height = (rows - 1) * details.boxHeight + 'px'
        el.style.width = (columns / 2) * details.boxWidth + 'px'
        el.style.bottom = '0'
        el.style.right = '0'
        break;
    }
  }

  async setActive(active?: GridBox, details?: GridDetails) {
    if (!details) return;

    const el = this.el.nativeElement as HTMLElement;
    if (active) {
      el.style.display = 'block'
    } else {
      el.style.display = 'none'
    }

    // let divider = !(details.boxes.columns % 2) ? details.boxes.columns / 2 : (details.boxes.columns + 1) / 2

    // if (active?.col + 1 > divider) {
    //   el.style.left = '0'
    //   el.style.right = 'unset'
    // } else {
    //   el.style.right = '0'
    //   el.style.left = 'unset'
    // }
  }


  setPosition() {
    // Adjust from the position / where the grid is clicked
  }

  close() {
    // this.gridService.setState(undefined)
  }

  @HostListener("click", ['$event'])
  onClick(event: MouseEvent) {
    if (this.el.nativeElement.contains(event.target)) {
      // this.gridService.setState(undefined)
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEsc(event: KeyboardEvent) {
    // this.gridService.setState(undefined, 'active');
    event.preventDefault()
  }

}
