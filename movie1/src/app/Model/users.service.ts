import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iUsers } from '../interfaces/users';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userSubject = new BehaviorSubject<iUsers[]>([]);
  users$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAllUsers(): void {
    this.http.get<iUsers[]>(environment.usersUrl).subscribe(users => {
      this.userSubject.next(users);
    });
  }

}
