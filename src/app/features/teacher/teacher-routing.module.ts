import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentsComponent } from './pages/students/students.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { AssignmentsComponent } from './pages/assignments/assignments.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { PerformanceComponent } from './pages/performance/performance.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'assignments', component: AssignmentsComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'performance', component: PerformanceComponent },
  { path: 'calendar', component: PlaceholderComponent },
  { path: 'announcements', component: PlaceholderComponent },
  { path: 'materials', component: PlaceholderComponent },
  { path: 'reports', component: PlaceholderComponent },
  { path: 'profile', component: PlaceholderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
