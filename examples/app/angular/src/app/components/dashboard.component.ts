import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';
import { Router } from '@angular/router';

@Component ({
  selector: 'my-dashboard',
  templateUrl: '../templates/dashboard.component.html',
  styleUrls: [ '../css/dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  errorMessage: string;

  constructor(private router: Router, private heroService: HeroService) {}
  
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(
        response => this.heroes = response,
        error => this.errorMessage = <any>error);
  }

  ngOnInit(): void {
    this.getHeroes()
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}