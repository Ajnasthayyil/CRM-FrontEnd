import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { RoleDashboardComponent } from './pages/role-dashboard/role-dashboard.component';



@NgModule({
  declarations: [
    DashboardHomeComponent,
    RoleDashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
