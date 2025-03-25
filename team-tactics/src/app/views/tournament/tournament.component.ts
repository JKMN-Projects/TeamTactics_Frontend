import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TournamentTeam } from '../../interfaces/tournament-team';
import { TournamentService } from '../../services/tournament.service';
import { Tournament } from '../../interfaces/tournament';
import { JwtTokenService } from '../../services/jwt-token.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { Bulletin } from '../../interfaces/bulletin';
import { ColumnWidthDirective } from '../../directives/column-width.directive';
import { MatDialog } from '@angular/material/dialog';
import { CreateBulletinComponent } from '../../modals/create-bulletin/create-bulletin.component';
import { Router } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { PlayerService } from '../../services/player.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tournament',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatPaginatorModule,
    MatButtonModule,
    ColumnWidthDirective,
    MatIconModule,
  ],
  templateUrl: './tournament.component.html',
  styleUrl: './tournament.component.css'
})
export class TournamentComponent implements AfterViewInit {
  @ViewChildren(MatPaginator) paginators!: QueryList<MatPaginator>;

  standingColumns: string[] = ['nr', 'teamName', 'totalPoints', 'setTeam'];
  bulletinColumns: string[] = ['username', 'text', 'timestamp'];

  tournament = {
    id: 0,
    name: "Test tournament",
    description: "This is a long test description written multiple times. This is a long test description written multiple times. This is a long test description written multiple times. This is a long test description written multiple times. This is a long test description written multiple times. This is a long test description written multiple times This is a long test description written multiple times. This is a long test description written multiple times This is a long test description written multiple times",
    ownerUserId: 0,
    ownerUsername: "TestUsername",
    inviteCode: "478291",
    competitionId: 0,
    competitionName: "Premier league"
  } as Tournament;

  tournamentTeams = new MatTableDataSource<TournamentTeam>();
  bulletins = new MatTableDataSource<Bulletin>();

  constructor(private tournamentService: TournamentService, private jwtService: JwtTokenService, private matDialog: MatDialog,
    private router: Router, private teamService: TeamService, private playerService: PlayerService) {
    this.tournamentService.tournament$.subscribe(tournament => {
      this.tournament = tournament;

      if (this.tournament.id > 0) {
        this.tournamentService.getTournamentTeamList(tournament.id);
        this.tournamentService.getBulletinList(tournament.id);
      }
    });

    this.tournamentService.tournamentTeams$.subscribe(teams => {
      this.tournamentTeams.data = teams;
    });

    this.tournamentService.bulletins$.subscribe(bulletins => {
      this.bulletins.data = bulletins;
    });
  }

  ngAfterViewInit(): void {
    this.tournamentTeams.paginator = this.paginators.toArray()[0];
    this.bulletins.paginator = this.paginators.toArray()[1];
  }

  getIndex(tournamentTeam: TournamentTeam) {
    return this.tournamentTeams.data.findIndex(team => team.teamId == tournamentTeam.teamId) + 1;
  }

  checkOwner(): boolean {
    return this.jwtService.getUserId() == this.tournament.ownerUserId ? true : false;
  }

  checkTeamOwner(team: TournamentTeam): boolean {
    return this.jwtService.getUserId() == team.userId ? true : false;
  }

  navigateToCreateTeam(team: TournamentTeam) {
    this.teamService.getTeam(team.teamId);
    this.playerService.getPlayersByCompetitionId(this.tournament.competitionId);
    this.router.navigateByUrl("create_team");
  }

  navigateToMatches() {
    this.tournamentService.getTournamentMatchList(this.tournament.id);
    this.router.navigateByUrl("matches");
  }

  navigateToTeamPoints(team: TournamentTeam) {
    this.teamService.getTeamPoints(team.teamId);
    this.router.navigateByUrl("team");
  }

  openCreateBulletin() {
    this.matDialog.open(CreateBulletinComponent, {
      data: {
        tournamentId: this.tournament.id,
        userId: this.jwtService.getUserId()
      }
    })
  }
}
