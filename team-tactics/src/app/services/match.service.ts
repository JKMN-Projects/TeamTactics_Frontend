import { Injectable } from '@angular/core';
import { Match } from '../interfaces/match';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  url: string = 'https://xxxx/api/match/';
  localUrl: string = 'https://localhost:xxxx/api/match/';

  private matches: Array<Match> = [];
  private matchesSubject$: Subject<Match[]> = new BehaviorSubject<Match[]>(this.matches);
  matches$: Observable<Match[]> = this.matchesSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getMatchList(competitionId: number): void {
    this.matchesSubject$.next(this.matches);

    this.httpClient.get<Match[]>(this.url + 'getMatchList/' + competitionId, this.httpOptions.getHttpOptions()).subscribe(x => {
      this.matchesSubject$.next(x);
    });
  }
}
