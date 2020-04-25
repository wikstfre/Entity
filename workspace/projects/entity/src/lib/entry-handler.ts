import { Type } from '@angular/core';

import { EntityEntryMixin } from './entity-entry-mixin';
import { ArrayEntryMixin } from './array-entry-mixin';

import { EntityEntryHandler } from './entity-entry-handler';
import { ArrayEntryHandler } from './array-entry-handler';

import { isEntry, Entry } from './entry';

import { isArray } from './utils';

export class EntryHandler implements ProxyHandler<Type<any>> {
  construct(target: Type<any>, argArray: any, newTarget?: any): object {
    const source = argArray.shift();
    const initialState = argArray.shift();

    if (isEntry(source)) {
      return source;
    }

    let entry: Entry;
    let handler: ProxyHandler<Entry>;

    if (isArray(source)) {
      const ArrayEntryInternal = ArrayEntryMixin(
        target
      );

      entry = new ArrayEntryInternal();
      handler = new ArrayEntryHandler();
    } else {
      const EntityEntryInternal = EntityEntryMixin(
        target
      );

      entry = new EntityEntryInternal();
      handler = new EntityEntryHandler();
    }

    entry.load(
      source,
      initialState
    );

    return new Proxy(
      entry,
      handler
    );
  }
}
