import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'all', component: EmployeeListComponent },
  { path: 'teachers', component: EmployeeListComponent },
  { path: 'non-teaching', component: EmployeeListComponent },
  { path: 'add', component: EmployeeFormComponent },
  { path: ':id', component: EmployeeDetailsComponent },
  { path: ':id/edit', component: EmployeeFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
