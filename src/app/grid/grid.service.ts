import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest, filter } from 'rxjs';
import { GridConfig, Grid, GridSize, GridBoxConfig, GridBarConfig, GridWindowConfig, GridBox, GridCookie, GridState, GridStateType, GRID_STATE_TYPE } from './grid';
import { CookieHandler } from '../common/handler/cookie.handler';


@Injectable({
  providedIn: 'root'
})
export class GridService {
  public grid$ = new BehaviorSubject<Grid | undefined>(undefined)
  public size$ = new BehaviorSubject<GridSize | undefined>(undefined)
  public config$ = new BehaviorSubject<GridConfig | undefined>(undefined)
  public state$ = new BehaviorSubject<GridState | undefined>(undefined)

  private _grid?: Grid

  constructor(private cookieHandler: CookieHandler) {
    this.grid$
      .subscribe((grid) => this._grid = grid)

    this.config$
      .pipe(filter((config) => config !== undefined))
      .subscribe((config) => this.updateGrid('config', config as GridConfig))

    this.size$
      .pipe(filter((size) => size !== undefined))
      .subscribe((size) => this.updateGrid('size', size as GridSize))

    this.state$
      .pipe(filter((state) => state !== undefined))
      .subscribe((state) => this.updateGrid('state', state as GridState))

  }

  public init(config?: GridConfig, size?: GridSize) {
    this.setConfig(config ?? new GridConfig());
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

  public setState(state?: GridBox, type?: GridStateType) {
    let _state: GridState = this.state$.getValue() || {} as GridState
    if (type) {
      _state[type] = state
    } else {
      GRID_STATE_TYPE.forEach((type) => _state[type] = state)
    }    

    this.state$.next(_state)
  }

  public updateGrid(attribute: 'config' | 'size' | 'state', value: GridConfig | GridSize | GridState) {
    if (this._grid) {
      const grid = this._grid;
      switch (attribute) {
        case 'config':
          grid.config = value as GridConfig;
          break;
        case 'size':
          grid.size = value as GridSize;
          break;
        case 'state':
          grid.state = value as GridState;
          break;
      }
      this.grid$.next(grid);
    }
  }

  private _getCookieConfig(config?: GridConfig) {
    if (config) {
      this.cookieHandler.set(GridCookie.CONFIG, JSON.stringify(config), 100)
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
