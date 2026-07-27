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

  attendanceChartOptions: any;
  performanceChartOptions: any;

  constructor(
    private attendanceService: AttendanceService,
    private performanceService: PerformanceService
  ) {}

  ngOnInit(): void {
    this.attendanceService.getTeacherAttendanceHistory().subscribe(data => this.teacherAttendance = data);
    this.attendanceService.getStudentAttendanceHistory().subscribe(data => this.studentAttendance = data);
    this.performanceService.getPerformanceReviews().subscribe(data => this.performanceReviews = data);

    this.initCharts();
  }

  initCharts() {
    this.attendanceChartOptions = {
      series: [85, 10, 5],
      chart: { type: 'donut', height: 250 },
      labels: ['Present', 'Leave', 'Absent'],
      colors: ['#2563eb', '#f59e0b', '#ef4444']
    };

    this.performanceChartOptions = {
      series: [{ name: 'Teachers', data: [12, 18, 5, 2] }],
      chart: { type: 'bar', height: 250 },
      xaxis: { categories: ['Excellent', 'Good', 'Needs Improvement', 'Unsatisfactory'] },
      colors: ['#8b5cf6']
    };
  }

  exportReport() {
    alert('Exporting report as PDF... (Simulated)');
  }
}
