import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-toast></app-toast>
    <h1>
      Heroes!
    </h1>
    <app-login></app-login>
    <div class="header-bar"></div>
    <app-heroes></app-heroes>
  `
})
export class AppComponent {}
