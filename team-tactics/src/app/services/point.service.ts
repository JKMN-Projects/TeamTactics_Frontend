import { Injectable } from '@angular/core';
import { Point } from '../interfaces/point';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  url: string = 'https://teamtactics-backend.ambitiousmoss-465e145e.northeurope.azurecontainerapps.io/api/points/';
  localUrl: string = 'https://localhost:5432/api/points/';

  private points: Array<Point> = [];
  private pointsSubject$: Subject<Point[]> = new BehaviorSubject<Point[]>(this.points);
  points$: Observable<Point[]> = this.pointsSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getPointList(): void {
    this.pointsSubject$.next(this.points);

    this.httpClient.get<Point[]>(this.url).subscribe(x => {
      this.pointsSubject$.next(x);
    });
  }
}
