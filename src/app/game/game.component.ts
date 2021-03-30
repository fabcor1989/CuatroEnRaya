import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertWinComponent } from '../alert-win/alert-win.component';
import { AlertWinnerComponent } from '../alert-winner/alert-winner.component';
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
  audio = new Audio('../../assets/ganador.mp3');

  table = [['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', '']];

  // esta variable  pausara la actividad en el tablero mientras se observa el juego ganador
  stopWinner = false;

  constructor(private playersService: PlayersService,
              private router: Router,
              public dialog: MatDialog) { }
//si les variables player1, player2, nGames du service sont valides
//les valeurs sont affectees dans le component game
//sinon redirection sur home
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
//Tour suivant à l'autre joueur
  setTour() {
    if (this.turn === this.player1) {
      this.turn = this.player2;
    } else {
      this.turn = this.player1;
    }
  }

  addF(col: number) {
    // Mettre la piece dans la colonne choisie
    let  fil = 0 ;
    for (let index = 0; index < this.table[col].length; index++) {
      if(this.table[col][index] === '') {
        this.table[col][index] = this.turn.color;
        fil = index
        break;
      }
    }

    
    this.someWinner(col,fil,this.turn.color);
    
  }
//verifier s'il y a un gagnant
//calculer si 4 pieces sont allignes

//LOGIQUE DU CALCUL:
//le calcul se fait
//horizontal (vers la droite et gauche)
//vertical (vers le bas, vers le haut il n'est pas possible)
//diagonal RighDowntLeftUp
//diagonal LeftDownRightU

//EXEMPLE CALCUL HORIZONTAL
//Depuis l'emplacement de la piece mise on calcul vers la droite le nb de pieces de la meme couleurs qui se suivent
//puis le meme processus vers la gauche.
//si l'addtion donne 4 
  someWinner(col: number, fil: number, color: string ) {
    const horizontal = this.calcRight(col,fil,color) + this.calcLeft(col,fil,color);
    const vertical = this.calcDown(col,fil,color);
    const diagRighDowntLeftUp = this.calcRightDown(col,fil,color) + this.calcLeftUp(col,fil,color) -1;
    const diagleftLeftDownRightUp =  this.calcLeftDown(col,fil,color) + this.calcRightUp(col,fil,color) -1;

    if((horizontal | vertical | diagRighDowntLeftUp| diagleftLeftDownRightUp) >= 4 ) {
      // si encuentra un ganador mostramos el confeti con el div.stopWinner
      this.stopWinner = true;
      // suena un audio al Ganador :D
      this.loadAudioAndPlay();
      this.turn.points++;
      this.nGameA++;
      //  setTimeOunt  detiene por 2000 = 2 segundos y ejecuta la funcion que se le envía
      setTimeout(
        () => {
          if(this.nGameA <= this.nGames) {
            this.openDialog(this.turn);
          } else {
            if(this.player1.points > this.player2.points) {
              this.openDialogWinner(this.player1);
            }else{
              this.openDialogWinner(this.player2);
            }
          }
          this.stopWinner = false;
          this.setTour();
        },
        2000
      ) 
    }
  }

  //-------   DEBUT DES CALCULS       ---------------------------------------------------------------------------------
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
// -------  FIN DES CALCULS  ------------------------------------------------------------------------------




//afficher la box du component alert win (round)
//choix pour continuer ou abandoner le jeu
  openDialog(player: Player) {
    const dialogRef = this.dialog.open(AlertWinComponent, {
      data: player
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Stop the game') {
        // Return vers Home
        this.router.navigateByUrl("");
        this.playersService.endGame();
      } else {
        this.table = [['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', ''],['', '', '', '', '', '']];
      }
    });
  }

  //afficher la box du component alert winner
  //apres la fermeture de la box redirection su rle home
  openDialogWinner(player: Player) {
    const dialogRef = this.dialog.open(AlertWinnerComponent, {
      data: player
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl("");
      this.playersService.endGame();
    });
  }

  loadAudioAndPlay() {
    this.audio.load();
    this.audio.play();
  }
}
