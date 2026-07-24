import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesHomeComponent } from './pages/employees-home/employees-home.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';


@NgModule({
  declarations: [
    EmployeesHomeComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    EmployeeFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
