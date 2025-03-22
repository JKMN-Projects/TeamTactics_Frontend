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
    this.httpClient.post<Token>(this.url + 'login', login).subscribe(x => {
      console.log(x);
      this.checkResponse(x);
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

  register(login: Login) {
    this.httpClient.post<any>(this.url + 'register', login).subscribe(x => {
      if (x.status == 200) {
        alert("User was registered succesfully.");
      }
      else {
        alert("Failed to register user.")
      }
    });
  };

  checkResponse(x: Token) {
    if (x.token.length > 0) {
      if (x.tokenType == "JWT") {
        sessionStorage.setItem("accessToken", x.token);
      }
      else {
        sessionStorage.setItem("refreshToken", x.token);
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
