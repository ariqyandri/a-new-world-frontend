import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { GridBox } from '../models/grid-box';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  // public dataCollection$ = new BehaviorSubject<GridDataCollection | undefined>(undefined)

  // private _dataCollection?: GridDataCollection

  constructor() {
    // this.dataCollection$.subscribe((collection) => this._dataCollection = collection)
  }

  setData(gridBoxId: string, data: any) {
    // let _dataCollection = this._dataCollection || {} as GridDataCollection;
    // _dataCollection[gridBoxId] = data;
    // this.dataCollection$.next(_dataCollection)
  }

  // getData(gridBoxId: string): Observable<GridBox | undefined> {
  //   return this.dataCollection$.pipe(map((dataCollection) => dataCollection?.[gridBoxId]))
  // }

  constructBoxes(...dataSets: any[]): any {
    let _dataSets = dataSets.filter((d) => d)
    for (let row = 0; row <= _dataSets.length; row++) {
      if (_dataSets[row]) {
        for (let col = 0; col <= _dataSets[row].length; col++) {
          this.setData(`${row}:${col}`, _dataSets[row][col])
        }
      };
    }
  }

  constructBar(...dataSets: any[]): any {
    let _dataSets = dataSets.filter((d) => d)
    for (let row = 0; row <= _dataSets.length; row++) {
      if (_dataSets[row]) {
        for (let col = 0; col <= _dataSets[row].length; col++) {
          this.setData(`${row}:${col}`, _dataSets[row][col])
        }
      };
    }
  }

  constructWindow(...dataSets: any[]): any {
    let _dataSets = dataSets.filter((d) => d)
    for (let row = 0; row <= _dataSets.length; row++) {
      if (_dataSets[row]) {
        for (let col = 0; col <= _dataSets[row].length; col++) {
          this.setData(`${row}:${col}`, _dataSets[row][col])
        }
      };
    }
  }

  reset() {
    // this.dataCollection$.next({})
  }
}
