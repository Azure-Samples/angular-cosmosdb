import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {
  addingHero = false;
  heroes: any = [];
  selectedHero: Hero;
  _sanitizer: DomSanitizer;

  constructor(private heroService: HeroService, private sanitizer: DomSanitizer) {
    this._sanitizer = sanitizer;
  }

  ngOnInit() {
    this.getHeroes();
  }

  cancel() {
    this.addingHero = false;
    this.selectedHero = null;
  }

  deleteHero(hero: Hero) {
    this.heroService.deleteHero(hero).subscribe(res => {
      this.heroes = this.heroes.filter(h => h !== hero);
      if (this.selectedHero === hero) {
        this.selectedHero = null;
      }
    });
  }

  getHeroes() {
    return this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  enableAddMode() {
    this.addingHero = true;
    this.selectedHero = new Hero();
  }

  onSelect(hero: Hero) {
    this.addingHero = false;
    this.selectedHero = hero;
  }

  save() {
    if (this.addingHero) {
      this.heroService.addHero(this.selectedHero).subscribe(hero => {
        this.addingHero = false;
        this.selectedHero = null;
        this.heroes.push(hero);
      });
    } else {
      this.heroService.updateHero(this.selectedHero).subscribe(hero => {
        this.addingHero = false;
        this.selectedHero = null;
      });
    }
  }
}
