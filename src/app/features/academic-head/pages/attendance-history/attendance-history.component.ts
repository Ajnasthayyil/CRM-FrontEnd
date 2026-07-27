import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { AttendanceRecord } from '../../models/attendance.model';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../models/teacher.model';

@Component({
  selector: 'app-attendance-history',
  templateUrl: './attendance-history.component.html',
  styleUrls: ['./attendance-history.component.scss']
})
export class AttendanceHistoryComponent implements OnInit {
  teacherAttendance: AttendanceRecord[] = [];
  teachers: Teacher[] = [];
  teacherCharts: any[] = [];

  constructor(
    private attendanceService: AttendanceService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.attendanceService.getTeacherAttendanceHistory().subscribe(data => this.teacherAttendance = data);
    this.teacherService.getTeachers().subscribe(data => {
      this.teachers = data;
      this.teacherCharts = this.teachers.map(t => ({
        teacher: t,
        chartOptions: {
          series: [
            t.attendanceSummary?.present || 0,
            t.attendanceSummary?.leave || 0,
            t.attendanceSummary?.absent || 0
          ],
          chart: { type: 'donut', height: 120, width: 120 },
          labels: ['Present', 'Leave', 'Absent'],
          colors: ['#10b981', '#f59e0b', '#ef4444'],
          dataLabels: { enabled: false },
          legend: { show: false }
        }
      }));
    });
  }
}
