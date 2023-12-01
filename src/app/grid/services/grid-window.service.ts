import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';
import { GridWindowComponent } from '../components/grid-window/grid-window.component';
import { GridWindow } from '../models/grid-window';
import { GridService } from './grid.service';


@Injectable({
  providedIn: 'root'
})
export class GridWindowService {
  public window$ = new BehaviorSubject<GridWindow | undefined>(undefined)

  constructor(
    private gridService: GridService
  ) {
    // this.gridService.grid$
    //   .pipe(map((res) => res?.window))
    //   .subscribe((res) => this.window$.next(res))
  }

  public build(component: GridWindowComponent) {
    let window = new GridWindow();
    window.component = component
    // console.log(component);

    this.window$.next(window);
    this.gridService.update('window', window);
  }

  public get(key: keyof GridWindow): Promise<unknown> {
    return firstValueFrom(this.window$.pipe(map((res) => res?.[key])))
  }
}
