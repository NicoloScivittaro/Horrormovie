import { Injectable } from '@angular/core';
import { iMovies } from '../interfaces/movies';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  fav: iMovies[] = [];

  constructor(private http: HttpClient) { }

  private mov = new Subject<iMovies[]>();
  movies$ = this.mov.asObservable();

  getAllMovies() {
    return this.http.get<iMovies[]>(environment.moviesUrl)
      .subscribe(movies => this.mov.next(movies));
  }

  addMovie(movie: iMovies) {  
    return this.http.post<iMovies>(environment.moviesUrl, movie)
      .subscribe(newMovie => {
        this.getAllMovies();
      });
  }

  deleteMovie(id: number) {
    return this.http.delete(`${environment.moviesUrl}/${id}`)
      .subscribe(() => {
        this.getAllMovies();
      });
  }

  addToFav(prod: iMovies) {
    const movie = this.fav.find(mov => mov.id === prod.id);
    if (!movie) {
      this.fav.push(prod);
    }
  }

  removeFromFav(id: number) {
    const index = this.fav.findIndex(el => el.id === id);
    this.fav.splice(index, 1);
  }

  get favList() {
    return new Observable((obs: Observer<iMovies[]>) => {
      obs.next(this.fav);
    });
  }

  isFav(id: number) {
    return this.fav.find(prd => prd.id === id);
  }

}
