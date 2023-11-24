import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { BigBoxConfig, GridConfig, BarConfig, SmallBoxConfig } from './grid';


@Injectable({
  providedIn: 'root'
})
export class GridService {
  public gridConfig$ = new BehaviorSubject<GridConfig | undefined>(undefined)
  public gridHeight$ = new BehaviorSubject<number | undefined>(undefined)

  constructor(private http: HttpClient) {
  }

  public setHeight(height: number) {   
    this.gridHeight$.next(height)
  }
}
