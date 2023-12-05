import { Component, ElementRef, HostListener, Input, OnDestroy, ViewContainerRef, inject, ChangeDetectorRef, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { Observable, Subject, first, takeUntil } from 'rxjs';
import { GridConfig, GridDetails, GridStyleProperty } from 'src/app/grid/models/grid';
import { GridService } from 'src/app/grid/services/grid.service';
import { GridBox, GridBoxDetails } from '../../models/grid-box';
import { GridDataCollectionService } from '../../services/grid-data-collection.service';
import { GridData } from '../../models/grid-data';

@Component({
  selector: 'app-grid-box',
  templateUrl: './grid-box.component.html',
  styleUrl: './grid-box.component.scss'
})
export class GridBoxComponent implements OnDestroy, AfterViewInit {
  @Input() container!: 'boxes' | 'bar';
  @Input() box!: GridBox;

  @ViewChild('simpleTemplate', { read: TemplateRef }) simpleTemplate!: TemplateRef<any>;
  @ViewChild('vcr', { static: true, read: ViewContainerRef }) vcr!: ViewContainerRef;
  private _cdr = inject(ChangeDetectorRef)

  private _destroyed$ = new Subject<void>()
  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  constructor(
    private el: ElementRef,
    private gridService: GridService,
    private dataCollectionService: GridDataCollectionService,
  ) { }

  ngAfterViewInit(): void {
    this.register();
    this.draw();
    this.construct();
  }

  register() {
    this.gridService.draw()
      .pipe(first())
      .subscribe(() => this.dataCollectionService.registerBox(this.box, this.container))
  }

  draw() {
    this.gridService.draw()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(({ config }) => this.setStyling(config))
  }

  construct() {
    this.dataCollectionService.getBox(this.box, this.container)
      .pipe(takeUntil(this._destroyed$))
      .subscribe((res) => this.render(res))
  }

  setStyling(config?: GridConfig) {
    if (!config) return;

    const el = this.el.nativeElement as HTMLElement;
    el.classList.add('empty')
    el.style.setProperty(GridStyleProperty.TEXT_COLOR, config[this.container]?.text?.color || config.text.color)
    el.style.setProperty(GridStyleProperty.TEXT_FONT_FAMILY, config[this.container]?.text?.fontFamily || config.text.fontFamily)
    el.style.setProperty(GridStyleProperty.LINE_WIDTH, (config[this.container]?.line?.width || config.line.width) + 'px')
    el.style.setProperty(GridStyleProperty.LINE_COLOR, config[this.container]?.line?.color || config.line.color)
  }

  setDetails(details?: GridDetails) {
    if (!details) return;
    let _details = new GridBoxDetails;
    _details.height = details.boxHeight
    _details.width = details.width

  }

  render(boxData?: GridData) {
    if (!boxData) return;
    const el = this.el.nativeElement as HTMLElement;
    el.classList.remove('empty')

    this.vcr.clear();
    if (!boxData?.template && !boxData?.component) {
      this.vcr.createEmbeddedView(this.simpleTemplate, { $implicit: boxData.data });
    }

    if (boxData?.template) {
      this.vcr.createEmbeddedView(boxData?.template, { $implicit: boxData.data });
    } else if (boxData?.component) {
      let component = this.vcr.createComponent(boxData?.component);
      if (typeof boxData.data === 'object') {
        for (const key in boxData.data) {
          if (Object.prototype.hasOwnProperty.call(boxData.data, key)) {
            component.instance[key] = boxData.data[key]
          }
        }
      }
    }
    this._cdr.detectChanges();
  }

  setHighlight(highlighted: boolean) {
    const el = (this.el.nativeElement as HTMLElement);

    if (highlighted) {
      el.style.filter = 'invert(1)'
    } else {
      el.style.filter = 'invert(0)'
    }
  }
}
