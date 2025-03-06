import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Point } from '../../interfaces/point';
import { PointService } from '../../services/point.service';

@Component({
  selector: 'app-point-system',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
  ],
  templateUrl: './point-system.component.html',
  styleUrl: './point-system.component.css'
})
export class PointSystemComponent {
  displayedColumns: string[] = ['name', 'description', 'amount'];

  points = new MatTableDataSource<Point>();

  constructor(private pointService: PointService) {
    this.pointService.getPointList();

    this.pointService.points$.subscribe(points => {
      this.points.data = points;
    })
  }
}
