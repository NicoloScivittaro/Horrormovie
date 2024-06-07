import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MoviesComponent } from './movies/movies.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { NewFilmComponent } from './new-film/new-film.component';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    DashboardComponent,
    MoviesComponent,
    FavouritesComponent,
    ProfileComponent,
    NewFilmComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    
  ]
})
export class DashboardModule { }
