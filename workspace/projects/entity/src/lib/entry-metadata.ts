import { Type } from '@angular/core';

const METADATA_KEY = '__entity/entry__';

export interface EntryMetadata {
  entry: Type<any>
};

export function getEntryMetadata(target: Type<any>): EntryMetadata {
  const constructor = target;

  const { entry }: EntryMetadata = constructor.hasOwnProperty(METADATA_KEY)
    ? (constructor as any)[METADATA_KEY]
    : {};

  return { entry };
}

export function setEntryMetadata(
  target: Type<any>,
  entry: EntryMetadata
): void {
  const constructor = target;

  if (!constructor.hasOwnProperty(METADATA_KEY)) {
    Object.defineProperty(constructor, METADATA_KEY, { value: entry })
  }
}
