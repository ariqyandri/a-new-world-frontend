export class Box {
  id!: number;
  name!: string;
  properties!: Property[]
  config!: Value[]

  constructor(id: number, name: string, properties: Property[], config?: Value[]) {
    this.id = id;
    this.name = name;
    this.properties = properties || [];
    this.config = config || [];
  }
}

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

export class Item {
  id!: number;
  box?: Box;
  values?: Value[];

  constructor(id: number, box: Box, values: Value[]) {
    this.id = id;
    this.box = box;
    this.values = values;
  }
}

export class Value {
  id!: number;
  value!: any;
  property!: Property;

  constructor(id: number, value: any, property: Property) {
    this.id = id;
    this.value = value;
    this.property = property;
  }
}

