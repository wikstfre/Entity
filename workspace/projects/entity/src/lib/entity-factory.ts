import { EntityState } from './entity-state';

export abstract class EntityFactory<T> {
  abstract createOne(source: any, initialState?: EntityState): T;
  abstract createMany(source: any[], initialState?: EntityState): T[];
}
