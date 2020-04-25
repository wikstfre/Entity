import { Component } from '@angular/core';

import { EntityFactory, EntityFactoryResolver, isEntry } from 'entity';

import { Teacher } from './entities';

@Component({
  selector: 'ea-root',
  template: `
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
      <span style="display: block">{{ title }} app is running!</span>
    </div>
    <ea-teacher *ngFor="let change of changes" [teacher]="change"></ea-teacher>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class AppComponent {
  title = 'example-app';
  changes = [];

  constructor(factoryResolver: EntityFactoryResolver) { 
    const data = [
      {
        id: 1,
        name: 'Teacher1',
        courses: [
          {
            id: 1,
            name: 'Course1'
          },
          {
            id: 2,
            name: 'Course2'
          }
        ]
      },
      {
        id: 2,
        name: 'Teacher2',
        courses: [
          {
            id: 3,
            name: 'Course3'
          },
          {
            id: 4,
            name: 'Course4'
          }
        ]
      }
    ];

    const entityFactory: EntityFactory<Teacher> = factoryResolver.resolveEntityFactory(Teacher);
    const teachers = entityFactory.createMany(data);

    // delete teacher (state = 2)
    teachers.splice(0, 1);

    // change course name (state = 3)
    teachers[0].courses[0].name = 'New course name';

    // delete course (state = 2)
    teachers[0].courses.splice(1, 1);

    if (isEntry(teachers)) {
      teachers.detectChanges();
      this.changes = teachers.acceptChanges();
    }
  }
}
