import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Assignment, AssignmentSubmission } from '../models/assignment.model';
import { TeacherAuthService } from './teacher-auth.service';

import { mockAssignments } from '../mock-data/assignments.data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private assignments: Assignment[] = mockAssignments as Assignment[];

  constructor(private authService: TeacherAuthService) {}

  getAssignments(): Observable<Assignment[]> {
    const teacher = this.authService.currentTeacher;
    if (!teacher) return of([]);
    
    const filtered = this.assignments.filter(a => a.departmentId === teacher.departmentId && a.teacherId === teacher.teacherId);
    return of(filtered).pipe(delay(300));
  }

  addAssignment(assignment: Assignment): Observable<Assignment | undefined> {
    const teacher = this.authService.currentTeacher;
    if (!teacher) return of(undefined);

    assignment.id = 'ASN-' + Math.floor(Math.random() * 10000);
    assignment.departmentId = teacher.departmentId;
    assignment.teacherId = teacher.teacherId;
    assignment.subject = teacher.departmentId === 2 ? 'Mathematics' : 'Computer Science'; // mock
    assignment.subjectId = teacher.departmentId === 2 ? 'SUB-MATH' : 'SUB-CS';

    this.assignments.push(assignment);
    return of(assignment).pipe(delay(300));
  }

  updateAssignment(id: string, updates: Partial<Assignment>): Observable<Assignment | undefined> {
    const teacher = this.authService.currentTeacher;
    if (!teacher) return of(undefined);

    const index = this.assignments.findIndex(a => a.id === id && a.departmentId === teacher.departmentId);
    if (index !== -1) {
      this.assignments[index] = { ...this.assignments[index], ...updates };
      return of(this.assignments[index]).pipe(delay(300));
    }
    return of(undefined);
  }

  deleteAssignment(id: string): Observable<boolean> {
    const teacher = this.authService.currentTeacher;
    if (!teacher) return of(false);

    const index = this.assignments.findIndex(a => a.id === id && a.departmentId === teacher.departmentId);
    if (index !== -1) {
      this.assignments.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false);
  }

  getSubmissions(assignmentId: string): Observable<AssignmentSubmission[]> {
    // Generate some mock submissions based on the assignment ID
    const submissions: AssignmentSubmission[] = [
      {
        id: 'SUB-101',
        assignmentId,
        studentId: 'STU-001',
        studentName: 'John Doe',
        submittedDate: new Date().toISOString(),
        status: 'Submitted',
        score: 85,
        feedback: 'Good work.'
      },
      {
        id: 'SUB-102',
        assignmentId,
        studentId: 'STU-002',
        studentName: 'Jane Smith',
        submittedDate: new Date().toISOString(),
        status: 'Pending'
      },
      {
        id: 'SUB-103',
        assignmentId,
        studentId: 'STU-003',
        studentName: 'Alice Johnson',
        submittedDate: new Date(Date.now() - 86400000).toISOString(),
        status: 'Reviewed',
        score: 95,
        feedback: 'Excellent explanation.'
      },
      {
        id: 'SUB-104',
        assignmentId,
        studentId: 'STU-004',
        studentName: 'Bob Williams',
        submittedDate: new Date(Date.now() + 86400000).toISOString(),
        status: 'Late',
        score: 70
      }
    ];
    return of(submissions).pipe(delay(500));
  }
}
