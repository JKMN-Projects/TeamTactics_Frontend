import { Injectable } from '@angular/core';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';
import { Team } from '../interfaces/team';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AssignPlayer } from '../interfaces/assign-player';
import { AssignCaptain } from '../interfaces/assign-captain';
import { PointTeam } from '../interfaces/point-team';
import { TeamPlayer } from '../interfaces/team-player';
import { Formation } from '../interfaces/formation';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  url: string = 'https://teamtactics-backend.ambitiousmoss-465e145e.northeurope.azurecontainerapps.io/api/teams/';
  localUrl: string = 'https://localhost:5432/api/teams/';

  private team = { id: 0, name: "", locked: false } as Team;
  private teamSubject$: Subject<Team> = new BehaviorSubject<Team>(this.team);
  team$: Observable<Team> = this.teamSubject$.asObservable();

  private teams: Array<Team> = [];
  private teamsSubject$: Subject<Team[]> = new BehaviorSubject<Team[]>(this.teams);
  teams$: Observable<Team[]> = this.teamsSubject$.asObservable();

  private formations: Array<Formation> = [];
  private formationsSubject$: Subject<Formation[]> = new BehaviorSubject<Formation[]>(this.formations);
  formations$: Observable<Formation[]> = this.formationsSubject$.asObservable();

  private teamPoints: Array<PointTeam> = [];
  private teamPointsSubject$: Subject<PointTeam[]> = new BehaviorSubject<PointTeam[]>(this.teamPoints);
  teamPoints$: Observable<PointTeam[]> = this.teamPointsSubject$.asObservable();

  private teamPlayers: Array<TeamPlayer> = [];
  private teamPlayersSubject$: Subject<TeamPlayer[]> = new BehaviorSubject<TeamPlayer[]>(this.teamPlayers);
  teamPlayers$: Observable<TeamPlayer[]> = this.teamPlayersSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getTeam(teamId: number): void {
    this.teamsSubject$.next(this.teams);

    this.httpClient.get<Team[]>(this.url + teamId, this.httpOptions.getHttpOptions()).subscribe(response => {
      this.teamsSubject$.next(response);
    });
  }

  getFormations() {
    this.formationsSubject$.next(this.formations);

    this.httpClient.get<Formation[]>(this.url + 'formations', this.httpOptions.getHttpOptions()).subscribe(response => {
      this.formationsSubject$.next(response);
    });
  }

  getTeamPlayers(teamId: number) {
    this.teamPlayersSubject$.next(this.teamPlayers);

    this.httpClient.get<TeamPlayer[]>(this.url + teamId.toString() + '/players', this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      this.teamPlayersSubject$.next(response);
    });
  }

  getTeamPoints(teamId: number) {
    this.teamPointsSubject$.next(this.teamPoints);

    this.httpClient.get<PointTeam[]>(this.url + teamId.toString() + '/Points', this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      this.teamPointsSubject$.next(response);
    });
  }

  createTeam(team: Team): void {
    this.httpClient.post<any>(this.url + 'create', team, this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      if (response.status != 201) {
        alert(response.title)
      }
    });
  }

  lockTeam(teamId: number): void {
    this.httpClient.patch<any>(this.url + teamId.toString() + '/lock', this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      if (response.status == 204) {
        this.getTeam(teamId);
      }
      else {
        alert(response.title);
      }
    });
  }

  assignFormation(teamId: number, formationId: number) {
    this.httpClient.put<any>(this.url + teamId.toString() + '/formations/' + formationId.toString(), this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      if (response.status == 204) {
        this.getTeam(teamId);
      }
      else {
        alert(response.title);
      }
    });
  }

  assignPlayer(request: AssignPlayer, teamId: number): void {
    this.httpClient.put<any>(this.url + teamId.toString() + '/players/add', request, this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      if (response.status == 204) {
        this.getTeam(teamId);
      }
      else {
        alert(response.title);
      }
    });
  }

  assignCaptain(request: AssignCaptain, teamId: number): void {
    this.httpClient.put<any>(this.url + teamId.toString() + '/set-captain', request, this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      if (response.status == 204) {
        this.getTeam(teamId);
      }
      else {
        alert(response.title);
      }
    });
  }

  removePlayer(teamId: number, playerId: number) {
    this.httpClient.put<any>(this.url + teamId.toString() + '/players/' + playerId.toString() + '/remove', this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      if (response.status == 204) {
        this.getTeam(teamId);
      }
      else {
        alert(response.title);
      }
    });
  }

  renameTeam(team: Team): void {
    this.httpClient.patch<any>(this.url + '/' + team.id.toString(), team, this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      if (response.status != 200) {
        alert(response.title)
      }
    });
  }

  deleteTeam(teamId: number): void {
    this.httpClient.put<any>(this.url + '/' + teamId.toString(), this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      if (response.status != 200) {
        alert(response.title)
      }
    });
  }
}
