import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from '../components/heroes.component';
import { DashboardComponent } from '../components/dashboard.component';
import { HeroDetailComponent } from '../components/hero-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'detail/:id', component: HeroDetailComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
