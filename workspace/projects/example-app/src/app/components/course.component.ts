import { Component, Input } from '@angular/core';

@Component({
  selector: 'ea-course',
  template: `
    <div>id: {{id}}</div>
    <div>name: {{name}}</div>
    <div>state: {{state}}</div>
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
export class CourseComponent {
  @Input() course!: any;

  get id() {
    return this.course.id;
  }

  get name() {
    return this.course.name;
  }

  get state() {
    return this.course.state
  }
}