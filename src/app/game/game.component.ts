import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../models/player.model';
import { PlayersService } from '../service/players.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  player1: Player;
  player2: Player;
  nGames  = undefined;
  nGameA = 1;
  turn: Player;

  table = [['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', '']];

  constructor(private playersService: PlayersService,
              private router: Router  ) { }

  ngOnInit(): void {
    if (!this.playersService.player1.value && !this.playersService.player2.value && !this.playersService.nGames.value) {
      this.router.navigateByUrl("")
    } else {
      this.playersService.player1.subscribe(
        value => {
          this.player1 = value;
          this.turn = this.player1;
        }
      );
      this.playersService.player2.subscribe(
        value => {
          this.player2 = value;
        }
      );
      this.nGames = this.playersService.nGames.value;
    }
  }

  siguienteTurno() {
    if (this.turn === this.player1) {
      this.turn = this.player2;
    } else {
      this.turn = this.player1;
    }
  }

  addF(col: number) {
    // agregar en columna 
    for (let index = 0; index < this.table[col].length; index++) {
      if(this.table[col][index] === '') {
        this.table[col][index] = this.turn.color;
        break;
      }
    }
    console.log(this.table);

    //calcular Ganador

    //Pasar turno
    this.siguienteTurno();
  }


}
