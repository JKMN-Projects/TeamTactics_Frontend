import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { TeamFormationComponent } from './views/team-formation/team-formation.component';
import { CompetitionsComponent } from './views/competitions/competitions.component';
import { PointSystemComponent } from './views/point-system/point-system.component';
import { ProfileComponent } from './views/profile/profile.component';
import { TournamentComponent } from './views/tournament/tournament.component';
import { TeamPointsComponent } from './views/team-points/team-points.component';
import { MatchesComponent } from './views/matches/matches.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'point_system', component: PointSystemComponent },
  { path: 'competitions', component: CompetitionsComponent },
  { path: 'tournament', component: TournamentComponent },
  { path: 'create_team', component: TeamFormationComponent },
  { path: 'team', component: TeamPointsComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'match', component: Team },
];
