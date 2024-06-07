import { Component, OnInit } from '@angular/core';
import { iMovies } from '../../interfaces/movies';
import { MoviesService } from '../../Model/movies.service';

@Component({
  selector: 'app-new-film',
  templateUrl: './new-film.component.html',
  styleUrls: ['./new-film.component.scss']
})
export class NewFilmComponent implements OnInit {
  movies: iMovies[] = [];
  newMovie: iMovies = {
    id: 0,
    title: '',
    description: '',
    image: '',
    duration: '',
    rating: 0
  };

  constructor(private moviesSvc: MoviesService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void { // Specificato il tipo di ritorno della funzione
    this.moviesSvc.getAllMovies();
    this.moviesSvc.movies$.subscribe(movies => {
      this.movies = movies;
    });
  }

  addMovie(): void {
    this.moviesSvc.addMovie(this.newMovie);
    this.clearNewMovie();
  }

  clearNewMovie(): void {
    this.newMovie = {
      id: 0,
      title: '',
      description: '',
      image: '',
      duration: '',
      rating: 0
    };
  }
}
