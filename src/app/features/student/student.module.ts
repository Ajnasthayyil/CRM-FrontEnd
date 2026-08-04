import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentAttendanceComponent } from './pages/student-attendance/student-attendance.component';
import { StudentAssignmentsComponent } from './pages/student-assignments/student-assignments.component';
import { StudentPerformanceComponent } from './pages/student-performance/student-performance.component';
import { StudentTimetableComponent } from './pages/student-timetable/student-timetable.component';
import { StudentMaterialsComponent } from './pages/student-materials/student-materials.component';
import { StudentFeesComponent } from './pages/student-fees/student-fees.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';


@NgModule({
  declarations: [
    StudentAttendanceComponent,
    StudentAssignmentsComponent,
    StudentPerformanceComponent,
    StudentTimetableComponent,
    StudentMaterialsComponent,
    StudentFeesComponent,
    StudentProfileComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
