import { EntityState } from './entity-state';

export interface Entry {
  getProperty: ((p: PropertyKey) => any);
  setProperty: ((p: PropertyKey, value: any) => boolean);
  load: ((source: any, initialState?: EntityState) => void);
  hasChanges: (() => boolean);
  detectChanges: (() => void);
  acceptChanges: (() => any);
}

export const isEntry = (value: any): value is Entry => {
  return value
    && value.getProperty !== undefined
    && value.setProperty !== undefined
    && value.load !== undefined
    && value.hasChanges !== undefined
    && value.detectChanges !== undefined
    && value.acceptChanges !== undefined;
}
