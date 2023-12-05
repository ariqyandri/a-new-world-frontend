import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';
import { GridWindow } from '../models/grid-window';
import { GridService } from './grid.service';
import { GridBox } from '../models/grid-box';


@Injectable({
  providedIn: 'root'
})
export class GridWindowService {
  public window$ = new BehaviorSubject<GridWindow | undefined>(undefined)

  private _window?: GridWindow;
  constructor(
    private gridService: GridService,
  ) {
    this.window$.subscribe((res) => this._window = res);
  }

  public register() {
    this._window = new GridWindow();
    this._update()
  }

  public activate(box?: GridBox): void {
    if (this._window) {
      this._window.active = box;
      this._update();
    }
  }
  public deactivate(): void {
    if (this._window) {
      this._window.active = undefined;
      this._update();
    }
  }

  public active(): Observable<GridBox | undefined> {
    return this.window$.pipe(map((res) => res?.active))
  }

  public get(key: keyof GridWindow): Promise<unknown> {
    return firstValueFrom(this.window$.pipe(map((res) => res?.[key])))
  }

  private _update() {
    this.window$.next(this._window);
    this.gridService.update('window', this._window);
  }
}
