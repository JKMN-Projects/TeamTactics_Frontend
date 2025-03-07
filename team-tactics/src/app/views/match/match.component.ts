import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PointMatch } from '../../interfaces/point-match';
import { PointService } from '../../services/point.service';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css'
})
export class MatchComponent {
  displayedColumns = ["playerName", "clubName", "pointCategoryName", "occurrences", "totalPoints"];

  matchPoints = new MatTableDataSource<PointMatch>();

  constructor(private pointService: PointService) {
    this.pointService.matchPoints$.subscribe(matchPoints => {
      this.matchPoints.data = matchPoints;
    })
  }
}
