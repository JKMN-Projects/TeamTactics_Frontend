import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = 'https://xxxx/api/user/';
  localUrl: string = 'https://localhost:xxxx/api/user/';

  private user: Array<User> = [];
  private userSubject$: Subject<User[]> = new BehaviorSubject<User[]>(this.user);
  user$: Observable<User[]> = this.userSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getUser(userId: number): void {
    this.userSubject$.next(this.user);

    this.httpClient.get<User[]>(this.url + 'getUser', this.httpOptions.getHttpOptions()).subscribe(x => {
      this.userSubject$.next(x);
    });
  }
}
