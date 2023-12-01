import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { GridBox, GridBoxCollection } from '../models/grid-box';
import { GridBoxComponent } from '../components/grid-box/grid-box.component';

@Injectable({
  providedIn: 'root',
})
export class GridBoxService {
  public boxCollection$ = new BehaviorSubject<GridBoxCollection>({});

  private _boxCollection: GridBoxCollection = {}
  constructor() {
    this.boxCollection$.subscribe((res) => this._boxCollection = res);
  }

  public register(component: GridBoxComponent, box: GridBox, container: 'boxes' | 'bar') {
    box.component = component;

    if (this._boxCollection) {
      this._boxCollection[container] = this._boxCollection[container] ?? {};
      this._boxCollection[container][box.id] = box;
      this._update(this._boxCollection)
    }
  }

  public get(box: GridBox, container: 'boxes' | 'bar') {
    return this.boxCollection$.pipe(map((res) => res?.[container]?.[box.id]))
  }

  private _update(boxCollection: GridBoxCollection) {
    this.boxCollection$.next(boxCollection);
  }
}
