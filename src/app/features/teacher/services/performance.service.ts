import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PerformanceRecord } from '../models/performance.model';
import { TeacherAuthService } from './teacher-auth.service';

import { mockPerformance } from '../mock-data/performance.data';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private records: PerformanceRecord[] = mockPerformance as PerformanceRecord[];

  constructor(private authService: TeacherAuthService) {}

  getPerformanceRecords(): Observable<PerformanceRecord[]> {
    const teacher = this.authService.currentTeacher;
    if (!teacher) return of([]);
    
    const filtered = this.records.filter(p => p.departmentId === teacher.departmentId && p.teacherId === teacher.teacherId);
    return of(filtered).pipe(delay(300));
  }
}
