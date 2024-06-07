import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  addFavorite(userId: any, movieId: number) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/movies-popular`);
  }

  getMovie(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movies-popular/${id}`);
  }
}
