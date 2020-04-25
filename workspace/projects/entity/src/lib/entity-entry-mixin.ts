import { Type } from '@angular/core';

import { EntityState } from './entity-state';

import { EntityEntry } from './entity-entry';
import { isEntry } from './entry';

import { getEntryMetadata } from './entry-metadata';
import { getEntityMetadata } from './entity-metadata';

export const EntityEntryMixin = (target: Type<any>) => {
  const metadata = {};

  for (const { propertyName, entity, key } of getEntityMetadata(target)) {
    metadata[propertyName] = { entity, key };
  }

  return class extends target implements EntityEntry {
    state: EntityState;

    getProperty: ((p: PropertyKey) => any) = (p: PropertyKey) => {
      return Reflect.get(this, p);
    }

    setProperty: ((p: PropertyKey, value: any) => boolean) = (p: PropertyKey, value: any) => {
      if (metadata.hasOwnProperty(p)) {
        const { entity } = metadata[p];

        if (value && entity) {
          const { entry } = getEntryMetadata(entity);

          value = new entry(
            value
          );
        }

        if (!entity && this.state === EntityState.Unchanged) {
          this.state = EntityState.Modified;
        }
      }

      return Reflect.set(this, p, value);
    }

    load: ((source: any, initialState?: EntityState) => void) = (source: any, initialState?: EntityState) => {
      this.getPropertyNames().forEach(p => {
        const { entity } = metadata[p];

        let value = p in source
          ? source[p]
          : this.getProperty(p);

        if (value && entity) {
          const { entry } = getEntryMetadata(entity);

          value = new entry(
            value,
            initialState
          );
        }

        Reflect.set(this, p, value);
      });

      this.state = source.state || initialState;

      if (!this.state) {
        this.state = this.isKeySet()
          ? EntityState.Unchanged
          : EntityState.Added;
      }
    }

    hasChanges: (() => boolean) = () => {
      let changed = this.state !== EntityState.Unchanged;

      for (const p of this.getPropertyNames()) {
        if (changed) { break; }

        const value = this.getProperty(p);
        if (isEntry(value)) {
          changed = value.hasChanges();
        }
      }

      return changed;
    }

    detectChanges: (() => void) = () => {
      this.getPropertyNames().forEach(p => {
        const value = this.getProperty(p);
        if (isEntry(value)) {
          value.detectChanges();
        }
      });
    }

    acceptChanges: (() => any) = () => {
      let changes = null

      if (this.hasChanges()) {
        changes = { state: this.state };
        this.getPropertyNames().forEach(p => {
          let value = this.getProperty(p);
          if (isEntry(value)) {
            value = value.acceptChanges();
          }
          changes[p] = value;
        });
      }

      return changes;
    }

    isKeySet: (() => boolean) = () => {
      for (const p of this.getPropertyNames()) {
        const { key } = metadata[p];

        if (key) {
          return !!this.getProperty(p);
        }
      }

      return false;
    }

    getPropertyNames: (() => string[]) = () => {
      return Object.getOwnPropertyNames(metadata);
    }

    getState: (() => EntityState) = () => {
      return this.state;
    }

    setState: ((s: EntityState) => void) = (s: EntityState) => {
      this.state = s;
    }
  }
}
