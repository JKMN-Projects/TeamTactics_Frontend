import { Injectable } from '@angular/core';
import { Tournament } from '../interfaces/tournament';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  url: string = 'https://xxxx/api/tournaments/';
  localUrl: string = 'https://localhost:xxxx/api/tournaments/';

  private tournaments: Array<Tournament> = [];
  private tournamentsSubject$: Subject<Tournament[]> = new BehaviorSubject<Tournament[]>(this.tournaments);
  tournaments$: Observable<Tournament[]> = this.tournamentsSubject$.asObservable();

  private tournament?: Tournament | undefined;
  private tournamentSubject$: Subject<Tournament | undefined> = new BehaviorSubject<Tournament | undefined>(this.tournament);
  tournament$: Observable<Tournament | undefined> = this.tournamentSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getTournamentList(): void {
    this.tournamentsSubject$.next(this.tournaments);

    this.httpClient.get<Tournament[]>(this.url, this.httpOptions.getHttpOptions()).subscribe(x => {
      this.tournamentsSubject$.next(x);
    });
  }

  getTournament(tournamentId: number): void {
    this.tournamentSubject$.next(this.tournament);

    this.httpClient.get<Tournament>(this.url + 'getTournament/' + tournamentId.toString(), this.httpOptions.getHttpOptions()).subscribe(x => {
      this.tournamentSubject$.next(x);
    });
  }

  joinTournament(tournament: Tournament): void {
    this.httpClient.post<any>(this.url + 'join', tournament, this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.status < 200 && x.status > 299) {
        alert("Failed to create tournament.")
      }
    });
  }

  createTournament(tournament: Tournament): void {
    this.httpClient.post<any>(this.url + 'create', tournament, this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.status < 200 && x.status > 299) {
        alert("Failed to create tournament.")
      }
    });
  }

  updateTournament(tournament: Tournament): void {
    this.httpClient.put<any>(this.url + 'update', tournament, this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.status < 200 && x.status > 299) {
        alert("Failed to update tournament.")
      }
    });
  }

  deleteTournament(tournament: Tournament): void {
    this.httpClient.put<any>(this.url + 'delete/' + tournament.id.toString(), this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.status < 200 && x.status > 299) {
        alert("Failed to delete tournament.")
      }
    });
  }
}
