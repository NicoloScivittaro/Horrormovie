import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../Model/movies.service';
import { AuthService } from '../../auth/auth.service';
import { iMovies } from '../../interfaces/movies';
import { iUsers } from '../../interfaces/users';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'] // Corretto "styleUrl" in "styleUrls"
})
export class MoviesComponent implements OnInit { // Implementato OnInit

  movies: iMovies[] = [];

  constructor(private authSvc: AuthService, private moviesSvc: MoviesService) {}

  user: iUsers | undefined;

  ngOnInit(): void {
    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
    });

    this.moviesSvc.getAllMovies();

    this.moviesSvc.movies$.subscribe(movies => {
      this.movies = movies;
    });
  }

  addToFavs(prd: iMovies): void { // Specificato il tipo di ritorno della funzione
    this.moviesSvc.addToFav(prd);
  }

  isFav(id:number) {
    return this.moviesSvc.isFav(id)
  }

  deleteMovie(id: number): void { // Specificato il tipo di ritorno della funzione
    this.moviesSvc.deleteMovie(id);
  }
}
