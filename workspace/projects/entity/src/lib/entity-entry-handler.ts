import { EntityEntry } from './entity-entry';

export class EntityEntryHandler implements ProxyHandler<EntityEntry> {
  get(target: EntityEntry, p: PropertyKey, receiver: any): any {
    return target.getProperty(p);
  }

  set(target: EntityEntry, p: PropertyKey, value: any): boolean {
    return target.setProperty(p, value);
  }

  deleteProperty(target: EntityEntry, p: PropertyKey): boolean {
    return false;
  }
}
