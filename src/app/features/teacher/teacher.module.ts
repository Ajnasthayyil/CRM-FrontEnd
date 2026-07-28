import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeacherRoutingModule } from './teacher-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

// Charts
import { NgApexchartsModule } from 'ng-apexcharts';


// Page Components
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentsComponent } from './pages/students/students.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { AssignmentsComponent } from './pages/assignments/assignments.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { PerformanceComponent } from './pages/performance/performance.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { EditStudentDialogComponent } from './pages/students/edit-student-dialog/edit-student-dialog.component';
import { AssignmentDialogComponent } from './pages/assignments/assignment-dialog/assignment-dialog.component';
import { ClassDialogComponent } from './pages/classes/class-dialog/class-dialog.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ViewAssignmentDialogComponent } from './pages/assignments/view-assignment-dialog/view-assignment-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StudentsComponent,
    ClassesComponent,
    AssignmentsComponent,
    AttendanceComponent,
    PerformanceComponent,
    PlaceholderComponent,
    EditStudentDialogComponent,
    AssignmentDialogComponent,
    ClassDialogComponent,
    CalendarComponent,
    ViewAssignmentDialogComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    NgApexchartsModule
  ]
})
export class TeacherModule { }
