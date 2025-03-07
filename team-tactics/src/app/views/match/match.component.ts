import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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
export class MatchComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ["playerName", "clubName", "pointCategoryName", "occurrences", "totalPoints"];

  matchPoints = new MatTableDataSource<PointMatch>();

  constructor(private pointService: PointService) {
    this.pointService.matchPoints$.subscribe(matchPoints => {
      this.matchPoints.data = matchPoints;
    })
  }

  ngAfterViewInit(): void {
    this.matchPoints.paginator = this.paginator;
  }
}
