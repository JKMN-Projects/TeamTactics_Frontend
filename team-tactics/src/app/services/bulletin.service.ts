import { Injectable } from '@angular/core';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';
import { Bulletin } from '../interfaces/bulletin';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BulletinService {
  url: string = 'https://teamtactics-backend.ambitiousmoss-465e145e.northeurope.azurecontainerapps.io/api/bulletins/';
  localUrl: string = 'https://localhost:5432/api/bulletins/';

  private bulletins: Array<Bulletin> = [];
  private bulletinsSubject$: Subject<Bulletin[]> = new BehaviorSubject<Bulletin[]>(this.bulletins);
  bulletins$: Observable<Bulletin[]> = this.bulletinsSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getBulletinList(tournamentId: number): void {
    this.bulletinsSubject$.next(this.bulletins);

    this.httpClient.get<Bulletin[]>(this.url + "tournaments/" + tournamentId.toString(), this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      this.bulletinsSubject$.next(x);
    });
  }

  createBulletin(bulletin: Bulletin, tournamentId: number): void {
    this.httpClient.post<any>(this.url + "tournaments/" + tournamentId.toString(), bulletin, this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.statusCode != 201) {
        alert("Failed to create team.")
      }

      this.getBulletinList(tournamentId);
    });
  }
}
