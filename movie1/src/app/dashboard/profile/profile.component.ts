import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUsers } from '../../interfaces/users';
import { UsersService } from '../../Model/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'] // Corretto lo stile URL
})
export class ProfileComponent implements OnInit {

  user: iUsers | undefined;
  users: iUsers[] = [];

  constructor(private authSvc: AuthService, private userSvc: UsersService) {}

  ngOnInit(): void { // Corretta implementazione dell'interfaccia OnInit
    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
    });

    this.loadUsers(); // Chiamato il metodo per caricare gli utenti
  }

  loadUsers(): void { // Metodo per caricare gli utenti
    this.userSvc.getAllUsers();

    this.userSvc.users$.subscribe(users => {
      this.users = users;
    });
  }
}
