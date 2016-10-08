import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';
import { Router } from '@angular/router';

@Component ({
  // moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: '../templates/dashboard.component.html',
  styleUrls: [ '../css/dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private router: Router, private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}