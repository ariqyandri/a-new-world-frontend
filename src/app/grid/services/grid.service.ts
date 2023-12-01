import { Injectable } from '@angular/core';
import { GridConfig, Grid, GridDetails } from '../models/grid';
import { CookieHandler } from '../../common/handler/cookie.handler';
import { DataService } from './data.service';
import { GridBoxes } from '../models/grid-boxes';
import { GridWindow } from '../models/grid-window';
import { GridBar } from '../models/grid-bar';
import { BehaviorSubject, Observable, Subject, combineLatest, debounceTime, filter, firstValueFrom, map, mergeMap, pairwise } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GridService {
  public grid$ = new BehaviorSubject<Grid | undefined>(undefined)
  public config$ = this.grid$.pipe(map((res) => res?.config))
  public details$ = this.grid$.pipe(map((res) => res?.details))

  public draw$ = new BehaviorSubject<Grid | undefined>(undefined);

  private _grid?: Grid

  constructor(
    private cookieHandler: CookieHandler,
    private dataService: DataService
  ) {
    this.grid$.subscribe((grid) => this._grid = grid)

    firstValueFrom(this.grid$.pipe(filter((res) => Boolean(res?.details && res.details.total > 0))))
      .then((res) => this.draw$.next(res as Grid))
  }

  public build(): Promise<Grid | undefined> {
    let grid = new Grid();
    grid.config = new GridConfig();
    grid.details = new GridDetails();

    this.grid$.next(grid);
    return firstValueFrom(this.grid$);
  }

  public draw(): Observable<Grid> {
    return this.draw$.pipe(filter((res) => Boolean(res?.details && res.details.total > 0))) as Observable<Grid>
  }


  public destroy(): void {
    this.grid$.next(undefined);
  }

  public get(key: keyof Grid): Promise<unknown> {
    return firstValueFrom(this.grid$.pipe(map((res) => res?.[key])))
  }

  public update(name: keyof Grid, value: unknown) {
    if (this._grid) {
      let val;
      switch (name) {
        case 'boxes':
          val = value as GridBoxes;
          this._grid.boxes = val;
          this._grid.details.boxes = val.details;
          this._grid.config.boxes = val.config;
          break;
        case 'bar':
          val = value as GridBar;
          this._grid.bar = val;
          this._grid.details.bar = val.details;
          this._grid.config.bar = val.config;
          break;
        case 'window':
          val = value as GridWindow;
          this._grid.window = val;
          this._grid.details.window = val.details;
          this._grid.config.window = val.config;
          break;
        case 'config':
          this._grid.config = value as GridConfig;
          break;
        case 'details':
          this._grid.details = value as GridDetails;
          break;
      }

      this.grid$.next(this._grid)
    }
  }

  // private _getCookieConfig(config?: GridConfig) {
  //   if (config) {
  //     this.cookieHandler.set(GridCookie.CONFIG, JSON.stringify(config), 100)
  //     return config;
  //   }

  //   let _config = this.cookieHandler.get(GridCookie.CONFIG)

  //   if (_config) {
  //     return JSON.parse(_config)
  //   } else {
  //     this.cookieHandler.set(GridCookie.CONFIG, JSON.stringify(new GridConfig()), 100)
  //     return new GridConfig()
  //   }
  // }
}
