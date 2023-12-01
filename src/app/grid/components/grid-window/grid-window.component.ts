import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest, firstValueFrom, map, takeUntil } from 'rxjs';
import { GridService } from 'src/app/grid/services/grid.service';
import { GridWindow, GridWindowView } from '../../models/grid-window';
import { GridWindowService } from '../../services/grid-window.service';
import { GridBox } from '../../models/grid-box';

@Component({
  selector: 'app-grid-window',
  templateUrl: './grid-window.component.html',
  styleUrl: './grid-window.component.scss'
})
export class GridWindowComponent {
  public window$?: BehaviorSubject<GridWindow | undefined>

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
    // this.windowService.build(this);
    // this.window$ = this.windowService.window$

    // // Active
    // this.window$
    //   .pipe(map((res) => res?.active), takeUntil(this._destroyed$))
    //   .subscribe((res) => this.setActive(res))
  }

  async setActive(active?: GridBox) {
    const details = await firstValueFrom(this.gridService.details$);
    if (!details) return;

    const el = this.el.nativeElement as HTMLElement;
    // if (active) {
    //   this.setStyling();
    //   this.setDimensions();

    //   el.style.display = 'block'
    //   let divider = !(details.boxes.columns % 2) ? details.boxes.columns / 2 : (details.boxes.columns + 1) / 2

    //   if (active?.col + 1 > divider) {
    //     el.style.left = '0'
    //     el.style.right = 'unset'
    //   } else {
    //     el.style.right = '0'
    //     el.style.left = 'unset'
    //   }
    // } else {
    //   el.style.display = 'none'
    // }
  }

  async setStyling() {
    const config = await firstValueFrom(this.gridService.config$);
    if (!config) return;

    const el = this.el.nativeElement as HTMLElement;
    el.style.background = config.window.color;
    el.style.minWidth = config.size + 'px'
    el.style.color = config.text.color
  }

  async setDimensions() {
    const config = await firstValueFrom(this.gridService.config$);
    const details = await firstValueFrom(this.gridService.details$);
    if (!config || !details) return;

    const el = this.el.nativeElement as HTMLElement;
    // switch (config.window.view) {
    //   case GridWindowView.FULL:
    //     el.style.height = '100%'
    //     el.style.width = '100%'
    //     break;
    //   case GridWindowView.WINDOW:
    //   default:
    //     el.style.height = details.boxes.box * (Math.ceil(details.boxes.rows)) + 'px'
    //     el.style.width = details.boxes.box * (Math.ceil((details.boxes.columns / 2) - 0.5)) + 'px'
    //     el.style.bottom = '0'
    //     el.style.right = '0'
    //     break;
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
