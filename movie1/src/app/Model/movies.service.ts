import { Injectable } from '@angular/core';
import { iMovies } from '../interfaces/movies';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  fav: iMovies[] = [];

  constructor(private http: HttpClient) { }

  private movSubject = new BehaviorSubject<iMovies[]>([]);
  movies$ = this.movSubject.asObservable();

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

  addToFav(prod: iMovies): void {
    const movie = this.fav.find(mov => mov.id === prod.id);
    if (!movie) {
      this.fav.push(prod);
    }
  }

  removeFromFav(id: number): void {
    const index = this.fav.findIndex(el => el.id === id);
    if (index > -1) {
      this.fav.splice(index, 1);
    }
  }

  get favList(): Observable<iMovies[]> {
    return new Observable(obs => {
      obs.next(this.fav);
      obs.complete();
    });
  }

  isFav(id: number): boolean {
    return !!this.fav.find(prd => prd.id === id);
  }

}
