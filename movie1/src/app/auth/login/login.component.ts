import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { iLoginData } from '../../interfaces/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Modificato da styleUrl a styleUrls
})
export class LoginComponent {

  loginData: iLoginData = {
    email: '',
    password: ''
  };

  constructor(
    private authSvc: AuthService,
    private router: Router
  ){}

  signIn(){
    this.authSvc.login(this.loginData)
      .subscribe(data => {
        this.router.navigate(['/dashboard']);
      });
    console.log(this.loginData);
  }
}
