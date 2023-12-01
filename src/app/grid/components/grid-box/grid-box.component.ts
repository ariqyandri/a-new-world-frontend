import { OnInit, Component, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, firstValueFrom, map, takeUntil } from 'rxjs';
import { GridConfig, GridDetails } from 'src/app/grid/models/grid';
import { GridService } from 'src/app/grid/services/grid.service';
import { DataService } from '../../services/data.service';
import { GridBox } from '../../models/grid-box';

@Component({
  selector: 'app-grid-box',
  templateUrl: './grid-box.component.html',
  styleUrl: './grid-box.component.scss'
})
export class GridBoxComponent implements OnDestroy, OnInit {
  @Input() box?: GridBox;
  public box$ = new BehaviorSubject<GridBox | undefined>(undefined);

  private _destroyed$ = new Subject<void>()
  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  constructor(
    private el: ElementRef,
    private gridService: GridService,
  ) {
    // this.setStyling()

    // this.gridService.draw$
    //   .pipe(takeUntil(this._destroyed$))
    //   .subscribe(([grid, config, details]) => {       
    //     this.setStyling(config, details);
    //   })
  }

  ngOnInit(): void {
    if (this.box) {
      // this.data$ = this.gridDataService.getData(this.box.id)
    }
  }

  setHighlight(highlighted: boolean) {
    const el = (this.el.nativeElement as HTMLElement);

    if (highlighted) {
      el.style.filter = 'invert(1)'
    } else {
      el.style.filter = 'invert(0)'
    }
  }

  setStyling(config?: GridConfig, details?: GridDetails) {
    if (!config || !details) return;

    const el = (this.el.nativeElement as HTMLElement);
    el.style.background = config.box.color
    el.style.minWidth = config.size + 'px'
    el.style.color = config.text.color
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
