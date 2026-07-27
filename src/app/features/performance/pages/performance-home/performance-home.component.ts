import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface PerformanceReview {
  id: string;
  employeeName: string;
  department: string;
  role: string;
  lastReviewDate: string;
  overallRating: number;
  status: 'Reviewed' | 'Pending';
}

@Component({
  selector: 'app-performance-home',
  templateUrl: './performance-home.component.html',
  styleUrls: ['./performance-home.component.scss']
})
export class PerformanceHomeComponent implements OnInit {

  reviews: PerformanceReview[] = [];

  metrics = {
    upcomingReviews: 12,
    topPerformers: 8,
    averageRating: 4.2
  };

  ngOnInit(): void {
    this.reviews = [
      {
        id: 'REV-001',
        employeeName: 'Dr. Vikram Singh',
        department: 'Leadership',
        role: 'Principal',
        lastReviewDate: '15 Jan 2026',
        overallRating: 5,
        status: 'Reviewed'
      },
      {
        id: 'REV-002',
        employeeName: 'Rahul Patel',
        department: 'Science',
        role: 'Senior Science Teacher',
        lastReviewDate: '10 Feb 2026',
        overallRating: 4,
        status: 'Reviewed'
      },
      {
        id: 'REV-003',
        employeeName: 'Anita Desai',
        department: 'Support Staff',
        role: 'Librarian',
        lastReviewDate: '01 Mar 2026',
        overallRating: 3,
        status: 'Pending'
      },
      {
        id: 'REV-004',
        employeeName: 'Sunita Sharma',
        department: 'Mathematics',
        role: 'Math Teacher',
        lastReviewDate: '20 Mar 2026',
        overallRating: 4,
        status: 'Reviewed'
      }
    ];
  }

  constructor(private router: Router) {}

  newEvaluation() {
    this.router.navigate(['/performance/add']);
  }

  viewDetails(id: string) {
    alert(`Viewing performance details for review ${id}`);
  }
}
