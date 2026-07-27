import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../../services/performance.service';
import { PerformanceReview } from '../../models/performance.model';

@Component({
  selector: 'app-teacher-performance',
  templateUrl: './teacher-performance.component.html',
  styleUrls: ['./teacher-performance.component.scss']
})
export class TeacherPerformanceComponent implements OnInit {
  reviews: PerformanceReview[] = [];

  constructor(private performanceService: PerformanceService) {}

  ngOnInit(): void {
    this.performanceService.getPerformanceReviews().subscribe(data => {
      this.reviews = data;
    });
  }
}
