import { Injectable } from '@angular/core';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';
import { Team } from '../interfaces/team';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  url: string = 'https://teamtactics-backend.ambitiousmoss-465e145e.northeurope.azurecontainerapps.io/api/teams/';
  localUrl: string = 'https://localhost:5432/api/teams/';

  private teams: Array<Team> = [];
  private teamsSubject$: Subject<Team[]> = new BehaviorSubject<Team[]>(this.teams);
  teams$: Observable<Team[]> = this.teamsSubject$.asObservable();

  private team = { id: 0, name: "", status: 0, userId: 0, userTournamentId: 0 } as Team;
  private teamSubject$: Subject<Team> = new BehaviorSubject<Team>(this.team);
  team$: Observable<Team> = this.teamSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getTeamList(userTournamentId: number): void {
    this.teamsSubject$.next(this.teams);

    this.httpClient.get<Team[]>(this.url + userTournamentId, this.httpOptions.getHttpOptions()).subscribe(x => {
      this.teamsSubject$.next(x);
    });
  }

  getTeam(userTournamentId: number): void {
    this.teamsSubject$.next(this.teams);

    this.httpClient.get<Team[]>(this.url + userTournamentId, this.httpOptions.getHttpOptions()).subscribe(x => {
      this.teamsSubject$.next(x);
    });
  }

  createTeam(team: Team): void {
    this.httpClient.post<any>(this.url + 'create', team, this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.status != 201) {
        alert("Failed to create team.")
      }

      this.getTeamList(team.userTournamentId);
    });
  }

  lockTeam(teamId: Team): void {
    this.httpClient.put<any>(this.url + teamId.toString() + '/lock', this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.status != 200) {
        alert("Failed to lock team.")
      }
    });
  }

  updateTeam(team: Team): void {
    this.httpClient.put<any>(this.url + 'update', team, this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.status != 200) {
        alert("Failed to update team.")
      }

      this.getTeamList(team.userTournamentId);
    });
  }

  deleteTeam(team: Team): void {
    this.httpClient.put<any>(this.url + 'delete/' + team.id.toString(), this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.status != 200) {
        alert("Failed to delete team.")
      }

      this.getTeamList(team.userTournamentId);
    });
  }
}
