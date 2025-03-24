import { Injectable } from '@angular/core';
import { Tournament } from '../interfaces/tournament';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';
import { TournamentTeam } from '../interfaces/tournament-team';
import { CreateTournament } from '../interfaces/create-tournament';
import { JoinTournament } from '../interfaces/join-tournament';
import { TournamentMatch } from '../interfaces/tournament-match';
import { Bulletin } from '../interfaces/bulletin';

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

  private bulletins: Array<Bulletin> = [];
  private bulletinsSubject$: Subject<Bulletin[]> = new BehaviorSubject<Bulletin[]>(this.bulletins);
  bulletins$: Observable<Bulletin[]> = this.bulletinsSubject$.asObservable();

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
      this.tournamentTeamsSubject$.next(response);
    });
  }

  getTournamentMatchList(tournamentId: number): void {
    this.tournamentMatchesSubject$.next(this.tournamentMatches);

    this.httpClient.get<TournamentMatch[]>(this.url + tournamentId.toString() + "/matches", this.httpOptions.getHttpOptions()).subscribe(response => {
      this.tournamentMatchesSubject$.next(response);
    });
  }

  getBulletinList(tournamentId: number): void {
    this.bulletinsSubject$.next(this.bulletins);

    this.httpClient.get<Bulletin[]>(this.url + tournamentId.toString() + "/bulletins", this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      this.bulletinsSubject$.next(response);
    });
  }

  createBulletin(bulletin: Bulletin, tournamentId: number): void {
    this.httpClient.post<any>(this.url + tournamentId.toString() + "/create-bulletin", bulletin, this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      if (response.statusCode != 201) {
        alert(response.title)
      }

      this.getBulletinList(tournamentId);
    });
  }

  joinTournament(tournament: JoinTournament): void {
    this.httpClient.post<any>(this.url + 'join', tournament, this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      if (response.staus == 200) {
        this.getTournament(response.body.id);
      }
      else {
        alert(response.title);
      }
    });
  }

  createTournament(tournament: CreateTournament): void {
    this.httpClient.post<any>(this.url, tournament, this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {

      if (response.status == 201) {
        console.log(response);
        // this.getTournament(Number.parseInt(response.body.id));
      }
      else {
        alert(response.title);
      }
    });
  }

  updateTournament(tournament: Tournament): void {
    this.httpClient.put<any>(this.url + tournament.id.toString(), tournament, this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      if (response.status != 200) {
        alert(response.title);
      }
    });
  }

  deleteTournament(tournament: Tournament): void {
    this.httpClient.put<any>(this.url + tournament.id.toString(), this.httpOptions.getHttpOptionsWithObserve()).subscribe(response => {
      if (response.status != 200) {
        alert(response.title)
      }
    });
  }
}
