import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpOptionsService } from './http-options.service';
import { HttpClient } from '@angular/common/http';
import { UserTournamentTeam } from '../interfaces/user-tournament-team';
import { RegisterUserRequest } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = 'https://teamtactics-backend.ambitiousmoss-465e145e.northeurope.azurecontainerapps.io/api/users/';
  localUrl: string = 'https://localhost:5432/api/users/';

  private user = {} as User;
  private userSubject$: Subject<User> = new BehaviorSubject<User>(this.user);
  user$: Observable<User> = this.userSubject$.asObservable();

  private userTeams: Array<UserTournamentTeam> = [];
  private userTeamsSubject$: Subject<UserTournamentTeam[]> = new BehaviorSubject<UserTournamentTeam[]>(this.userTeams);
  userTeams$: Observable<UserTournamentTeam[]> = this.userTeamsSubject$.asObservable();

  constructor(private httpOptions: HttpOptionsService, private httpClient: HttpClient) { }

  getUser(userId: number): void {
    this.userSubject$.next(this.user);

    this.httpClient.get<User>(this.url + userId.toString() + "/Profile", this.httpOptions.getHttpOptions()).subscribe(response => {
      this.userSubject$.next(response);
    });
  }

  getUserTournamentTeam(userId: number) {
    this.userTeamsSubject$.next(this.userTeams);

    this.httpClient.get<UserTournamentTeam[]>(this.url + userId.toString() + "/tournaments/teams", this.httpOptions.getHttpOptions()).subscribe(response => {
      this.userTeamsSubject$.next(response);
    });
  }

  registerUser(user: RegisterUserRequest): void {
    this.httpClient.post<any>(this.url + "register", user, { headers: { 'Content-Type': 'application/json' }}).subscribe(response => {
      if (response.ok) {
        alert("User registered succesfully");
      }
      else {
        alert("Failed to register user");
      }
    });
  }
}
