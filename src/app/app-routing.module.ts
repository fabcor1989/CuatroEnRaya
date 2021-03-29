import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "game",
    component: GameComponent
  },

  /* Redirectioner le path avec le component HOME
  Pour pas que un utilisateur puisse acceder au jeux sans saisir les nom de joueurs*/
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
