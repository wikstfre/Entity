import { Component, Input } from '@angular/core';

@Component({
  selector: 'ea-teacher',
  template: `
    <div>id: {{id}}</div>
    <div>name: {{name}}</div>
    <div>state: {{state}}</div>
    <ea-course *ngFor="let course of courses" [course]="course"></ea-course>
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
export class TeacherComponent {
  @Input() teacher!: any;

  get id() {
    return this.teacher.id;
  }

  get name() {
    return this.teacher.name;
  }

  get state() {
    return this.teacher.state
  }

  get courses() {
    return this.teacher.courses;
  }
}