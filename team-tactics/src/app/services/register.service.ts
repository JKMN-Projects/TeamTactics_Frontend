import { Injectable } from '@angular/core';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url: string = 'https://teamtactics-backend.ambitiousmoss-465e145e.northeurope.azurecontainerapps.io/api/register/';
  localUrl: string = 'https://localhost:5432/api/register/';

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  registerUser(user: Register): void {
    this.httpClient.post<any>(this.url, user, this.httpOptions.getHttpOptionsWithObserve()).subscribe(x => {
      if (x.status < 200 && x.status > 299) {
        alert("Failed to register user.")
      }
    });
  }
}
