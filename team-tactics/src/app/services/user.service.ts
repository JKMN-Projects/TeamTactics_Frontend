import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = 'https://teamtactics-backend.ambitiousmoss-465e145e.northeurope.azurecontainerapps.io/api/users/';
  localUrl: string = 'https://localhost:5432/api/users/';

  private user = {} as User;
  private userSubject$: Subject<User> = new BehaviorSubject<User>(this.user);
  user$: Observable<User> = this.userSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getUser(userId: number): void {
    this.userSubject$.next(this.user);

    this.httpClient.get<User>(this.url + userId.toString(), this.httpOptions.getHttpOptions()).subscribe(response => {
      this.userSubject$.next(response);
    });
  }
}
