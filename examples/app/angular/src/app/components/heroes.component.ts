import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';

@Component ({
  selector: 'my-heroes',
  templateUrl: '../templates/heroes.component.html',
  styleUrls: [ '../css/heroes.component.css' ],
  providers: [HeroService]
})

export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];
  errorMessage: 'string';
  mode = 'Observable';

  constructor(private heroService: HeroService, private router: Router) {}

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      response => this.heroes = response,
      error => this.errorMessage = <any>error);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: String): void {
    name = name.trim();
    if (!name) { return }
    this.heroService.create({name: name}).subscribe(
      res => {
        this.heroes.push(res);
        this.selectedHero = null;
      },
      error => this.errorMessage = <any>error);

  }

  delete(hero: Hero): void {
    if (confirm('Are you sure?')) {
      this.heroService.delete(hero.id).subscribe(
        () => {
          this.selectedHero = null;
          this.heroes.splice(this.heroes.indexOf(hero), 1);
        },
        error => this.errorMessage = <any>error);
    }
  }
}
