import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { PerformanceService } from '../../services/performance.service';
import { AttendanceRecord } from '../../models/attendance.model';
import { PerformanceReview } from '../../models/performance.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  activeTab = 'attendance';
  
  teacherAttendance: AttendanceRecord[] = [];
  studentAttendance: AttendanceRecord[] = [];
  performanceReviews: PerformanceReview[] = [];

  constructor(
    private attendanceService: AttendanceService,
    private performanceService: PerformanceService
  ) {}

  ngOnInit(): void {
    this.attendanceService.getTeacherAttendanceHistory().subscribe(data => this.teacherAttendance = data);
    this.attendanceService.getStudentAttendanceHistory().subscribe(data => this.studentAttendance = data);
    this.performanceService.getPerformanceReviews().subscribe(data => this.performanceReviews = data);
  }

  exportReport() {
    alert('Exporting report as PDF... (Simulated)');
  }
}
