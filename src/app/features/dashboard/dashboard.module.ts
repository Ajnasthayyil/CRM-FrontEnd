import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { RoleDashboardComponent } from './pages/role-dashboard/role-dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    DashboardHomeComponent,
    RoleDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    NgApexchartsModule
  ]
})
export class DashboardModule { }
