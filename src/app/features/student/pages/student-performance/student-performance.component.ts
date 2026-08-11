import { Component, OnInit } from '@angular/core';

interface SubjectPerformance {
  id: number;
  subject: string;
  teacher: string;
  term1Score: number;
  term2Score: number;
  finalScore: number;
  grade: string;
  status: 'excellent' | 'good' | 'average' | 'needs-improvement';
}

@Component({
  selector: 'app-student-performance',
  templateUrl: './student-performance.component.html',
  styleUrls: ['./student-performance.component.scss']
})
export class StudentPerformanceComponent implements OnInit {
  performances: SubjectPerformance[] = [];
  overallGPA: number = 0;
  totalCredits: number = 0;
  rank: number = 12;

  ngOnInit() {
    this.performances = [
      { id: 1, subject: 'Mathematics', teacher: 'Mr. Smith', term1Score: 85, term2Score: 89, finalScore: 87, grade: 'A', status: 'excellent' },
      { id: 2, subject: 'Physics', teacher: 'Dr. Jones', term1Score: 78, term2Score: 82, finalScore: 80, grade: 'B+', status: 'good' },
      { id: 3, subject: 'Chemistry', teacher: 'Mrs. White', term1Score: 92, term2Score: 95, finalScore: 93.5, grade: 'A+', status: 'excellent' },
      { id: 4, subject: 'Biology', teacher: 'Ms. Green', term1Score: 70, term2Score: 75, finalScore: 72.5, grade: 'B', status: 'average' },
      { id: 5, subject: 'English Lit.', teacher: 'Mr. Brown', term1Score: 88, term2Score: 90, finalScore: 89, grade: 'A', status: 'excellent' },
      { id: 6, subject: 'History', teacher: 'Mrs. Davis', term1Score: 65, term2Score: 68, finalScore: 66.5, grade: 'C+', status: 'needs-improvement' }
    ];

    this.overallGPA = 3.8;
    this.totalCredits = 120;
  }
}
