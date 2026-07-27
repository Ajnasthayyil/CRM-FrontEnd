import { Injectable } from '@angular/core';
import { AcademicHeadService } from './academic-head.service';
import { PerformanceReview } from '../models/performance.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private mockReviews: PerformanceReview[] = [
    {
      id: 'P001', teacherId: 'T101', teacherName: 'John Mathew', departmentId: 3, reviewPeriod: 'Quarterly',
      overallScore: 4.8, teachingQuality: 5, subjectKnowledge: 5, communication: 4, classroomManagement: 5,
      studentEngagement: 5, lessonPlanning: 4, attendanceAndPunctuality: 5, discipline: 5, professionalism: 5,
      strengths: 'Excellent grasp of DS algorithms.', areasForImprovement: 'Could improve assignment feedback time.',
      academicHeadRemarks: 'Keep up the good work.', recommendations: 'Recommend for senior faculty training.',
      status: 'Excellent', reviewedDate: '2026-07-20'
    },
    {
      id: 'P002', teacherId: 'T102', teacherName: 'Anjali Thomas', departmentId: 3, reviewPeriod: 'Quarterly',
      overallScore: 3.8, teachingQuality: 4, subjectKnowledge: 4, communication: 4, classroomManagement: 3,
      studentEngagement: 4, lessonPlanning: 4, attendanceAndPunctuality: 4, discipline: 4, professionalism: 3,
      strengths: 'Very good student interaction.', areasForImprovement: 'Classroom management needs work.',
      academicHeadRemarks: 'Good progress.', recommendations: 'Needs to attend classroom management workshop.',
      status: 'Good', reviewedDate: '2026-07-21'
    },
    {
      id: 'P003', teacherId: 'T201', teacherName: 'Sara Joseph', departmentId: 4, reviewPeriod: 'Monthly',
      overallScore: 4.9, teachingQuality: 5, subjectKnowledge: 5, communication: 5, classroomManagement: 5,
      studentEngagement: 5, lessonPlanning: 5, attendanceAndPunctuality: 5, discipline: 4, professionalism: 5,
      strengths: 'Exceptional teaching.', areasForImprovement: 'None.',
      academicHeadRemarks: 'Top performer.', recommendations: 'None.',
      status: 'Excellent', reviewedDate: '2026-07-15'
    }
  ];

  constructor(private academicHeadService: AcademicHeadService) { }

  getPerformanceReviews(): Observable<PerformanceReview[]> {
    const deptId = this.academicHeadService.getDepartmentId();
    return of(this.mockReviews).pipe(
      map(reviews => reviews.filter(r => r.departmentId === deptId))
    );
  }

  addReview(review: PerformanceReview): Observable<boolean> {
    review.id = 'P' + Math.floor(Math.random() * 1000);
    review.departmentId = this.academicHeadService.getDepartmentId();
    this.mockReviews.push(review);
    return of(true);
  }
}
