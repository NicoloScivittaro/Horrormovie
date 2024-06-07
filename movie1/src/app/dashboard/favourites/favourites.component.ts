import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../Model/movies.service';
import { iMovies } from '../../interfaces/movies';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'] // Corretto "styleUrl" in "styleUrls"
})
export class FavouritesComponent implements OnInit { // Implementato OnInit

  favs: iMovies[] = []; // Inizializzato favs come array vuoto per evitare errori di "undefined"

  constructor(public prdSrv: MoviesService) {}

  ngOnInit(): void {
    this.prdSrv.favList.subscribe((favs: iMovies[]) => {
      this.favs = favs;
    });
  }

  removeFromFav(id: number): void { // Specificato il tipo di ritorno della funzione
    this.prdSrv.removeFromFav(id);
  }
}
