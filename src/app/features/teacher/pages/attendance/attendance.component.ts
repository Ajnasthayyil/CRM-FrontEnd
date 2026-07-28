import { Component, OnInit } from '@angular/core';
import { AttendanceRecord } from '../../models/attendance.model';
import { AttendanceService } from '../../services/attendance.service';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { ClassService } from '../../services/class.service';
import { ClassInfo } from '../../models/class.model';

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
        this.isLoading = false;
      });
    });
  }

  markAll(status: 'Present' | 'Absent' | 'Late' | 'Leave') {
    this.attendanceRecords.forEach(r => r.status = status);
  }

  saveAttendance() {
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      // Show toast
      alert('Attendance saved successfully');
    }, 500);
  }
}
