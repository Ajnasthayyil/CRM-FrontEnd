import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';
import { AttendanceService } from '../../services/attendance.service';
import { PerformanceService } from '../../services/performance.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats = {
    totalTeachers: 0,
    activeTeachers: 0,
    totalStudents: 0,
    activeStudents: 0,
    todayTeacherAttendance: '0%',
    todayStudentAttendance: '0%',
    teachersOnLeave: 0,
    pendingReviews: 0
  };

  recentActivities = [
    { title: 'Teacher attendance marked', time: '10 mins ago', type: 'attendance' },
    { title: 'Student attendance marked', time: '1 hour ago', type: 'attendance' },
    { title: 'Teacher performance added', time: '3 hours ago', type: 'performance' },
    { title: 'Student record updated', time: '1 day ago', type: 'student' }
  ];

  teacherAttendanceChartOptions: any;
  studentAttendanceChartOptions: any;
  performanceChartOptions: any;
  studentPerformanceChartOptions: any;
  trendChartOptions: any;

  constructor(
    private teacherService: TeacherService,
    private studentService: StudentService,
    private attendanceService: AttendanceService,
    private performanceService: PerformanceService
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.initCharts();
  }

  loadStats() {
    this.teacherService.getTeachers().subscribe(t => {
      this.stats.totalTeachers = t.length;
      this.stats.activeTeachers = t.filter(x => x.status === 'Active').length;
      this.stats.teachersOnLeave = t.filter(x => x.attendanceStatus === 'Leave').length;
      const present = t.filter(x => x.attendanceStatus === 'Present').length;
      this.stats.todayTeacherAttendance = (t.length > 0 ? Math.round((present / t.length) * 100) : 0) + '%';
    });

    this.studentService.getStudents().subscribe(s => {
      this.stats.totalStudents = s.length;
      this.stats.activeStudents = s.length; // Assuming all returned are active
      const present = s.filter(x => x.attendanceStatus === 'Present').length;
      this.stats.todayStudentAttendance = (s.length > 0 ? Math.round((present / s.length) * 100) : 0) + '%';
    });
  }

  initCharts() {
    this.teacherAttendanceChartOptions = {
      series: [85, 10, 5],
      chart: { type: 'donut', height: 250 },
      labels: ['Present', 'Leave', 'Absent'],
      colors: ['#2563eb', '#f59e0b', '#ef4444']
    };

    this.studentAttendanceChartOptions = {
      series: [90, 5, 5],
      chart: { type: 'donut', height: 250 },
      labels: ['Present', 'Leave', 'Absent'],
      colors: ['#10b981', '#f59e0b', '#ef4444']
    };

    this.performanceChartOptions = {
      series: [{ name: 'Teachers', data: [12, 18, 5, 2] }],
      chart: { type: 'bar', height: 250 },
      xaxis: { categories: ['Excellent', 'Good', 'Average', 'Poor'] },
      colors: ['#8b5cf6']
    };

    this.studentPerformanceChartOptions = {
      series: [{ name: 'Students', data: [45, 60, 20, 5] }],
      chart: { type: 'bar', height: 250 },
      xaxis: { categories: ['A Grade', 'B Grade', 'C Grade', 'Fail'] },
      colors: ['#3b82f6']
    };

    this.trendChartOptions = {
      series: [{ name: 'Attendance %', data: [88, 91, 95, 93, 97, 96] }],
      chart: { type: 'line', height: 250 },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
      colors: ['#2563eb']
    };
  }
}
