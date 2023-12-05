import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, filter, first, map, tap } from 'rxjs';
import { GridBox, GridBoxCollection } from '../models/grid-box';
import { GridData, GridDataCollection, GridDataGroup } from '../models/grid-data';
import { GridService } from './grid.service';
import { Grid } from '../models/grid';
import { GridDataCollectionService } from './grid-data-collection.service';
// import { GridDataCollectionService } from './grid-box-collection.service';


@Injectable({
  providedIn: 'root'
})
export class GridDataConstructorService {
  public ready$ = new BehaviorSubject<boolean>(false)

  private _dataCollection: GridDataCollection = new GridDataCollection()
  private _grid?: Grid
  constructor(
    private gridService: GridService,
    private boxCollectionService: GridDataCollectionService
  ) {
    this.boxCollectionService.dataCollection$
      .pipe(tap((res) => this.ready$.next(Boolean(Object.keys(res.bar).length > 0) && Object.keys(res.boxes).length > 0)))
      .subscribe((res) => this._dataCollection = res)
    this.boxCollectionService.dataCollection$
      .subscribe((res) => this._dataCollection = res)
    this.gridService.grid$
      .subscribe((res) => this._grid = res)
  }

  setData(gridBoxId: string, data: any) {
    // let _dataCollection = this._dataCollection || {} as GridDataCollection;
    // _dataCollection[gridBoxId] = data;
    // this.dataCollection$.next(_dataCollection)
  }

  // getData(gridBoxId: string): Observable<GridBox | undefined> {
  //   return this.dataCollection$.pipe(map((dataCollection) => dataCollection?.[gridBoxId]))
  // }

  constructWindow(data: GridData): void {
    if (this._dataCollection) {
      this.clearWindow();

      this._dataCollection.window = data;
    }

  }

  clearWindow(): void {

  }

  constructBar(group: GridDataGroup): void {
    this.ready$.pipe(filter((res) => res), first())
      .subscribe(() => {
        const { dataList, start, end } = group
        const collection = this._dataCollection.bar

        const ids = Object.keys(collection)
        for (let i = 0; i < ids.length; i++) {
          const id = ids[i];
          if (start && i === 0) {
            collection[id] = start
          } else if (end && i === (ids.length - 1)) {
            collection[id] = end
          } else {
            collection[id] = dataList[i]
          }
        }

        // this._dataCollection.bar = collection

        // this.boxCollectionService.update(this._dataCollection)
      })
  }

  clearBar(): void {
    this._dataCollection.bar = {}
  }


  constructBoxes(groups: GridDataGroup[], rows?: number): void {
    this.ready$.pipe(filter((res) => res), first())
      .subscribe(() => {
        const collection = this._dataCollection.boxes
        const totalColumns = this._grid?.details.columns || 20
        const rowPerGroup = rows || 1;
        let startRow = 1;

        for (let i = 0; i < groups.length; i++) {
          const group = groups[i];
          const maxRows = rowPerGroup + startRow;
          let dataIndex = 0;

          for (let row = startRow; row <= maxRows; row++) {
            if (row == maxRows) {
              startRow += rowPerGroup;
              break
            }
            for (let col = 1; col <= totalColumns; col++) {
              const id = `${row}:${col}`;
              if (group.start && row === startRow && col === 1) {
                collection[id] = group.start
              } else if (group.end && row === maxRows - 1 && col === totalColumns) {
                collection[id] = group.end
              } else {
                collection[id] = group.dataList[dataIndex]
                dataIndex++
              }
            }
          }
        }

        this._dataCollection.boxes = collection
        this.boxCollectionService.update(this._dataCollection)
      })
  }

  clearBoxes(): void {

  }

  clear() {
    // this.dataCollection$.next({})
  }
}
