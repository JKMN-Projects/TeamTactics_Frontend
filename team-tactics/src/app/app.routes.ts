import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { TeamFormationComponent } from './views/team-formation/team-formation.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user_team', component: TeamFormationComponent },
];
