import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-alert-winner',
  templateUrl: './alert-winner.component.html',
  styleUrls: ['./alert-winner.component.css']
})
export class AlertWinnerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public player: Player) { }

  ngOnInit(): void {
  }

}
