import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, debounceTime, filter, map } from 'rxjs';
import { GridBox, GridBoxCollection } from '../models/grid-box';
import { GridBoxComponent } from '../components/grid-box/grid-box.component';
import { GridService } from './grid.service';

@Injectable({
  providedIn: 'root',
})
export class GridBoxCollectionService {
  public boxCollection$ = new BehaviorSubject<GridBoxCollection>({});

  private _boxCollection: GridBoxCollection = {};
  private _update$ = new Subject();
  constructor(
    private gridService: GridService
  ) {
    this.boxCollection$.subscribe((res) => {
      this._boxCollection = res
    });
    this._update$.pipe(debounceTime(100))
      .subscribe(() => this._update())

  }

  public register(box: GridBox, container: 'boxes' | 'bar') {
    this._boxCollection[container] = this._boxCollection[container] ?? {};
    this._boxCollection[container][box.id] = box;
    this._update$.next(null)
  }

  public get(box: GridBox, container: 'boxes' | 'bar') {
    return this.boxCollection$.pipe(filter(((res) => Boolean(res?.[container]?.[box.id]))), map((res) => res?.[container]?.[box.id]))
  }

  public getCollection(container: 'boxes' | 'bar') {
    return this.boxCollection$.pipe(filter(((res) => Boolean(res?.[container]))), map((res) => res?.[container]))
  }

  private _update() {
    this.boxCollection$.next(this._boxCollection);
    this.gridService.update('boxCollection', this._boxCollection);
  }
}
