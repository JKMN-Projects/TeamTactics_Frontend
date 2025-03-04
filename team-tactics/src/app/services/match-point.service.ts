import { Injectable } from '@angular/core';
import { MatchPoints } from '../interfaces/match-points';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatchPointService {
  url: string = 'https://xxxx/api/matchPoints/';
  localUrl: string = 'https://localhost:xxxx/api/matchPoints/';

  private matchPoints: Array<MatchPoints> = [];
  private matchPointsSubject$: Subject<MatchPoints[]> = new BehaviorSubject<MatchPoints[]>(this.matchPoints);
  matchPoints$: Observable<MatchPoints[]> = this.matchPointsSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getMatchPointList(matchId: number): void {
    this.matchPointsSubject$.next(this.matchPoints);

    this.httpClient.get<MatchPoints[]>(this.url + 'getMatchPointList/' + matchId, this.httpOptions.getHttpOptions()).subscribe(x => {
      this.matchPointsSubject$.next(x);
    });
  }
}
