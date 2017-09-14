import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Hero } from './hero';

const api = '/api';

@Injectable()
export class HeroService {
  constructor(private http: HttpClient) {}

  logout() {
    return this.http.get(`${api}/logout`);
  }

  getProfile() {
    return this.http.get<any>(`${api}/profile`);
  }

  getHeroes() {
    return this.http.get<Array<Hero>>(`${api}/heroes`);
  }

  deleteHero(hero: Hero) {
    return this.http.delete(`${api}/hero/${hero.id}`);
  }

  addHero(hero: Hero) {
    return this.http.post<Hero>(`${api}/hero/`, hero);
  }

  updateHero(hero: Hero) {
    return this.http.put<Hero>(`${api}/hero/${hero.id}`, hero);
  }
}
