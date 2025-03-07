import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Point } from '../../interfaces/point';
import { PointService } from '../../services/point.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-point-system',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './point-system.component.html',
  styleUrl: './point-system.component.css'
})
export class PointSystemComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'description', 'amount'];

  points = new MatTableDataSource<Point>();

  constructor(private pointService: PointService) {
    this.pointService.getPointList();

    this.pointService.points$.subscribe(points => {
      this.points.data = points;
    })
  }
  ngAfterViewInit(): void {
    this.points.paginator = this.paginator;
  }
}
