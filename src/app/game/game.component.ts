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
    let  fil = 0 ;
    for (let index = 0; index < this.table[col].length; index++) {
      if(this.table[col][index] === '') {
        this.table[col][index] = this.turn.color;
        fil = index
        break;
      }
    }
    console.log(this.table);

    //calcular Ganador
    this.someWinner(col,fil,this.turn.color);
    //Pasar turno
    this.siguienteTurno();
  }

  someWinner(col: number, fil: number, color: string ) {
    let horizontal = this.calcRight(col,fil,color) + this.calcLeft(col,fil,color);
    let vertical = this.calcDown(col,fil,color);
    console.log(vertical)
  }

  calcRight(col: number, fil: number, color: string) {
    let count = 0 ;
    for (let index = col; index < this.table.length; index++) {
      const element = this.table[index][fil];
      if (element === color) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }

  calcLeft(col: number, fil: number, color: string) {
    let count = 0 ;
    for (let index = col-1; index > -1; index--) {
      const element = this.table[index][fil];
      if (element === color) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }

  // calcUp(col: number, fil: number, color: string) {
  //   let count = 0 ;
  //   for (let index = fil; index < this.table[col].length; index++) {
  //     const element = this.table[col][index];
  //     if (element === color) {
  //       count++;
  //     } else {
  //       break;
  //     }
  //   }
  //   return count;
  // }

  calcDown(col: number, fil: number, color: string) {
    let count = 0 ;
    for (let index = fil; index < this.table[col].length; index--) {
      const element = this.table[col][index];
      if (element === color) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }
}
