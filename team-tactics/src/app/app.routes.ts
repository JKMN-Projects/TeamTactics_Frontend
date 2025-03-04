import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { TeamFormationComponent } from './views/team-formation/team-formation.component';
import { TournamentsComponent } from './views/tournaments/tournaments.component';
import { CompetitionsComponent } from './views/competitions/competitions.component';
import { PointSystemComponent } from './views/point-system/point-system.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user_team', component: TeamFormationComponent },
  { path: 'point_system', component: PointSystemComponent },
  { path: 'tournaments', component: TournamentsComponent },
  { path: 'competitions', component: CompetitionsComponent },
];
