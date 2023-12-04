import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appGridTemplate]'
})
export class GridTemplateDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
