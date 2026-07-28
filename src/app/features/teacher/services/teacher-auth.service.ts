import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherAuthService {
  // Using the hardcoded user per instructions
  private currentTeacherSubject = new BehaviorSubject<Teacher | null>({
    teacherId: 102,
    teacherName: 'Anjali Thomas',
    role: 'Teacher',
    departmentId: 2,
    departmentName: 'Mathematics',
    email: 'anjali.thomas@school.edu',
    phone: '+91 9876543210',
    subjects: ['Mathematics', 'Advanced Calculus']
  });

  public currentTeacher$ = this.currentTeacherSubject.asObservable();

  public get currentTeacher(): Teacher | null {
    return this.currentTeacherSubject.value;
  }
}
