import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tournament } from '../../interfaces/tournament';
import { Router } from '@angular/router';
import { TournamentService } from '../../services/tournament.service';
import { UserService } from '../../services/user.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { JwtTokenService } from '../../services/jwt-token.service';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../interfaces/user';
import { UserTournamentTeam } from '../../interfaces/user-tournament-team';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['tournamentName', 'teamName', 'competitionName', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource<UserTournamentTeam>();
  user = {} as User;

  constructor(private router: Router, private userService: UserService, private tournamentService: TournamentService,
    private jwt: JwtTokenService) {
    this.userService.getUser(this.jwt.getUserId());
    this.tournamentService.getTournamentList();

    this.userService.user$.subscribe(user => {
      this.user = user;
    })

    this.userService.userTeams$.subscribe(userTeams => {
      this.dataSource.data = userTeams;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  navigateToTournament(tournament: UserTournamentTeam) {
    this.tournamentService.getTournament(tournament.tournamentId);
    this.router.navigateByUrl("tournament");
  }
}
