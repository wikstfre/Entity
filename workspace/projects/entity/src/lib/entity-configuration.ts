import { EntityBuilder } from './entity-builder';

export abstract class EntityConfiguration {
  abstract configure(builder: EntityBuilder);
}
