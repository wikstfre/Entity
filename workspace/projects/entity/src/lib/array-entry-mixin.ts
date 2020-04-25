import { Type } from '@angular/core';

import { EntityState } from './entity-state';

import { EntityEntry } from './entity-entry';
import { ArrayEntry } from './array-entry';

import { getEntryMetadata } from './entry-metadata';

import { isObject } from './utils';

export const ArrayEntryMixin = (target: Type<any>) => {
  const { entry } = getEntryMetadata(target);

  return class extends Array implements ArrayEntry {
    changes: EntityEntry[] = [];

    getProperty: ((p: PropertyKey) => any) = (p: PropertyKey) => {
      return Reflect.get(this, p);
    }

    setProperty: ((p: PropertyKey, value: any) => boolean) = (p: PropertyKey, value: any) => {
      if (isObject(value)) {
        const currentValue = this.getProperty(p);
        this.stash(currentValue);

        value = new entry(
          value
        );
      }

      return Reflect.set(this, p, value);
    }

    load: ((source: any, initialState?: EntityState) => void) = (source: any, initialState?: EntityState) => {
      for (const v of source) {
        const value: EntityEntry = new entry(
          v,
          initialState
        );

        if (value.getState() === EntityState.Deleted) {
          this.stash(value);
        } else {
          this.push(value);
        }
      }
    }

    hasChanges: (() => boolean) = () => {
      let changed = false;

      for (const v of this.changes) {
        if (changed) { break; }

        if (!this.includes(v)) {
          changed = true;
        }
      }

      for (const v of this) {
        if (changed) { break; }

        changed = v.hasChanges();
      }

      return changed;
    }

    detectChanges: (() => void) = () => {
      const changes = this.changes.slice();

      changes.forEach(v => {
        if (!this.includes(v)) {
          v.setState(EntityState.Deleted);
        } else {
          const index = this.changes.indexOf(v);
          this.changes.splice(index, 1);
        }
      });

      this.forEach(v => {
        v.detectChanges();
      });
    }

    acceptChanges: (() => any) = () => {
      let changes = null;

      if (this.hasChanges()) {
        changes = [];
        this.forEach(v => {
          const value = v.acceptChanges();
          if (value) {
            changes.push(value);
          }
        });

        this.changes.forEach(v => {
          const value = v.acceptChanges();
          if (value) {
            changes.push(value);
          }
        });
      }

      return changes;
    }

    deleteProperty: ((p: PropertyKey) => boolean) = (p: PropertyKey) => {
      const currentValue = this.getProperty(p);
      this.stash(currentValue);

      return Reflect.deleteProperty(this, p);
    }

    stash: ((value: any) => void) = (value: any) => {
      if (!value) { return; }

      if (value.getState() !== EntityState.Added) {
        this.changes.push(value);
      }
    }
  }
}
