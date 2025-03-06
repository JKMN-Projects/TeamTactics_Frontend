import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';
import { AssignPlayer } from '../interfaces/assign-player';
import { AssignCaptain } from '../interfaces/assign-captain';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  url: string = 'https://teamtactics-backend.ambitiousmoss-465e145e.northeurope.azurecontainerapps.io/api/players/';
  localUrl: string = 'https://localhost:5432/api/players/';

  private players: Array<Player> = [];
  private playersSubject$: Subject<Player[]> = new BehaviorSubject<Player[]>(this.players);
  players$: Observable<Player[]> = this.playersSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getPlayersByCompetitionId(competitionId: number): void {
    this.playersSubject$.next(this.players);

    this.httpClient.get<Player[]>(this.url + 'competitions/' + competitionId, this.httpOptions.getHttpOptions()).subscribe(x => {
      this.playersSubject$.next(x);
    });
  }

  assignPlayer(request: AssignPlayer, teamId: number): void {
    this.httpClient.put<any>(this.url + 'assignPlayer', request, this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.status < 200 && x.status > 299) {
        alert("Failed to assign player.")
      }
    });
  }

  assignCaptain(request: AssignCaptain): void {
    this.httpClient.put<any>(this.url + 'assignCaptain', request, this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.status < 200 && x.status > 299) {
        alert("Failed to assign captain.")
      }
    });
  }
}
