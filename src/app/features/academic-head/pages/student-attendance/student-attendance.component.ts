import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss']
})
export class StudentAttendanceComponent implements OnInit {
  students: Student[] = [];
  today: string = new Date().toISOString().split('T')[0];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data.map(s => ({...s, currentMark: 'Present'}));
    });
  }

  submitAttendance() {
    alert('Student attendance submitted successfully! (Simulated)');
  }
}
