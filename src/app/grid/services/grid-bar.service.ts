import { Injectable } from '@angular/core';
import { GridService } from './grid.service';
import { BehaviorSubject, Observable, debounceTime, firstValueFrom, map } from 'rxjs';
import { GridBar } from '../models/grid-bar';
import { GridBarComponent } from '../components/grid-bar/grid-bar.component';
import { GridBox } from '../models/grid-box';
import { GridBoxCollectionService } from './grid-box-collection.service';

@Injectable({
  providedIn: 'root'
})
export class GridBarService {
  public bar$ = new BehaviorSubject<GridBar | undefined>(undefined)

  private _bar?: GridBar
  constructor(
    private gridService: GridService,
    private boxService: GridBoxCollectionService
  ) {
    this.bar$.subscribe((res) => this._bar = res);
    this.boxService.getCollection('bar')
      .pipe(debounceTime(100))
      .subscribe((res) => {
        if (this._bar) {          
          this._bar.elements = res ?? {}
        }
      })
  }

  public register() {
    this._bar = new GridBar();
    this._update()
  }

  public registerBox(box: GridBox) {
    if (this._bar) {
      this._bar.elements[box.id] = box;
      this._update()
    }

    return this.bar$.pipe(map((res) => res?.elements[box.id]))
  }

  public get(key: keyof GridBar): Promise<unknown> {
    return firstValueFrom(this.bar$.pipe(map((res) => res?.[key])))
  }

  private _update() {
    this.bar$.next(this._bar);
    this.gridService.update('bar', this._bar);
  }
}