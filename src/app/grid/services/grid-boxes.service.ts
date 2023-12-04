import { Injectable } from '@angular/core';
import { GridBoxes, GridBoxesDetails } from '../models/grid-boxes';
import { GridBoxesComponent } from '../components/grid-boxes/grid-boxes.component';
import { GridService } from './grid.service';
import { BehaviorSubject, Observable, debounceTime, filter, firstValueFrom, map } from 'rxjs';
import { GridBox } from '../models/grid-box';
import { GridBoxCollectionService } from './grid-box-collection.service';

@Injectable({
  providedIn: 'root',
})
export class GridBoxesService {
  public boxes$ = new BehaviorSubject<GridBoxes | undefined>(undefined);

  private _boxes?: GridBoxes
  constructor(
    private gridService: GridService,
    private boxService: GridBoxCollectionService
  ) {
    this.boxes$.subscribe((res) => this._boxes = res);
    this.boxService.getCollection('boxes')
      .pipe(debounceTime(100))
      .subscribe((res) => {
        if (this._boxes) {          
          this._boxes.elements = res ?? {}
        }
      })
  }

  public register() {
    this._boxes = new GridBoxes()
    this._update()
  }

  public get(key: keyof GridBoxes): Promise<unknown> {
    return firstValueFrom(this.boxes$.pipe(map((res) => res?.[key])))
  }

  public getBox(box: GridBox) {
    return this.boxes$.pipe(filter(((res) => Boolean(res?.elements[box.id]))), map((res) => res?.elements[box.id]))
  }

  public registerBox(box: GridBox) {
    if (this._boxes) {
      this._boxes.elements[box.id] = box;
      this._update()
    }
  }

  public setDetails(details: GridBoxesDetails): void {
    if (this._boxes) {
      this._boxes.details = details;
      this._update()
    }
  }

  private _update() {
    this.boxes$.next(this._boxes);
    this.gridService.update('boxes', this._boxes);
  }
}
