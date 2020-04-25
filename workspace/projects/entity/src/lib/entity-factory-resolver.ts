import { Type } from '@angular/core';

import { EntityFactory } from './entity-factory';

export abstract class EntityFactoryResolver {
  abstract resolveEntityFactory<T>(entity: Type<T>): EntityFactory<T>;
}
