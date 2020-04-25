import { Type, Injectable } from '@angular/core';

import { EntityState } from './entity-state';

import { EntityFactory } from './entity-factory';
import { EntityFactoryResolver } from './entity-factory-resolver';

import { EntityTypeBuilder, EntityBuilder } from './entity-builder';

import { EntryHandler } from './entry-handler';

import { MappedMetadata, setMappedMetadata } from './entity-metadata';
import { EntryMetadata, getEntryMetadata, setEntryMetadata } from './entry-metadata';

export class InternalEntityTypeBuilder<T> implements EntityTypeBuilder<T> {
  constructor(private target: Type<T>) {}

  hasProperty(
    propertyName: keyof T,
    options: {
      key?: boolean
      entity?: Type<any>
    } = {}
  ): EntityTypeBuilder<T> {
    const { entity = null, key = false } = { ...options };

    const metadata: MappedMetadata = { propertyName, entity, key };
    setMappedMetadata(this.target, [metadata]);

    return this;
  }
}

@Injectable()
export class InternalEntityBuilder implements EntityBuilder {
  entity<T>(target: Type<T>): EntityTypeBuilder<T> {
    const handler = new EntryHandler();

    const entry = new Proxy(
      target,
      handler
    );

    const metadata: EntryMetadata = { entry };
    setEntryMetadata(target, metadata);

    return new InternalEntityTypeBuilder(target);
  }
}

class InternalEntityFactory<T> implements EntityFactory<T> {
  constructor(private entry: Type<any>) {}

  createOne(source: any, initialState?: EntityState): T {
    return new this.entry(source, initialState);
  }

  createMany(source: any[], initialState?: EntityState): T[] {
    return new this.entry(source, initialState);
  }
}

@Injectable()
export class InternalEntityFactoryResolver implements EntityFactoryResolver {
  resolveEntityFactory<T>(entity: Type<T>): EntityFactory<T> {
    const { entry } = getEntryMetadata(entity);

    return new InternalEntityFactory(
      entry
    );
  }
}
