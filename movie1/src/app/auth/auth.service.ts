import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { iUsers } from '../interfaces/users';
import { iLoginData } from '../interfaces/auth';

type AccessData = {
  accessToken:string,
  user:iUsers
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper:JwtHelperService = new JwtHelperService();

  userSubj = new BehaviorSubject<iUsers|null>(null)
  loggedIn:boolean = false


  user$ = this.userSubj.asObservable()
  isLogged$ = this.user$.pipe(
    map(user => !!user),
    tap(user => this.loggedIn = user)
  )

  constructor(private http:HttpClient, private router:Router) {
    this.restoreUser()
  }

  registerUrl:string = environment.registerUrl
  loginUrl:string = environment.loginUrl

  register(newUser:Partial<iUsers>):Observable<AccessData>{
  return this.http.post<AccessData>(this.registerUrl, newUser)
  }

  login(loginData:iLoginData):Observable<AccessData>{
    return this.http.post<AccessData>(this.loginUrl, loginData)
    .pipe(tap(data => {

      this.userSubj.next(data.user)
      localStorage.setItem('accessData', JSON.stringify(data))

      this.autoLogout(data.accessToken)
    }))
  }

logout(){
  this.userSubj.next(null)
  localStorage.removeItem('accessData')
  this.router.navigate(['/auth/login']);
}

accessToken():string{
  const userJson = localStorage.getItem('accessData')
  if(!userJson) return ''
  const accessData:AccessData = JSON.parse(userJson)
  if(this.jwtHelper.isTokenExpired(accessData.accessToken)) return '';
  return accessData.accessToken
}

autoLogout(jwt:string){
  const expDate = this.jwtHelper.getTokenExpirationDate(jwt) as Date;
  const expMs = expDate.getTime() - new Date().getTime();
  setTimeout(()=>{
    this.logout()
  },expMs)
}

restoreUser(){
  const userJson = localStorage.getItem('accessData')
  if(!userJson) return;
  const accessData:AccessData = JSON.parse(userJson)
  if(this.jwtHelper.isTokenExpired(accessData.accessToken)) return;
  this.userSubj.next(accessData.user)
  this.autoLogout(accessData.accessToken)
}


}
