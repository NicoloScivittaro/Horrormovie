import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ProfileComponent } from './profile/profile.component';
import { NewFilmComponent } from './new-film/new-film.component';

const routes: Routes = [
  { path: '', 
  component: DashboardComponent
  },
  {
    path:'home', 
    component: HomeComponent
  },
  {
    path:'movies',
    component: MoviesComponent
  },
  {
    path: 'favourites',
    component: FavouritesComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'add-movies',
    component: NewFilmComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
