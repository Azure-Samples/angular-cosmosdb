import { Component, OnInit } from '@angular/core';

import { HeroService } from './hero.service';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <button (click)="login()" [hidden]="isLoggedIn">Login</button>
      <button (click)="logout()" [hidden]="!isLoggedIn">Logout</button>
    </div>
  `
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getProfile().subscribe(result => {
      this.isLoggedIn = !!result;
    })
  }

  login() {
    window.location.href = 'http://localhost:3000/api/login';
  }

  logout() {
    this.heroService.logout().subscribe(result => {
      console.log(result);
      this.isLoggedIn = false;
    });
  }
}
