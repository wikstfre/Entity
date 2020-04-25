import { NgModule, Inject } from '@angular/core';

import { EntityRootModule } from './entity-root-module';

import { EntityConfiguration } from './entity-configuration'

import { FEATURE_CONFIGURATION } from './tokens';

@NgModule({})
export class EntityFeatureModule {
  constructor(
    root: EntityRootModule,
    @Inject(FEATURE_CONFIGURATION) configurationGroups: EntityConfiguration[][]
  ) {
    configurationGroups.forEach(group =>
      group.forEach(configurationInstance =>
        root.addConfiguration(configurationInstance)
      )
    );
  }
}
