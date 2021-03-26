import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Player } from '../models/player.model';
import { PlayersService } from '../service/players.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  formPlayers: FormGroup;
  nGamesArray = [3, 5];
  constructor(private formBuild: FormBuilder,
              private playerService: PlayersService,
              ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm() {
    this.formPlayers = this.formBuild.group(
      {
        name1: ['', Validators.required],
        name2: ['', Validators.required],
        nGames: [3, Validators.required]
      }
    );
  }


  startGame(event: Event) {
    event.preventDefault()
    if(this.formPlayers.valid) {
      const player1: Player = {
        name: this.formPlayers.get('name1').value,
        points: 0,
        color: 'red'
      }

      const player2: Player = {
        name: this.formPlayers.get('name2').value,
        points: 0,
        color: 'yellow'
      }
      const nGames = this.formPlayers.get('nGames').value;
      this.playerService.startGame(player1, player2, nGames)
    }
  }
}
