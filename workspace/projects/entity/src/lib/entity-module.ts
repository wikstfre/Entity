import { NgModule, ModuleWithProviders, Type} from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntityRootModule } from './entity-root-module';
import { EntityFeatureModule } from './entity-feature-module';

import { EntityBuilder } from './entity-builder'
import { EntityFactoryResolver } from './entity-factory-resolver';
import { InternalEntityBuilder, InternalEntityFactoryResolver } from './linker';

import { EntityConfiguration } from './entity-configuration';

import { ROOT_CONFIGURATION, FEATURE_CONFIGURATION } from './tokens';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class EntityModule {
  static forRoot(rootConfiguration: Type<EntityConfiguration>[]): ModuleWithProviders {
    return {
      ngModule: EntityRootModule,
      providers: [
        rootConfiguration,
        {
          provide: ROOT_CONFIGURATION,
          deps: rootConfiguration,
          useFactory: createConfigurationInstances,
        },
        {
          provide: EntityBuilder,
          useClass: InternalEntityBuilder
        },
        {
          provide: EntityFactoryResolver,
          useClass: InternalEntityFactoryResolver
        }
      ]
    };
  }

  static forFeature(featureConfiguration: Type<EntityConfiguration>[]): ModuleWithProviders {
    return {
      ngModule: EntityFeatureModule,
      providers: [
        featureConfiguration,
        {
          provide: FEATURE_CONFIGURATION,
          multi: true,
          deps: featureConfiguration,
          useFactory: createConfigurationInstances,
        },
      ]
    };
  }
}

export function createConfigurationInstances(...instances: EntityConfiguration[]) {
  return instances;
}
