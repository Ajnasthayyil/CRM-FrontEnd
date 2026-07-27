import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

import { AcademicHeadRoutingModule } from './academic-head-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { TeacherDetailsComponent } from './pages/teacher-details/teacher-details.component';
import { TeacherPerformanceComponent } from './pages/teacher-performance/teacher-performance.component';
import { AddPerformanceComponent } from './pages/add-performance/add-performance.component';
import { StudentsComponent } from './pages/students/students.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';
import { TeacherAttendanceComponent } from './pages/teacher-attendance/teacher-attendance.component';
import { StudentAttendanceComponent } from './pages/student-attendance/student-attendance.component';
import { AttendanceHistoryComponent } from './pages/attendance-history/attendance-history.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { DepartmentHeaderComponent } from './components/department-header/department-header.component';
import { StatisticsCardComponent } from './components/statistics-card/statistics-card.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TeachersComponent,
    TeacherDetailsComponent,
    TeacherPerformanceComponent,
    AddPerformanceComponent,
    StudentsComponent,
    StudentDetailsComponent,
    TeacherAttendanceComponent,
    StudentAttendanceComponent,
    AttendanceHistoryComponent,
    ReportsComponent,
    DepartmentHeaderComponent,
    StatisticsCardComponent
  ],
  imports: [
    CommonModule,
    AcademicHeadRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule
  ]
})
export class AcademicHeadModule { }
