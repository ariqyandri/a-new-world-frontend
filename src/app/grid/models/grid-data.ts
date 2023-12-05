import { TemplateRef, Type } from "@angular/core";

export class GridData {
  data?: any;
  click?: (e: Event) => void
  template?: TemplateRef<any>;
  component?: Type<any>;

  constructor(data?: any, template?: TemplateRef<any> | Type<any>, click?: (e: Event) => void) {
    this.data = data;
    if (template instanceof TemplateRef) {
      this.template = template
    } else {
      this.component = template
    }

    this.click = click;
  }
}

export class GridDataGroup {
  start?: GridData;
  end?: GridData;
  dataList: GridData[] = [];
  constructor(dataList?: GridData[], start?: GridData, end?: GridData) {
    this.dataList = dataList || [];
    this.start = start;
    this.end = end;
  }
}

export class GridDataCollection {
  boxes: { [key: string]: GridData | undefined } = {};
  bar: { [key: string]: GridData | undefined } = {};
  window?: GridData;
}

export class GridDataOptions {
  maxColumns?: number;
}