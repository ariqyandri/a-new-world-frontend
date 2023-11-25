import { Component, ElementRef, HostListener, OnDestroy, WritableSignal, signal } from '@angular/core';
import { GridConfig, GridBox } from '../grid';
import { GridService } from '../grid.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss'
})
export class FrameComponent implements OnDestroy {
  public config?: GridConfig;

  constructor(
    private elementRef: ElementRef,
    private gridService: GridService
  ) {
    this.gridService.init()
    this.gridService.config$
      .subscribe((config) => {
        this.config = config;
        this.setStyling()
      })
  }

  ngOnDestroy(): void {
    this.gridService.grid$.next(undefined)
  }

  setStyling() {
    if (!this.config) return;

    const el = this.elementRef.nativeElement as HTMLElement
    el.style.background = this.config.background.color
  }
}