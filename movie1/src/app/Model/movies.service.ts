import { Injectable } from '@angular/core';
import { iMovies } from '../interfaces/movies';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private fav: iMovies[] = [];
  private favSubject = new BehaviorSubject<iMovies[]>([]);
  private movSubject = new BehaviorSubject<iMovies[]>([]);

  movies$ = this.movSubject.asObservable();
  favList$ = this.favSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadFavouritesFromLocalStorage();
  }

  getAllMovies(): void {
    this.http.get<iMovies[]>(environment.moviesUrl).subscribe(movies => {
      this.movSubject.next(movies);
    });
  }

  addMovie(movie: iMovies): void {
    this.http.post<iMovies>(environment.moviesUrl, movie).subscribe(newMovie => {
      this.getAllMovies();
    });
  }

  deleteMovie(id: number): void {
    this.http.delete(`${environment.moviesUrl}/${id}`).subscribe(() => {
      this.getAllMovies();
    });
  }

  addToFav(movie: iMovies): void {
    if (!this.fav.find(mov => mov.id === movie.id)) {
      this.fav.push(movie);
      this.updateFavourites();
    }
  }

  removeFromFav(id: number): void {
    const index = this.fav.findIndex(mov => mov.id === id);
    if (index > -1) {
      this.fav.splice(index, 1);
      this.updateFavourites();
    }
  }

  private loadFavouritesFromLocalStorage(): void {
    const storedFavourites = localStorage.getItem('favourites');
    if (storedFavourites) {
      this.fav = JSON.parse(storedFavourites);
      this.favSubject.next(this.fav);
    }
  }

  private saveFavouritesToLocalStorage(): void {
    localStorage.setItem('favourites', JSON.stringify(this.fav));
  }

  private updateFavourites(): void {
    this.favSubject.next(this.fav);
    this.saveFavouritesToLocalStorage();
  }

  isFav(id: number): boolean {
    return !!this.fav.find(prd => prd.id === id);
  }
}
