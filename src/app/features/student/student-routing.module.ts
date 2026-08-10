import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAttendanceComponent } from './pages/student-attendance/student-attendance.component';
import { StudentAssignmentsComponent } from './pages/student-assignments/student-assignments.component';
import { StudentPerformanceComponent } from './pages/student-performance/student-performance.component';
import { StudentTimetableComponent } from './pages/student-timetable/student-timetable.component';
import { StudentMaterialsComponent } from './pages/student-materials/student-materials.component';
import { StudentFeesComponent } from './pages/student-fees/student-fees.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: StudentDashboardComponent },
  { path: 'attendance', component: StudentAttendanceComponent },
  { path: 'assignments', component: StudentAssignmentsComponent },
  { path: 'performance', component: StudentPerformanceComponent },
  { path: 'timetable', component: StudentTimetableComponent },
  { path: 'materials', component: StudentMaterialsComponent },
  { path: 'fees', component: StudentFeesComponent },
  { path: 'profile', component: StudentProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
