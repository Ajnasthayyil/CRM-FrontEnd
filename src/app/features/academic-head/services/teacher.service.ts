import { Injectable } from '@angular/core';
import { AcademicHeadService } from './academic-head.service';
import { Teacher } from '../models/teacher.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private mockTeachers: Teacher[] = [
    {
      id: 'T101', name: 'John Mathew', departmentId: 3, email: 'john.m@cs.EduNexa.com', phone: '+1234567890',
      subject: 'Data Structures', designation: 'Senior Lecturer', joiningDate: '2020-01-15', gender: 'Male', dob: '1985-06-15',
      qualification: 'Ph.D. in Computer Science', experience: '10 Years', attendanceStatus: 'Present', performanceStatus: 'Excellent',
      status: 'Active', photoUrl: '', attendanceSummary: { present: 180, absent: 5, leave: 10, late: 2, percentage: 95 }
    },
    {
      id: 'T102', name: 'Anjali Thomas', departmentId: 3, email: 'anjali.t@cs.EduNexa.com', phone: '+1987654321',
      subject: 'Database Systems', designation: 'Lecturer', joiningDate: '2021-08-01', gender: 'Female', dob: '1990-03-22',
      qualification: 'M.Tech in IT', experience: '5 Years', attendanceStatus: 'Present', performanceStatus: 'Good',
      status: 'Active', photoUrl: '', attendanceSummary: { present: 175, absent: 10, leave: 10, late: 5, percentage: 90 }
    },
    {
      id: 'T103', name: 'Rahul Kumar', departmentId: 3, email: 'rahul.k@cs.EduNexa.com', phone: '+1122334455',
      subject: 'Operating Systems', designation: 'Assistant Professor', joiningDate: '2019-05-10', gender: 'Male', dob: '1982-11-05',
      qualification: 'Ph.D. in Computer Science', experience: '12 Years', attendanceStatus: 'Late', performanceStatus: 'Very Good',
      status: 'Active', photoUrl: '', attendanceSummary: { present: 185, absent: 2, leave: 8, late: 10, percentage: 96 }
    },
    {
      id: 'T201', name: 'Sara Joseph', departmentId: 4, email: 'sara.j@com.EduNexa.com', phone: '+1555666777',
      subject: 'Accounting', designation: 'Professor', joiningDate: '2018-07-20', gender: 'Female', dob: '1978-09-12',
      qualification: 'Ph.D. in Commerce', experience: '15 Years', attendanceStatus: 'Leave', performanceStatus: 'Excellent',
      status: 'Active', photoUrl: '', attendanceSummary: { present: 190, absent: 0, leave: 5, late: 0, percentage: 98 }
    }
  ];

  constructor(private academicHeadService: AcademicHeadService) { }

  getTeachers(): Observable<Teacher[]> {
    const deptId = this.academicHeadService.getDepartmentId();
    return of(this.mockTeachers).pipe(
      map(teachers => teachers.filter(t => t.departmentId === deptId))
    );
  }

  getTeacherById(id: string): Observable<Teacher | undefined> {
    const deptId = this.academicHeadService.getDepartmentId();
    return of(this.mockTeachers.find(t => t.id === id && t.departmentId === deptId));
  }
}
