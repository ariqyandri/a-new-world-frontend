import { Injectable } from '@angular/core';
import { GridBoxes, GridBoxesDetails } from '../models/grid-boxes';
import { GridService } from './grid.service';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GridBoxesService {
  public boxes$ = new BehaviorSubject<GridBoxes | undefined>(undefined);

  private _boxes?: GridBoxes
  constructor(
    private gridService: GridService,
  ) {
    this.boxes$.subscribe((res) => this._boxes = res);
  }

  public register() {
    this._boxes = new GridBoxes()
    this._update()
  }

  public get(key: keyof GridBoxes): Promise<unknown> {
    return firstValueFrom(this.boxes$.pipe(map((res) => res?.[key])))
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
