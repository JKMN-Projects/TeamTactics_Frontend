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



  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }


}
