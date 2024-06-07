import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../users/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUserValue = storedUser ? JSON.parse(storedUser) : null;
  }

  currentUserValue: User | null;

  login(username: string, password: string): Observable<void> {
    return this.http.post<User[]>(`${this.baseUrl}/auth/login`, { username, password })
      .pipe(
        map(users => {
          if (users.length) {
            const user = users[0];
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.currentUserValue = user;
            this.router.navigate(['/movies']);

            // Auto logout after 1 hour
            setTimeout(() => {
              this.logout();
            }, 3600000);
          } else {
            throw new Error('Username or password is incorrect');
          }
        })
      );
  }

  register(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/auth/register`, { username, password });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.currentUserValue = null;
    this.router.navigate(['/auth/login']);
  }

  public getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): Observable<boolean> {
    return this.currentUserSubject.pipe(map(user => user !== null));
  }
}
