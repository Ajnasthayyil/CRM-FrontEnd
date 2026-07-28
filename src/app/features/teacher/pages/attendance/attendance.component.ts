import { Component, OnInit } from '@angular/core';
import { AttendanceRecord } from '../../models/attendance.model';
import { AttendanceService } from '../../services/attendance.service';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { ClassService } from '../../services/class.service';
import { ClassInfo } from '../../models/class.model';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexLegend,
  ApexTheme,
  ApexTitleSubtitle
} from 'ng-apexcharts';

export type AttendanceChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  theme: ApexTheme;
  title: ApexTitleSubtitle;
  colors: string[];
};

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  classes: ClassInfo[] = [];
  selectedClassId: string = '10A';
  selectedDate: Date = new Date(); // Today
  
  students: Student[] = [];
  attendanceRecords: AttendanceRecord[] = [];
  isLoading = true;
  isSaving = false;

  public chartOptions: Partial<AttendanceChartOptions> | any = {};
  public showChart = false;

  constructor(
    private attendanceService: AttendanceService,
    private studentService: StudentService,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.classService.getClasses().subscribe(classes => {
      this.classes = classes;
      if (this.classes.length > 0) {
        this.selectedClassId = this.classes[0].id;
      }
      this.loadAttendanceData();
    });
  }

  onClassChange() {
    this.loadAttendanceData();
  }

  loadAttendanceData() {
    this.isLoading = true;
    
    // In a real app we'd fetch students for this class, and join with attendance.
    // For this mock, let's just get the students and randomly assign present.
    this.studentService.getStudents().subscribe(students => {
      this.students = students.filter(s => s.classId === this.selectedClassId);
      
      const dateString = this.selectedDate.toISOString().split('T')[0];
      this.attendanceService.getAttendanceByDate(dateString, this.selectedClassId).subscribe(records => {
        this.attendanceRecords = this.students.map(student => {
          const existingRecord = records.find(r => r.studentId === student.studentId);
          return existingRecord || {
            id: `ATT-NEW-${student.studentId}`,
            studentId: student.studentId,
            studentName: student.studentName,
            rollNumber: student.rollNumber,
            date: dateString,
            classId: this.selectedClassId,
            section: student.section,
            subjectId: 'SUB-MATH',
            status: 'Present',
            departmentId: student.departmentId,
            teacherId: 102
          } as AttendanceRecord;
        });
        this.updateChart();
        this.isLoading = false;
      });
    });
  }

  updateChart() {
    if (!this.attendanceRecords || this.attendanceRecords.length === 0) {
      this.showChart = false;
      return;
    }

    let present = 0, absent = 0, late = 0, leave = 0;
    this.attendanceRecords.forEach(r => {
      if (r.status === 'Present') present++;
      else if (r.status === 'Absent') absent++;
      else if (r.status === 'Late') late++;
      else if (r.status === 'Leave') leave++;
    });

    this.chartOptions = {
      series: [present, absent, late, leave],
      chart: {
        type: 'donut',
        height: 320,
        background: 'transparent'
      },
      labels: ['Present', 'Absent', 'Late', 'Leave'],
      colors: ['#10b981', '#ef4444', '#f59e0b', '#3b82f6'],
      legend: {
        position: 'bottom'
      },
      title: {
        text: 'Attendance Summary',
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--text-main)'
        }
      },
      theme: {
        mode: 'light'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 250
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
    this.showChart = true;
  }

  markAll(status: 'Present' | 'Absent' | 'Late' | 'Leave') {
    this.attendanceRecords.forEach(r => r.status = status);
    this.updateChart();
  }

  saveAttendance() {
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      // Show toast
      alert('Attendance saved successfully');
    }, 500);
  }

  updateStatus(record: AttendanceRecord, status: 'Present' | 'Absent' | 'Late' | 'Leave') {
    record.status = status;
    this.updateChart();
  }
}
