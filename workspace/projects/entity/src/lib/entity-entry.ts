import { EntityState } from './entity-state';

import { Entry } from './entry';

export interface EntityEntry extends Entry {
  isKeySet: (() => boolean);
  getPropertyNames: (() => string[]);
  getState: (() => EntityState);
  setState: ((s: EntityState) => void);
}

export const isEntityEntry = (value: any): value is EntityEntry => {
  return value
    && value.getProperty !== undefined
    && value.setProperty !== undefined
    && value.load !== undefined
    && value.hasChanges !== undefined
    && value.detectChanges !== undefined
    && value.acceptChanges !== undefined
    && value.getPropertyNames !== undefined
    && value.getState !== undefined
    && value.setState !== undefined;
}
