import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../users/user';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    const currentUser: User | null = this.authService.getCurrentUserValue();

    if (currentUser && currentUser.token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
