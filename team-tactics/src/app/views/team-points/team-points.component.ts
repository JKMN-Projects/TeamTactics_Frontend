import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PointTeam } from '../../interfaces/point-team';
import { PointService } from '../../services/point.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-points',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './team-points.component.html',
  styleUrl: './team-points.component.css'
})
export class TeamPointsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ["playerName", "clubName", "pointCategoryName", "occurrences", "totalPoints"];

  teamPoints = new MatTableDataSource<PointTeam>();

  constructor(private teamService: TeamService) {
    this.teamService.teamPoints$.subscribe(teamPoints => {
      this.teamPoints.data = teamPoints;
    })
  }

  ngAfterViewInit(): void {
    this.teamPoints.paginator = this.paginator;
  }
}
