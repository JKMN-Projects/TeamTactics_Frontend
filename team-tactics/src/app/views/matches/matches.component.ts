import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TournamentMatch } from '../../interfaces/tournament-match';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TournamentService } from '../../services/tournament.service';
import { PointService } from '../../services/point.service';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent {
  displayedColumns = ["homeTeam", "score", "awayTeam", "timestamp"]

  tournamentMatch = new MatTableDataSource<TournamentMatch>();

  constructor(private router: Router, private tournamentService: TournamentService, private pointService: PointService) {
    this.tournamentService.tournamentMatches$.subscribe(matches => {
      this.tournamentMatch.data = matches;
    })
  }

  navigateToMatchPoints(tournamentMatch: TournamentMatch) {
    this.pointService.getMatchPoints(tournamentMatch.id);
    this.router.navigateByUrl("match");
  }
}
