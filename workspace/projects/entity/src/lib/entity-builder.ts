import { Type } from '@angular/core';

export interface EntityTypeBuilder<T> {
  hasProperty(
    propertyName: keyof T,
    options?: {
      key?: boolean
      entity?: Type<any>
    }
  ): EntityTypeBuilder<T>
}

export abstract class EntityBuilder {
  abstract entity<T>(
    target: Type<T>
  ): EntityTypeBuilder<T>;
}
