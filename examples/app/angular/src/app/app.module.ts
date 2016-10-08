import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component';
import { HeroDetailComponent } from './components/hero-detail.component';
import { HeroesComponent } from './components/heroes.component';
import { DashboardComponent } from './components/dashboard.component';
import { HeroService } from './services/hero.service';

import { routing } from './routers/app.routing';

@NgModule ({
  imports: [ BrowserModule, FormsModule, routing ],
  declarations: [ AppComponent, HeroDetailComponent, HeroesComponent, DashboardComponent ],
  providers: [ HeroService ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
