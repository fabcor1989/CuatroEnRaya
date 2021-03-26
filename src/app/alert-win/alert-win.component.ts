import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-alert-win',
  templateUrl: './alert-win.component.html',
  styleUrls: ['./alert-win.component.css']
})
export class AlertWinComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public player: Player) { }

  ngOnInit(): void {
  }

}
