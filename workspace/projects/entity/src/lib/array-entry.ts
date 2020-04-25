import { Entry } from './entry';
import { EntityEntry } from './entity-entry';

export interface ArrayEntry extends Entry, Array<EntityEntry> {
  deleteProperty: ((p: PropertyKey) => boolean);
}

export const isArrayEntry = (value: any): value is ArrayEntry => {
  return value
    && value.getProperty !== undefined
    && value.setProperty !== undefined
    && value.load !== undefined
    && value.hasChanges !== undefined
    && value.detectChanges !== undefined
    && value.acceptChanges !== undefined
    && value.deleteProperty !== undefined;
}
