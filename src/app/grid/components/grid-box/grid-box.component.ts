import { OnInit, Component, ElementRef, HostListener, Input, OnDestroy, ComponentFactoryResolver, ViewContainerRef, inject, ChangeDetectorRef, ViewChild, Type, TemplateRef, ComponentRef, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, distinctUntilChanged, filter, first, firstValueFrom, map, takeUntil } from 'rxjs';
import { GridConfig, GridDetails, GridStyleProperty } from 'src/app/grid/models/grid';
import { GridService } from 'src/app/grid/services/grid.service';
import { DataService } from '../../services/data.service';
import { GridBox, GridBoxDetails } from '../../models/grid-box';
import { GridBoxesService } from '../../services/grid-boxes.service';
import { GridBarService } from '../../services/grid-bar.service';
import { GridBoxCollectionService } from '../../services/grid-box-collection.service';
import { GridWindowService } from '../../services/grid-window.service';

@Component({
  selector: 'app-grid-box',
  templateUrl: './grid-box.component.html',
  styleUrl: './grid-box.component.scss'
})
export class GridBoxComponent implements OnDestroy, AfterViewInit {
  @Input() container!: 'boxes' | 'bar';
  @Input() box!: GridBox;

  public box$?: Observable<GridBox | undefined>;

  @ViewChild('demo', { read: TemplateRef }) demo!: TemplateRef<any>;
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
    private boxService: GridBoxCollectionService,
    private windowService: GridWindowService,
  ) { }

  ngAfterViewInit(): void {
    this.register();
    this.draw();
    this.construct();
  }

  register() {
    this.gridService.draw()
      .pipe(first())
      .subscribe(() => {
        this.boxService.register(this.box, this.container);
        this.box$ = this.boxService.get(this.box, this.container);
        this.box$.pipe(takeUntil(this._destroyed$))
          .subscribe((res) => {
            if (res) {
              this.box = res
            }
          })

      })
  }

  draw() {
    this.gridService.draw()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(({ config }) => {
        this.setStyling(config);
      })
  }

  construct() {
    this.boxService.get(this.box, this.container)
      .pipe(takeUntil(this._destroyed$))
      .subscribe((res) => {
        this.renderTemplate(res.template, res.data);
      })
  }

  setStyling(config?: GridConfig) {
    if (!config) return;

    const el = this.el.nativeElement as HTMLElement;
    el.style.setProperty(GridStyleProperty.TEXT_COLOR, config[this.container]?.text?.color || config.text.color)
    el.style.setProperty(GridStyleProperty.TEXT_FONT_FAMILY, config[this.container]?.text?.fontFamily || config.text.fontFamily)
  }

  setDetails(details?: GridDetails) {
    if (!details) return;
    let _details = new GridBoxDetails;
    _details.height = details.boxHeight
    _details.width = details.width
  }

  renderTemplate(template?: any, data?: any) {
    const el = this.el.nativeElement as HTMLElement;
    if (!template && !data) {
      el.classList.add('empty')
      return
    } else {
      el.classList.remove('empty')
    }

    this.vcr.clear();
    if (!template) {
      this.vcr.createEmbeddedView(this.simpleTemplate, { $implicit: data });
    } else {
      let component = this.vcr.createComponent(template);
      if ('data' in component) {
        component.data = data
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


  @HostListener("click", ['$event'])
  async onClick(event: MouseEvent) {
    if (this.el.nativeElement.contains(event.target) && this.box$) {
      // this.renderTemplate(this.demo, 'Clicked')
      this.windowService.activate(this.box)
      // this.gridService.setState(!this.highlighted$.getValue() ? this.box : undefined)
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEsc(event: KeyboardEvent) {
    // this.gridService.setState(undefined, 'highlighted');
    event.preventDefault()
  }

}
