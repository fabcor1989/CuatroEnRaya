import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertWinComponent } from '../alert-win/alert-win.component';
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
              private router: Router,
              public dialog: MatDialog) { }

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

    //calcular Ganador
    this.someWinner(col,fil,this.turn.color);
    //Pasar turno
    this.siguienteTurno();
  }

  someWinner(col: number, fil: number, color: string ) {
    const horizontal = this.calcRight(col,fil,color) + this.calcLeft(col,fil,color);
    const vertical = this.calcDown(col,fil,color);

    const diagRighDowntLeftUp = this.calcRightDown(col,fil,color) + this.calcLeftUp(col,fil,color) -1;
    const diagleftLeftDownRightUp =  this.calcLeftDown(col,fil,color) + this.calcRightUp(col,fil,color) -1;

    if((horizontal | vertical | diagRighDowntLeftUp| diagleftLeftDownRightUp) >= 4 ) {
      this.turn.points++;
      this.nGameA++;
      if(this.nGameA <= this.nGames) {
        // borrar tablero y alert
        this.openDialog(this.turn);
      }
    }
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

  calcRightDown(col: number, fil: number, color: string) {
    let count = 0;
    for(let c = col, f = fil; c < this.table.length && f < this.table[col].length; c++, f-- ) {
      const element = this.table[c][f];
      if (element === color) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }

  calcLeftDown(col: number, fil: number, color: string) {
    let count = 0;
    for(let c = col, f = fil; c > -1  && f < this.table[col].length; c--, f-- ) {
      const element = this.table[c][f];
      if (element === color) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }


  calcLeftUp(col: number, fil: number, color: string) {
    let count = 0;
    for(let c = col, f = fil; c > -1  && f < this.table[col].length; c--, f++ ) {
      const element = this.table[c][f];
      if (element === color) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }

  calcRightUp(col: number, fil: number, color: string) {
    let count = 0;
    for(let c = col, f = fil; c < this.table.length  && f < this.table[col].length; c++, f++ ) {
      const element = this.table[c][f];
      if (element === color) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }

  openDialog(player: Player) {
    const dialogRef = this.dialog.open(AlertWinComponent, {
      data: player
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'exit') {
        // Return Home
        this.router.navigateByUrl("");
      } else {
        this.table = [['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', '']];
      }
    });
  }
}
