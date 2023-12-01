import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, first, firstValueFrom, map, takeUntil } from 'rxjs';
import { GridConfig, GridDetails } from 'src/app/grid/models/grid';
import { GridService } from 'src/app/grid/services/grid.service';
import { DataService } from '../../services/data.service';
import { GridBox } from '../../models/grid-box';
import { GridBoxesService } from '../../services/grid-boxes.service';
import { GridBarService } from '../../services/grid-bar.service';
import { GridBoxService } from '../../services/grid-box.service';

@Component({
  selector: 'app-grid-box',
  templateUrl: './grid-box.component.html',
  styleUrl: './grid-box.component.scss'
})
export class GridBoxComponent implements OnDestroy, AfterViewInit {
  @Input() container!: 'boxes' | 'bar';
  @Input() box!: GridBox;

  public box$?: Observable<GridBox | undefined>;

  private _destroyed$ = new Subject<void>()
  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  constructor(
    private el: ElementRef,
    private gridService: GridService,
    private boxService: GridBoxService
  ) {
    this.box$ = this.boxService.get(this.box, this.container)
  }

  ngAfterViewInit(): void {
    this.register();
    this.draw()
  }

  register() {
    this.gridService.draw()
      .pipe(first())
      .subscribe(() => {
        this.boxService.register(this, this.box, this.container)
      })
  }

  draw() {
    this.gridService.draw()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(({ config }) => {
        this.setStyling(config);
      })
  }

  setHighlight(highlighted: boolean) {
    const el = (this.el.nativeElement as HTMLElement);

    if (highlighted) {
      el.style.filter = 'invert(1)'
    } else {
      el.style.filter = 'invert(0)'
    }
  }

  setStyling(config?: GridConfig) {
    if (!config) return;

    const el = (this.el.nativeElement as HTMLElement);
    el.style.color = config[this.container]?.text?.color || config.text.color;
    el.style.fontFamily = config.text.fontFamily;
  }


  @HostListener("click", ['$event'])
  onClick(event: MouseEvent) {
    if (this.el.nativeElement.contains(event.target) && this.box) {
      // this.gridService.setState(!this.highlighted$.getValue() ? this.box : undefined)
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEsc(event: KeyboardEvent) {
    // this.gridService.setState(undefined, 'highlighted');
    event.preventDefault()
  }

}
