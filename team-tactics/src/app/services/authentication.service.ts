import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Token } from '../interfaces/token';
import { JwtTokenService } from './jwt-token.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url: string = 'https://teamtactics-backend.ambitiousmoss-465e145e.northeurope.azurecontainerapps.io/api/authentication/';
  localUrl: string = 'https://localhost:5432/api/authentication/';

  private loggedIn = false;
  private loggedInSubject$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn$: Observable<boolean> = this.loggedInSubject$.asObservable();

  constructor(private httpClient: HttpClient, private jwt: JwtTokenService) { };

  getToken(login: Login) {
    this.httpClient.post<Token>(this.url + 'login', login).subscribe(response => {
      this.checkResponse(response);
    });
  };

  refreshToken() {
    return this.httpClient.post<Token>(this.url + 'refresh', {}, httpOptions);
  }

  removeToken() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
      this.loggedIn = false;
      this.loggedInSubject$.next(false);
  };

  checkResponse(response: Token) {
    if (response.token.length > 0) {
      if (response.tokenType == "JWT") {
        sessionStorage.setItem("accessToken", response.token);
      }
      else {
        sessionStorage.setItem("refreshToken", response.token);
      }

      this.loggedIn = true;
      this.loggedInSubject$.next(true);
    };
  };

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  checkLoginState(): boolean {
    if (this.jwt.getJwtClaim().expiry > Number.parseInt((Date.now().valueOf() / 1000).toString())) {
      return true;
    }
    else {
      return false;
    }
  }
}
