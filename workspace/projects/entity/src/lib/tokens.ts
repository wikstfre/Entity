import { InjectionToken } from '@angular/core';

import { EntityConfiguration } from './entity-configuration';

export const ROOT_CONFIGURATION = new InjectionToken<EntityConfiguration[]>(
  'entity: Root Configuration'
);

export const FEATURE_CONFIGURATION = new InjectionToken<EntityConfiguration[][]>(
  'entity: Feature Configuration'
);
