import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, debounceTime, filter, map, tap } from 'rxjs';
import { GridBox, GridBoxCollection } from '../models/grid-box';
import { GridService } from './grid.service';
import { GridDataCollection } from '../models/grid-data';

@Injectable({
  providedIn: 'root',
})
export class GridDataCollectionService {
  public dataCollection$ = new BehaviorSubject<GridDataCollection>(new GridDataCollection());

  private _dataCollection: GridDataCollection = new GridDataCollection();
  private _update$ = new Subject();
  constructor(
    private gridService: GridService
  ) {
    this.dataCollection$
      .subscribe((res) => this._dataCollection = res);
    this._update$.pipe(debounceTime(100))
      .subscribe(() => this.update())
  }

  public registerBox(box: GridBox, container: 'boxes' | 'bar') {
    this._dataCollection[container]![box.id] = undefined;
    this._update$.next(null)
  }

  public getBox(box: GridBox, container: 'boxes' | 'bar') {
    return this.dataCollection$.pipe(filter(((res) => Boolean(res?.[container]?.[box.id]))), map((res) => res?.[container]?.[box.id]))
  }

  public getBoxCollection(container: 'boxes' | 'bar') {
    return this.dataCollection$.pipe(filter(((res) => Boolean(res?.[container]))), map((res) => res?.[container]))
  }

  public update(boxCollection?: GridDataCollection) {
    this.dataCollection$.next(boxCollection ?? this._dataCollection);
    this.gridService.update('dataCollection', boxCollection ?? this._dataCollection);
  }
}
