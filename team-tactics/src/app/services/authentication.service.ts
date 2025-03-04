import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Token } from '../interfaces/token';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url: string = 'https://xxxx/api/authentication/';
  localUrl: string = 'https://localhost:xxxx/api/authentication/';

  private loggedInSubject$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn$: Observable<boolean> = this.loggedInSubject$.asObservable();

  constructor(private httpClient: HttpClient) { };

  getToken(login: Login) {
    this.httpClient.post<Token>(this.url + 'Login', login).subscribe(x => {
      this.checkResponse(x);
    });
  };

  refreshToken() {
    return this.httpClient.post<Token>(this.url + 'refresh', {}, httpOptions);
  }

  removeToken() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    this.loggedInSubject$.next(false);
  };

  register(login: Login) {
    this.httpClient.post<Token>(this.url + 'register', login).subscribe(x => {
      this.checkResponse(x);
    });
  };

  checkResponse(x: Token) {
    if (x.accessToken.length > 0) {
      sessionStorage.setItem("accessToken", x.accessToken);
      sessionStorage.setItem("refreshToken", x.refreshToken);

      this.loggedInSubject$.next(true);
    };
  };
}
