import { Injectable } from '@angular/core';
import { GridService } from './grid.service';
import { BehaviorSubject, Observable, debounceTime, firstValueFrom, map } from 'rxjs';
import { GridBar } from '../models/grid-bar';

@Injectable({
  providedIn: 'root'
})
export class GridBarService {
  public bar$ = new BehaviorSubject<GridBar | undefined>(undefined)

  private _bar?: GridBar
  constructor(
    private gridService: GridService,
  ) {
    this.bar$.subscribe((res) => this._bar = res);
  }
  public register() {
    this._bar = new GridBar();
    this._update()
  }

  public get(key: keyof GridBar): Promise<unknown> {
    return firstValueFrom(this.bar$.pipe(map((res) => res?.[key])))
  }

  private _update() {
    this.bar$.next(this._bar);
    this.gridService.update('bar', this._bar);
  }
}