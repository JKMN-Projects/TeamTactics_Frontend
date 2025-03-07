import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { TeamFormationComponent } from './views/team-formation/team-formation.component';
import { CompetitionsComponent } from './views/competitions/competitions.component';
import { PointSystemComponent } from './views/point-system/point-system.component';
import { ProfileComponent } from './views/profile/profile.component';
import { TournamentComponent } from './views/tournament/tournament.component';
import { TeamPointsComponent } from './views/team-points/team-points.component';
import { MatchesComponent } from './views/matches/matches.component';
import { MatchComponent } from './views/match/match.component';
import { authGuard } from './utility/auth.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'point_system', component: PointSystemComponent },
  { path: 'competitions', component: CompetitionsComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'tournament', component: TournamentComponent, canActivate: [authGuard] },
  { path: 'create_team', component: TeamFormationComponent, canActivate: [authGuard] },
  { path: 'team', component: TeamPointsComponent, canActivate: [authGuard] },
  { path: 'matches', component: MatchesComponent, canActivate: [authGuard] },
  { path: 'match', component: MatchComponent, canActivate: [authGuard] },
];
