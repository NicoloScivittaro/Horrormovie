import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../user';
import { Movie } from '../../movies/movie';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  favoritesMap: { [userId: number]: Movie[] } = {};
  users: User[] = [];

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUserValue();
    if (this.user) {
      this.loadFavorites();
    }
    this.loadUsers();
  }

  loadFavorites(): void {
    if (this.user) {
      this.usersService.getUserFavorites(this.user.id).subscribe(
        (favorites: Movie[]) => {
          this.favoritesMap[this.user!.id] = favorites;
        },
        error => {
          console.error('Errore nel caricamento dei preferiti', error);
        }
      );
    }
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      error => {
        console.error('Errore nel caricamento degli utenti', error);
      }
    );
  }
}
