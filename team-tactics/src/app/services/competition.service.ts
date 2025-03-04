import { Injectable } from '@angular/core';
import { Competition } from '../interfaces/competition';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  url: string = 'https://xxxx/api/competition/';
  localUrl: string = 'https://localhost:xxxx/api/competition/';

  private competitions: Array<Competition> = [];
  private competitionsSubject$: Subject<Competition[]> = new BehaviorSubject<Competition[]>(this.competitions);
  competitions$: Observable<Competition[]> = this.competitionsSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getCompetitionList(): void {
    this.competitionsSubject$.next(this.competitions);

    this.httpClient.get<Competition[]>(this.url + 'getCompetitionList', this.httpOptions.getHttpOptions()).subscribe(x => {
      this.competitionsSubject$.next(x);
    });
  }
}
