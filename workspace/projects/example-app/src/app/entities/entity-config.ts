import { EntityBuilder, EntityConfiguration } from 'entity';

import { Teacher } from './teacher';
import { Course } from './course';

export class SchoolEntityConfiguration implements EntityConfiguration {
  configure(builder: EntityBuilder): void {
    builder.entity(Teacher)
      .hasProperty('id', { key: true })
      .hasProperty('name')
      .hasProperty('courses', { entity: Course });

    builder.entity(Course)
      .hasProperty('id', { key: true })
      .hasProperty('name');
  }
}