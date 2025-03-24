import { Injectable } from '@angular/core';
import { Tournament } from '../interfaces/tournament';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';
import { TournamentTeam } from '../interfaces/tournament-team';
import { CreateTournament } from '../interfaces/create-tournament';
import { JoinTournament } from '../interfaces/join-tournament';
import { TournamentMatch } from '../interfaces/tournament-match';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  url: string = 'https://teamtactics-backend.ambitiousmoss-465e145e.northeurope.azurecontainerapps.io/api/tournaments/';
  localUrl: string = 'https://localhost:5432/api/tournaments/';

  private tournament = { id: 0 } as Tournament;
  private tournamentSubject$: Subject<Tournament> = new BehaviorSubject<Tournament>(this.tournament);
  tournament$: Observable<Tournament> = this.tournamentSubject$.asObservable();

  private tournaments: Array<Tournament> = [];
  private tournamentsSubject$: Subject<Tournament[]> = new BehaviorSubject<Tournament[]>(this.tournaments);
  tournaments$: Observable<Tournament[]> = this.tournamentsSubject$.asObservable();

  private tournamentTeams: Array<TournamentTeam> = [];
  private tournamentTeamsSubject$: Subject<TournamentTeam[]> = new BehaviorSubject<TournamentTeam[]>(this.tournamentTeams);
  tournamentTeams$: Observable<TournamentTeam[]> = this.tournamentTeamsSubject$.asObservable();

  private tournamentMatches: Array<TournamentMatch> = [];
  private tournamentMatchesSubject$: Subject<TournamentMatch[]> = new BehaviorSubject<TournamentMatch[]>(this.tournamentMatches);
  tournamentMatches$: Observable<TournamentMatch[]> = this.tournamentMatchesSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getTournament(tournamentId: number): void {
    this.tournamentSubject$.next(this.tournament);

    this.httpClient.get<Tournament>(this.url + tournamentId.toString(), this.httpOptions.getHttpOptions()).subscribe(response => {
      this.tournamentSubject$.next(response);
    });
  }

  getTournamentList(): void {
    this.tournamentsSubject$.next(this.tournaments);

    this.httpClient.get<Tournament[]>(this.url, this.httpOptions.getHttpOptions()).subscribe(response => {
      this.tournamentsSubject$.next(response);
    });
  }

  getTournamentTeamList(tournamentId: number): void {
    this.tournamentTeamsSubject$.next(this.tournamentTeams);

    this.httpClient.get<TournamentTeam[]>(this.url + tournamentId.toString() + "/teams", this.httpOptions.getHttpOptions()).subscribe(response => {
      console.log(response);
      this.tournamentTeamsSubject$.next(response);
    });
  }

  getTournamentMatchList(tournamentId: number): void {
    this.tournamentMatchesSubject$.next(this.tournamentMatches);

    this.httpClient.get<TournamentMatch[]>(this.url + tournamentId.toString() + "/matches", this.httpOptions.getHttpOptions()).subscribe(response => {
      this.tournamentMatchesSubject$.next(response);
    });
  }

  joinTournament(tournament: JoinTournament): void {
    this.httpClient.post<any>(this.url + 'join', tournament, this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      if (response.staus == 200) {
        this.getTournament(response.body.id);
      }
      else {
        alert("Failed to join tournament.");
      }
    });
  }

  createTournament(tournament: CreateTournament): void {
    this.httpClient.post<any>(this.url, tournament, this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      console.log(response.body.id);

      if (response.status == 201) {
        this.getTournament(response.body.id);
      }
      else {
        alert("Failed to create tournament.");
      }
    });
  }

  updateTournament(tournament: Tournament): void {
    this.httpClient.put<any>(this.url + tournament.id.toString(), tournament, this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      if (response.status != 200) {
        alert("Failed to update tournament.");
      }
    });
  }

  deleteTournament(tournament: Tournament): void {
    this.httpClient.put<any>(this.url + tournament.id.toString(), this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      if (response.status != 200) {
        alert("Failed to delete tournament.")
      }
    });
  }
}
