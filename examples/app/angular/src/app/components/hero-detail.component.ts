import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';

@Component ({
  selector: 'my-hero-detail',
  templateUrl: '../templates/hero-detail.component.html',
  styleUrls: [ '../css/hero-detail.component.css' ]
})

export class HeroDetailComponent implements OnInit, OnChanges {
  @Input() hero: Hero;
  errorMessage: string;

  constructor(private heroService: HeroService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.heroService.getHero(id)
        .subscribe(
          response => this.hero = response,
          error => this.errorMessage = <any>error);
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero)
      .subscribe(
        () => this.goBack(),
        error => this.errorMessage = <any>error);
  }

  ngOnChanges(changes: any) {
    console.log (changes)
  }

  delete(): void {
    if (confirm('Are you sure?')) {
      this.heroService.delete(this.hero.id).subscribe(
        () => this.goBack(),
        error => this.errorMessage = <any>error);
    }
  }
}
