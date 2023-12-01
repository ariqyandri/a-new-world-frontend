import { OnInit, OnDestroy, Component } from '@angular/core';
import { GridService } from '../../services/grid.service';
import { DataService } from '../../services/data.service';
import { Grid } from '../../models/grid';
import { BehaviorSubject, Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent implements OnDestroy {
  public grid$ = new BehaviorSubject<Grid | undefined>(undefined);

  private _destroyed$ = new Subject<void>()
  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  constructor(
    private gridService: GridService,
    private dataService: DataService
  ) {
    this.gridService.grid$
      .pipe(
        filter((grid) => Boolean(grid?.boxes && grid?.bar && grid?.window)),
        takeUntil(this._destroyed$)
      )
      .subscribe(() => this.consructData())
  }

  consructData() {
    this.dataService.constructBoxes(['a', 'b', 'd', 'd', 'e', 'f'], ['A', 'B', 'C', 'D', 'E', 'F'])
  }

}
