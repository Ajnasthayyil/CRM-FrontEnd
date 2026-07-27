import { Injectable } from '@angular/core';
import { AcademicHeadService } from './academic-head.service';
import { AttendanceRecord } from '../models/attendance.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private mockAttendance: AttendanceRecord[] = [
    { id: 'A001', date: '2026-07-27', userId: 'T101', userName: 'John Mathew', userType: 'Teacher', departmentId: 3, status: 'Present', markedBy: 'System', detailInfo: 'Data Structures' },
    { id: 'A002', date: '2026-07-27', userId: 'T102', userName: 'Anjali Thomas', userType: 'Teacher', departmentId: 3, status: 'Present', markedBy: 'System', detailInfo: 'Database Systems' },
    { id: 'A003', date: '2026-07-27', userId: 'T103', userName: 'Rahul Kumar', userType: 'Teacher', departmentId: 3, status: 'Late', markedBy: 'System', detailInfo: 'Operating Systems' },
    { id: 'A004', date: '2026-07-27', userId: 'T201', userName: 'Sara Joseph', userType: 'Teacher', departmentId: 4, status: 'Leave', markedBy: 'System', detailInfo: 'Accounting' },
    
    { id: 'A101', date: '2026-07-27', userId: 'S001', userName: 'Arun Patel', userType: 'Student', departmentId: 3, status: 'Present', markedBy: 'John Mathew', detailInfo: 'B.Tech CS / 2024' },
    { id: 'A102', date: '2026-07-27', userId: 'S002', userName: 'Priya Sharma', userType: 'Student', departmentId: 3, status: 'Absent', markedBy: 'John Mathew', detailInfo: 'B.Tech CS / 2024' },
    { id: 'A103', date: '2026-07-27', userId: 'S003', userName: 'Vikram Singh', userType: 'Student', departmentId: 3, status: 'Late', markedBy: 'Anjali Thomas', detailInfo: 'B.Tech CS / 2025' },
    { id: 'A104', date: '2026-07-27', userId: 'S101', userName: 'Anita Desai', userType: 'Student', departmentId: 4, status: 'Present', markedBy: 'Sara Joseph', detailInfo: 'B.Com / 2024' }
  ];

  constructor(private academicHeadService: AcademicHeadService) { }

  getTeacherAttendanceHistory(): Observable<AttendanceRecord[]> {
    const deptId = this.academicHeadService.getDepartmentId();
    return of(this.mockAttendance).pipe(
      map(records => records.filter(r => r.departmentId === deptId && r.userType === 'Teacher'))
    );
  }

  getStudentAttendanceHistory(): Observable<AttendanceRecord[]> {
    const deptId = this.academicHeadService.getDepartmentId();
    return of(this.mockAttendance).pipe(
      map(records => records.filter(r => r.departmentId === deptId && r.userType === 'Student'))
    );
  }
}
