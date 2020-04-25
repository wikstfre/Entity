import { Type } from '@angular/core';

const METADATA_KEY = '__entity/mapped__';

export interface MappedMetadata {
  propertyName: PropertyKey;
  entity: Type<any>;
  key: boolean;
}

export function getMappedMetadata(target: Type<any>): Array<MappedMetadata> {
  const constructor = target;

  return constructor.hasOwnProperty(METADATA_KEY)
    ? (constructor as any)[METADATA_KEY]
    : [];
}

export function setMappedMetadata(
  target: Type<any>,
  entries: Array<MappedMetadata>
): void {
  const constructor = target;

  const metadata: Array<MappedMetadata> = constructor.hasOwnProperty(
    METADATA_KEY
  )
    ? (constructor as any)[METADATA_KEY]
    : Object.defineProperty(constructor, METADATA_KEY, { value: [] })[
        METADATA_KEY
      ]
  Array.prototype.push.apply(metadata, entries);
}

export function getEntityMetadata(target: Type<any>): Array<MappedMetadata> {
  const metadata: Array<MappedMetadata> = [];

  let constructor = target;
  while (constructor) {
    for (const { propertyName, entity, key } of getMappedMetadata(constructor)) {
      Array.prototype.push.call(metadata, { propertyName, entity, key });
    }

    constructor = Object.getPrototypeOf(constructor);
  }

  return metadata;
}
