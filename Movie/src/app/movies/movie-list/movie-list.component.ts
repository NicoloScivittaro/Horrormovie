import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../users/user';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    private moviesService: MoviesService,
    protected authService: AuthService
  ) { }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
  }

  addFavorite(movieId: number): void {
  const currentUser: User | null = this.authService.getCurrentUserValue();
  if (currentUser) {
    this.moviesService.addFavorite(currentUser.id, movieId);
  }
}
}
