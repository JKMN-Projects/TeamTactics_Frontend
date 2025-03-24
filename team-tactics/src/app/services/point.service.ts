import { Injectable } from '@angular/core';
import { Point } from '../interfaces/point';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PointMatch } from '../interfaces/point-match';
import { PointTeam } from '../interfaces/point-team';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  url: string = 'https://teamtactics-backend.ambitiousmoss-465e145e.northeurope.azurecontainerapps.io/api/points/';
  localUrl: string = 'https://localhost:5432/api/points/';

  private points: Array<Point> = [];
  private pointsSubject$: Subject<Point[]> = new BehaviorSubject<Point[]>(this.points);
  points$: Observable<Point[]> = this.pointsSubject$.asObservable();

  private matchPoints: Array<PointMatch> = [];
  private matchPointsSubject$: Subject<PointMatch[]> = new BehaviorSubject<PointMatch[]>(this.matchPoints);
  matchPoints$: Observable<PointMatch[]> = this.matchPointsSubject$.asObservable();

  private teamPoints: Array<PointTeam> = [];
  private teamPointsSubject$: Subject<PointTeam[]> = new BehaviorSubject<PointTeam[]>(this.teamPoints);
  teamPoints$: Observable<PointTeam[]> = this.teamPointsSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getPointList(): void {
    this.httpClient.get<Point[]>(this.url).subscribe(x => {
      this.pointsSubject$.next(x);
    });
  }

  getMatchPoints(matchId: number) {
    this.httpClient.get<PointMatch[]>(this.url + matchId, this.httpOptions.getHttpOptions()).subscribe(x => {
      this.matchPointsSubject$.next(x);
    });
  }
}
