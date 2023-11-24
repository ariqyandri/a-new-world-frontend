import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, Subject, config, filter } from 'rxjs';
import { GridBox, GridConfig } from 'src/app/common/grid/grid';
import { GridService } from 'src/app/common/grid/grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
  public boxes: GridBox[] = [];

  private _config?: GridConfig;

  constructor(
    private elementRef: ElementRef,
    private gridService: GridService,
    private renderer: Renderer2
  ) {
    this.gridService.gridConfig$
      .subscribe((config) => {
        this._config = config;
        this.setGrid();
      });
  }

  setGrid() {
    if (!this._config) return;

    this.setBoxes();
    this.setStyling();
  }

  setStyling() {
    if (!this._config) return;

    const el = this.elementRef.nativeElement as HTMLElement;
    el.style.background = this._config.line.color;
    el.style.gap = this._config.line.width + 'px';
    el.style.gridTemplateColumns = `repeat(auto-fill, minmax(${this._config.size}px, 1fr))`
  }

  @HostListener('window:resize', ['$event'])
  private setBoxes() {
    if (!this._config) return;

    const size = this._config.size,
      itemsPerRow = Math.floor(window.innerWidth / size),
      itemsPerColumn = Math.floor(window.innerHeight / size) - 1;

    this.boxes = [];
    // for (let row = itemsPerColumn; row >= 1; row--) {
    //   for (let col = 1; col <= itemsPerRow; col++) {
    //     const letter = String.fromCharCode('A'.charCodeAt(0) + row - 1);
    //     this.boxes.push(new GridBox(row, col));
    //   }
    // }

    // const letter = String.fromCharCode('A'.charCodeAt(0) + row - 1);

    for (let row = 1; row <= itemsPerColumn; row++) {
      for (let col = 1; col <= itemsPerRow; col++) {
        this.boxes.push(new GridBox(row, col));
      }
    }

    setTimeout(() => {
      this.gridService.setHeight((this.elementRef.nativeElement as HTMLElement).offsetHeight)
    });
  }
}