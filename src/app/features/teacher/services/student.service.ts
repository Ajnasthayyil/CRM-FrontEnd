import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Student } from '../models/student.model';
import { TeacherAuthService } from './teacher-auth.service';

import { mockStudents } from '../mock-data/students.data';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = mockStudents as Student[];

  constructor(private authService: TeacherAuthService) {}

  getStudents(): Observable<Student[]> {
    const teacher = this.authService.currentTeacher;
    if (!teacher) return of([]);
    
    // Filter by logged-in teacher's department
    const filtered = this.students.filter(s => s.departmentId === teacher.departmentId);
    return of(filtered).pipe(delay(300)); // simulate network delay
  }

  getStudentById(id: string): Observable<Student | undefined> {
    const teacher = this.authService.currentTeacher;
    if (!teacher) return of(undefined);
    
    const student = this.students.find(s => s.studentId === id && s.departmentId === teacher.departmentId);
    return of(student).pipe(delay(200));
  }

  updateStudent(id: string, updates: Partial<Student>): Observable<Student | undefined> {
    const teacher = this.authService.currentTeacher;
    if (!teacher) return of(undefined);

    const index = this.students.findIndex(s => s.studentId === id && s.departmentId === teacher.departmentId);
    if (index !== -1) {
      this.students[index] = { ...this.students[index], ...updates };
      return of(this.students[index]).pipe(delay(300));
    }
    return of(undefined);
  }

  blockStudent(id: string, block: boolean): Observable<boolean> {
    const teacher = this.authService.currentTeacher;
    if (!teacher) return of(false);
    
    const index = this.students.findIndex(s => s.studentId === id && s.departmentId === teacher.departmentId);
    if (index !== -1) {
      this.students[index].status = block ? 'Blocked' : 'Active';
      return of(true).pipe(delay(300));
    }
    return of(false);
  }
}
