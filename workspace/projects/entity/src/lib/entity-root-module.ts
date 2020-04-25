import { NgModule, Inject } from '@angular/core';

import { EntityBuilder } from './entity-builder';
import { EntityConfiguration } from './entity-configuration'

import { ROOT_CONFIGURATION } from './tokens';

@NgModule({})
export class EntityRootModule {
  constructor(
    private builder: EntityBuilder,
    @Inject(ROOT_CONFIGURATION) rootConfiguration: EntityConfiguration[]
  ) {
    rootConfiguration.forEach(configurationInstance =>
      configurationInstance.configure(this.builder)
    );
  }

  addConfiguration(configurationInstance: EntityConfiguration) {
    configurationInstance.configure(this.builder);
  }
}
