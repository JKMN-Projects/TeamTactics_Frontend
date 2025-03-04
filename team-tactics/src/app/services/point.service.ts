import { Injectable } from '@angular/core';
import { Points } from '../interfaces/points';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  url: string = 'https://xxxx/api/points/';
  localUrl: string = 'https://localhost:xxxx/api/points/';

  private points: Array<Points> = [];
  private pointsSubject$: Subject<Points[]> = new BehaviorSubject<Points[]>(this.points);
  points$: Observable<Points[]> = this.pointsSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getPointList(matchId: number): void {
    this.pointsSubject$.next(this.points);

    this.httpClient.get<Points[]>(this.url + 'getPointList/' + matchId, this.httpOptions.getHttpOptions()).subscribe(x => {
      this.pointsSubject$.next(x);
    });
  }
}
