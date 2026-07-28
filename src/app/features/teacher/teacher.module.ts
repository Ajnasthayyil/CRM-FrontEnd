import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeacherRoutingModule } from './teacher-routing.module';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

// Charts
import { NgApexchartsModule } from 'ng-apexcharts';

// Layout Components
import { TeacherLayoutComponent } from './layouts/teacher-layout/teacher-layout.component';
import { TeacherSidebarComponent } from './components/teacher-sidebar/teacher-sidebar.component';
import { TeacherHeaderComponent } from './components/teacher-header/teacher-header.component';

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

@NgModule({
  declarations: [
    TeacherLayoutComponent,
    TeacherSidebarComponent,
    TeacherHeaderComponent,
    DashboardComponent,
    StudentsComponent,
    ClassesComponent,
    AssignmentsComponent,
    AttendanceComponent,
    PerformanceComponent,
    PlaceholderComponent,
    EditStudentDialogComponent,
    AssignmentDialogComponent,
    ClassDialogComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatTooltipModule,
    NgApexchartsModule
  ]
})
export class TeacherModule { }
