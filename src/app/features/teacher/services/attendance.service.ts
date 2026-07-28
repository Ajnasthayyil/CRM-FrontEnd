import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AttendanceRecord } from '../models/attendance.model';
import { TeacherAuthService } from './teacher-auth.service';
import { mockAttendance } from '../mock-data/attendance.data';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private attendanceRecords: AttendanceRecord[] = mockAttendance as AttendanceRecord[];

  constructor(private authService: TeacherAuthService) {}

  getAttendanceByDate(date: string, classId: string): Observable<AttendanceRecord[]> {
    const teacher = this.authService.currentTeacher;
    if (!teacher) return of([]);
    
    const filtered = this.attendanceRecords.filter(a => 
      a.departmentId === teacher.departmentId && 
      a.teacherId === teacher.teacherId &&
      a.date === date &&
      a.classId === classId
    );
    return of(filtered).pipe(delay(300));
  }
}
