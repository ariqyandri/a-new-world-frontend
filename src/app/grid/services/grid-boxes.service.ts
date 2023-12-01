import { Injectable } from '@angular/core';
import { GridBoxes, GridBoxesDetails } from '../models/grid-boxes';
import { GridBoxesComponent } from '../components/grid-boxes/grid-boxes.component';
import { GridService } from './grid.service';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GridBoxesService {
  public boxes$ = new BehaviorSubject<GridBoxes | undefined>(undefined);

  private _boxes?: GridBoxes
  constructor(
    private gridService: GridService
  ) {
    this.boxes$.subscribe((res) => this._boxes = res)

    // this.gridService.grid$
    //   .pipe(map((res) => res?.window))
    //   .subscribe((res) => this.window$.next(res))
  }

  public build(component: GridBoxesComponent) {
    let boxes = new GridBoxes();
    boxes.component = component;
    // console.log(component);

    this._update(boxes)
  }

  public get(key: keyof GridBoxes): Promise<unknown> {
    return firstValueFrom(this.boxes$.pipe(map((res) => res?.[key])))
  }

  public setDetails(details: GridBoxesDetails): void {
    if (this._boxes) {
      this._boxes.details = details;
      this._update(this._boxes)
    }
  }

  private _update(boxes: GridBoxes) {
    this.boxes$.next(boxes);
    this.gridService.update('boxes', boxes);
  }
}
