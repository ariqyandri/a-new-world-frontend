import { Box, Item, Property, PropertyType, Value } from "./box";

export const propertyTypes: PropertyType[] = [
  new PropertyType(1, 'text', false)
]

export const properties: Property[] = [
  new Property(1, 'title', propertyTypes[0])
]

export const boxes: Box[] = [
  new Box(1, 'log', properties)
]

export const values: Value[] = [
  new Value(1, 'a new world', properties[0])
]

export const items: Item[] = [
  new Item(1, boxes[0], values)
]
