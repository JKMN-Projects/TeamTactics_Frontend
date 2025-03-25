import { Injectable } from '@angular/core';
import { Competition } from '../interfaces/competition';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  url: string = 'https://teamtactics-backend.ambitiousmoss-465e145e.northeurope.azurecontainerapps.io/api/competitions';
  localUrl: string = 'https://localhost:5432/api/competitions';

  private competitions: Array<Competition> = [];
  private competitionsSubject$: Subject<Competition[]> = new BehaviorSubject<Competition[]>(this.competitions);
  competitions$: Observable<Competition[]> = this.competitionsSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getCompetitionList(): void {
    this.competitionsSubject$.next(this.competitions);

    this.httpClient.get<Competition[]>(this.url).subscribe(response => {
      this.competitionsSubject$.next(response);
    });
  }
}
