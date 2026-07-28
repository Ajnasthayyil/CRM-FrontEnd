import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ClassInfo, Session } from '../models/class.model';
import { TeacherAuthService } from './teacher-auth.service';

import { mockClasses } from '../mock-data/classes.data';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private classes: ClassInfo[] = mockClasses as ClassInfo[];

  constructor(private authService: TeacherAuthService) {}

  getClasses(): Observable<ClassInfo[]> {
    const teacher = this.authService.currentTeacher;
    if (!teacher) return of([]);
    
    // Filter by logged-in teacher's department and teacherId
    const filtered = this.classes.filter(c => c.departmentId === teacher.departmentId && c.teacherId === teacher.teacherId);
    return of(filtered).pipe(delay(300));
  }

  addClass(classInfo: ClassInfo): Observable<ClassInfo | undefined> {
    const teacher = this.authService.currentTeacher;
    if (!teacher) return of(undefined);

    classInfo.id = 'CLS-' + Math.floor(Math.random() * 10000);
    classInfo.departmentId = teacher.departmentId;
    classInfo.teacherId = teacher.teacherId;
    classInfo.subject = teacher.departmentId === 2 ? 'Mathematics' : 'Computer Science';
    classInfo.subjectId = teacher.departmentId === 2 ? 'SUB-MATH' : 'SUB-CS';
    
    // some default fields
    classInfo.totalStudents = 0;

    this.classes.push(classInfo);
    return of(classInfo).pipe(delay(300));
  }

  updateClass(id: string, updates: Partial<ClassInfo>): Observable<ClassInfo | undefined> {
    const teacher = this.authService.currentTeacher;
    if (!teacher) return of(undefined);

    const index = this.classes.findIndex(c => c.id === id && c.departmentId === teacher.departmentId);
    if (index !== -1) {
      this.classes[index] = { ...this.classes[index], ...updates };
      return of(this.classes[index]).pipe(delay(300));
    }
    return of(undefined);
  }

  deleteClass(id: string): Observable<boolean> {
    const teacher = this.authService.currentTeacher;
    if (!teacher) return of(false);

    const index = this.classes.findIndex(c => c.id === id && c.departmentId === teacher.departmentId);
    if (index !== -1) {
      this.classes.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false);
  }
}
