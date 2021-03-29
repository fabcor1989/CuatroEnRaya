import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';  //cette librairie est utilisé pour des changement de données constant, elle est plus reactif
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  public player1 = new BehaviorSubject<Player>(undefined);
  public player2 = new BehaviorSubject<Player>(undefined);
  public nGames = new BehaviorSubject<number>(undefined);
  constructor(private router: Router) { }

  startGame(player1: Player, player2: Player, nGames: number) {
    this.player1.next(player1);
    this.player2.next(player2);
    this.nGames.next(nGames);
    this.router.navigateByUrl('/game');
  }

  endGame() {
    this.player1.next(undefined);
    this.player2.next(undefined);
    this.nGames.next(undefined);
  }

}
