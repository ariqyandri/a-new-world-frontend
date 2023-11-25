import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { GridConfig, Grid, GridSize, GridBoxConfig, GridBarConfig, GridWindowConfig, GridBox, GridCookie } from './grid';
import { CookieHandler } from '../common/handler/cookie.handler';


@Injectable({
  providedIn: 'root'
})
export class GridService {
  public grid$ = new BehaviorSubject<Grid | undefined>(undefined)
  public size$ = new BehaviorSubject<GridSize | undefined>(undefined)
  public config$ = new BehaviorSubject<GridConfig | undefined>(undefined)
  public active$ = new BehaviorSubject<GridBox | undefined>(undefined)

  private _grid?: Grid

  constructor(private cookieHandler: CookieHandler) {
    this.grid$.subscribe((grid) => this._grid = grid)

    this.config$.subscribe((config) => {
      const grid = this._grid ? { ...this._grid, config } as Grid : new Grid(config);
      this.grid$.next(grid);
    })

    this.size$.subscribe((size) => {
      const grid = this._grid ? { ...this._grid, size } as Grid : new Grid(undefined, size);
      this.grid$.next(grid);
    })

    this.active$.subscribe((active) => {
      const grid = this._grid ? { ...this._grid, active } as Grid : new Grid(undefined, undefined, active);
      this.grid$.next(grid);
    })

  }

  public init(config?: GridConfig, size?: GridSize) {
    // For now we use cookie, in the future and API
    this.setConfig(this._getConfig(config));
    this.setSize(size ?? new GridSize());
  }

  public get() {
    return this._grid;
  }

  public setConfig(config?: GridConfig) {
    this.config$.next(config)
  }

  public setSize(size?: GridSize) {
    this.size$.next(size)
  }

  public setActive(active?: GridBox) {
    this.active$.next(active)
  }

  private _getConfig(config?: GridConfig) {
    if (config) {
      return config;
    }

    let _config = this.cookieHandler.get(GridCookie.CONFIG)
    if (_config) {
      return JSON.parse(_config)
    } else {
      this.cookieHandler.set(GridCookie.CONFIG, JSON.stringify(new GridConfig()), 100)
      return new GridConfig()
    }
  }
}
