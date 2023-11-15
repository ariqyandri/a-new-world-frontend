import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
  items: any[] = [];
  itemSize = 150; //px
  paddingSize = 10;

  ngOnInit() {
    this.calculateGridItems();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.calculateGridItems();
  }

  private calculateGridItems() {
    const itemsPerRow = Math.floor(window.innerWidth / this.itemSize);
    const itemsPerColumn = Math.floor(window.innerHeight / this.itemSize);

    this.items = [];
    for (let row = itemsPerColumn; row >= 1; row--) {
      for (let col = 1; col <= itemsPerRow; col++) {
        const letter = String.fromCharCode('A'.charCodeAt(0) + row - 1);
        this.items.push(`${letter}${col}`);
      }
    }
  }
}