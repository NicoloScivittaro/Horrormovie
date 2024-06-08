import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../Model/movies.service';
import { iMovies } from '../../interfaces/movies';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  favs: iMovies[] = [];

  constructor(public prdSrv: MoviesService) {}

  ngOnInit(): void {
    this.prdSrv.favList$.subscribe((favs: iMovies[]) => {
      this.favs = favs;
    });
  }

  removeFromFav(id: number): void {
    this.prdSrv.removeFromFav(id);
  }
}
