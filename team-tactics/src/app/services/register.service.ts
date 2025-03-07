import { Injectable } from '@angular/core';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';
import { RegisterUserRequest } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url: string = 'https://teamtactics-backend.ambitiousmoss-465e145e.northeurope.azurecontainerapps.io/api/users/register';
  localUrl: string = 'https://localhost:5432/api/users/register';

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  registerUser(user: RegisterUserRequest): void {
    console.log(JSON.stringify(user));

    this.httpClient.post<any>(this.url, user, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(x => {
      console.log(x)
      // if (x.status != 201) {
      //   alert("Failed to register user")
      // }
    });
  }
}
