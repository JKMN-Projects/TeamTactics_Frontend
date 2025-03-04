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
  url: string = 'https://xxxx/api/player/';
  localUrl: string = 'https://localhost:xxxx/api/player/';

  private players: Array<Player> = [];
  private usersSubject$: Subject<Player[]> = new BehaviorSubject<Player[]>(this.players);
  users$: Observable<Player[]> = this.usersSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getAllByTournamentId(tournamentId: number): void {
    this.usersSubject$.next(this.players);

    this.httpClient.get<Player[]>(this.url + 'getAllByTournamentId/' + tournamentId, this.httpOptions.getHttpOptions()).subscribe(x => {
      this.usersSubject$.next(x);
    });
  }

  assignPlayer(request: AssignPlayer): void {
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
