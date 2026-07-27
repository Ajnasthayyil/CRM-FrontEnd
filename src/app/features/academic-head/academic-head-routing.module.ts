import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'teachers/:id', component: TeacherDetailsComponent },
  { path: 'teacher-performance', component: TeacherPerformanceComponent },
  { path: 'add-performance', component: AddPerformanceComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'students/:id', component: StudentDetailsComponent },
  { path: 'teacher-attendance', component: TeacherAttendanceComponent },
  { path: 'student-attendance', component: StudentAttendanceComponent },
  { path: 'attendance-history', component: AttendanceHistoryComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicHeadRoutingModule { }
