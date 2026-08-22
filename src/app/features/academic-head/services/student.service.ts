import { Injectable } from '@angular/core';
import { AcademicHeadService } from './academic-head.service';
import { Student } from '../models/student.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private mockStudents: Student[] = [
    {
      id: 'S001', name: 'Arun Patel', departmentId: 3, email: 'arun@student.EduNexa.com', phone: '9000000001',
      className: 'B.Tech CS', batch: '2024', semester: 'S5', section: 'A', attendanceStatus: 'Present',
      photoUrl: '', attendanceSummary: { totalClasses: 200, present: 180, absent: 10, leave: 10, percentage: 90 }
    },
    {
      id: 'S002', name: 'Priya Sharma', departmentId: 3, email: 'priya@student.EduNexa.com', phone: '9000000002',
      className: 'B.Tech CS', batch: '2024', semester: 'S5', section: 'A', attendanceStatus: 'Absent',
      photoUrl: '', attendanceSummary: { totalClasses: 200, present: 190, absent: 5, leave: 5, percentage: 95 }
    },
    {
      id: 'S003', name: 'Vikram Singh', departmentId: 3, email: 'vikram@student.EduNexa.com', phone: '9000000003',
      className: 'B.Tech CS', batch: '2025', semester: 'S3', section: 'B', attendanceStatus: 'Late',
      photoUrl: '', attendanceSummary: { totalClasses: 200, present: 170, absent: 20, leave: 10, percentage: 85 }
    },
    {
      id: 'S101', name: 'Anita Desai', departmentId: 4, email: 'anita@student.EduNexa.com', phone: '9000000101',
      className: 'B.Com', batch: '2024', semester: 'S5', section: 'A', attendanceStatus: 'Present',
      photoUrl: '', attendanceSummary: { totalClasses: 200, present: 195, absent: 2, leave: 3, percentage: 97.5 }
    }
  ];

  constructor(private academicHeadService: AcademicHeadService) { }

  getStudents(): Observable<Student[]> {
    const deptId = this.academicHeadService.getDepartmentId();
    return of(this.mockStudents).pipe(
      map(students => students.filter(s => s.departmentId === deptId))
    );
  }

  getStudentById(id: string): Observable<Student | undefined> {
    const deptId = this.academicHeadService.getDepartmentId();
    return of(this.mockStudents.find(s => s.id === id && s.departmentId === deptId));
  }
}
