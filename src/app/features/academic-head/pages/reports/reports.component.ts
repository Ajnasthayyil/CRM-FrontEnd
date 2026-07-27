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

  selectedTeacher = 'All';
  selectedStudent = 'All';
  uniqueTeachers: string[] = [];
  uniqueStudents: string[] = [];

  teacherChartOptions: any;
  studentChartOptions: any;
  performanceChartOptions: any;

  constructor(
    private attendanceService: AttendanceService,
    private performanceService: PerformanceService
  ) {}

  ngOnInit(): void {
    this.attendanceService.getTeacherAttendanceHistory().subscribe(data => {
      this.teacherAttendance = data;
      this.uniqueTeachers = Array.from(new Set(data.map(d => d.userName)));
      this.updateTeacherChart();
    });
    this.attendanceService.getStudentAttendanceHistory().subscribe(data => {
      this.studentAttendance = data;
      this.uniqueStudents = Array.from(new Set(data.map(d => d.userName)));
      this.updateStudentChart();
    });
    this.performanceService.getPerformanceReviews().subscribe(data => this.performanceReviews = data);

    this.initCharts();
  }

  get filteredTeacherAttendance() {
    if (this.selectedTeacher === 'All') return this.teacherAttendance;
    return this.teacherAttendance.filter(a => a.userName === this.selectedTeacher);
  }

  get filteredStudentAttendance() {
    if (this.selectedStudent === 'All') return this.studentAttendance;
    return this.studentAttendance.filter(a => a.userName === this.selectedStudent);
  }

  updateTeacherChart() {
    const data = this.filteredTeacherAttendance;
    const present = data.filter(a => a.status === 'Present').length;
    const leave = data.filter(a => a.status === 'Leave').length;
    const absent = data.filter(a => a.status === 'Absent' || a.status === 'Late' || a.status === 'Half Day').length;
    this.teacherChartOptions = {
      series: [present, leave, absent],
      chart: { type: 'donut', height: 250 },
      labels: ['Present', 'Leave', 'Absent/Late'],
      colors: ['#2563eb', '#f59e0b', '#ef4444']
    };
  }

  updateStudentChart() {
    const data = this.filteredStudentAttendance;
    const present = data.filter(a => a.status === 'Present').length;
    const leave = data.filter(a => a.status === 'Leave').length;
    const absent = data.filter(a => a.status === 'Absent' || a.status === 'Late').length;
    this.studentChartOptions = {
      series: [present, leave, absent],
      chart: { type: 'donut', height: 250 },
      labels: ['Present', 'Leave', 'Absent/Late'],
      colors: ['#10b981', '#f59e0b', '#ef4444']
    };
  }

  initCharts() {

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
