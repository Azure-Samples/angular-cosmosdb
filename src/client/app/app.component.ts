import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ title }}</h1>
    <div class="header-bar"></div>
    <app-hero-list></app-hero-list>
  `
})
export class AppComponent {
  title = 'Angular Heroes';
}
