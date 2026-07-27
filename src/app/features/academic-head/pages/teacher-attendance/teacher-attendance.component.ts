import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../models/teacher.model';

@Component({
  selector: 'app-teacher-attendance',
  templateUrl: './teacher-attendance.component.html',
  styleUrls: ['./teacher-attendance.component.scss']
})
export class TeacherAttendanceComponent implements OnInit {
  teachers: Teacher[] = [];
  today: string = new Date().toISOString().split('T')[0];

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe(data => {
      this.teachers = data.map(t => ({...t, currentMark: 'Present'}));
    });
  }

  submitAttendance() {
    alert('Teacher attendance submitted successfully! (Simulated)');
  }
}
