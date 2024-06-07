import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { iUsers } from '../interfaces/users';
import { MoviesService } from '../Model/movies.service';
import { iMovies } from '../interfaces/movies';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  movies: iMovies[] = [];
  user: iUsers | undefined;

  constructor(private authSvc: AuthService, private moviesSvc: MoviesService) {}

  ngOnInit(): void {
    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
    });

    this.loadMovies();
  }

  loadMovies(): void {
    this.moviesSvc.getAllMovies();
    this.moviesSvc.movies$.subscribe(movies => {
      this.movies = movies;
    });
  }
}
