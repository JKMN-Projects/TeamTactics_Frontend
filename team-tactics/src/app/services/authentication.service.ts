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
  url: string = 'https://teamtactics-backend.ambitiousmoss-465e145e.northeurope.azurecontainerapps.io/api/authentication/';
  localUrl: string = 'https://localhost:5432/api/authentication/';

  private loggedIn = false;
  private loggedInSubject$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn$: Observable<boolean> = this.loggedInSubject$.asObservable();

  constructor(private httpClient: HttpClient) { };

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
    if (x.accessToken.length > 0) {
      sessionStorage.setItem("accessToken", x.accessToken);
      sessionStorage.setItem("refreshToken", x.refreshToken);

      this.loggedIn = true;
      this.loggedInSubject$.next(true);
    };
  };

  isAuthenticated(): boolean {
    return this.loggedIn;
  }
}
