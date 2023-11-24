import { Value } from "../../box/models/box";

export class Property {
  id!: number;
  name!: string;
  type!: PropertyType;
  values?: Value[];

  constructor(id: number, name: string, type: PropertyType, values?: Value[]) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.values = values || [];
  }
}

export class PropertyType {
  id!: number;
  name!: string;
  hasValues!: boolean;

  constructor(id: number, name: string, hasValues: boolean) {
    this.id = id;
    this.name = name;
    this.hasValues = hasValues;
  }
}
