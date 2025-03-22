import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Competition } from '../../interfaces/competition';
import { CompetitionService } from '../../services/competition.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { JwtTokenService } from '../../services/jwt-token.service';
import { CreateTournamentComponent } from '../../modals/create-tournament/create-tournament.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    AsyncPipe,
  ],
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.css'
})
export class CompetitionsComponent {
  loggedIn$ = this.authService.loggedIn$;

  competitions = new Array<Competition>();

  constructor(private authService: AuthenticationService, private competitionService: CompetitionService,
    private jwt: JwtTokenService, private matDialog: MatDialog, private router: Router) {
    this.competitionService.getCompetitionList();

    this.competitionService.competitions$.subscribe(comp => {
      this.competitions = comp;
    })
  }

  openCreateTournament(comp: Competition) {
    this.matDialog.open(CreateTournamentComponent, {
      data: {
        competitionId: comp.id,
        userId: this.jwt.getUserId()
      }
    }).afterClosed().subscribe(x => {
      if (x) {
        this.router.navigateByUrl("tournament");
      }
    })
  }
}
