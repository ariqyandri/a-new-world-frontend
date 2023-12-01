import { Injectable } from '@angular/core';
import { GridService } from './grid.service';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';
import { GridBar } from '../models/grid-bar';
import { GridBarComponent } from '../components/grid-bar/grid-bar.component';
import { GridBox } from '../models/grid-box';

@Injectable({
  providedIn: 'root'
})
export class GridBarService {
  public bar$ = new BehaviorSubject<GridBar | undefined>(undefined)

  private _bar?: GridBar
  constructor(
    private gridService: GridService
  ) {
    this.bar$.subscribe((res) => this._bar = res);
  }

  public register(component: GridBarComponent) {
    let bar = new GridBar();
    bar.component = component

    this.bar$.next(bar);
    this.gridService.update('bar', bar);
  }

  public registerBox(box: GridBox) {
    if (this._bar) {
      this._bar.elements[box.id] = box;
      this._update(this._bar)
    }

    return this.bar$.pipe(map((res) => res?.elements[box.id]))
  }

  public get(key: keyof GridBar): Promise<unknown> {
    return firstValueFrom(this.bar$.pipe(map((res) => res?.[key])))
  }

  private _update(bar: GridBar) {
    this.bar$.next(bar);
    this.gridService.update('bar', bar);
  }
}