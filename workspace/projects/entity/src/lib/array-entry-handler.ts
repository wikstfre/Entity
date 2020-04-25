import { ArrayEntry } from './array-entry';

export class ArrayEntryHandler implements ProxyHandler<ArrayEntry> {
  get(target: ArrayEntry, p: PropertyKey, receiver: any): any {
    return target.getProperty(p);
  }

  set(target: ArrayEntry, p: PropertyKey, value: any): boolean {
    return target.setProperty(p, value);
  }

  deleteProperty(target: ArrayEntry, p: PropertyKey): boolean {
    return target.deleteProperty(p);
  }
}
