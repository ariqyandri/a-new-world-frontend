import { Injectable } from '@angular/core';
import { GridService } from './grid.service';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';
import { GridBar } from '../models/grid-bar';
import { GridBarComponent } from '../components/grid-bar/grid-bar.component';

@Injectable({
  providedIn: 'root'
})
export class GridBarService {
  public bar$ = new BehaviorSubject<GridBar | undefined>(undefined)

  constructor(
    private gridService: GridService
  ) {
    // this.gridService.grid$
    //   .pipe(map((res) => res?.window))
    //   .subscribe((res) => this.window$.next(res))
  }

  public build(component: GridBarComponent) {
    let bar = new GridBar();
    bar.component = component
    // console.log(component);

    this.bar$.next(bar);
    this.gridService.update('bar', bar);
  }

  public get(key: keyof GridBar): Promise<unknown> {
    return firstValueFrom(this.bar$.pipe(map((res) => res?.[key])))
  }
}