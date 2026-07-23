import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';



@NgModule({
  declarations: [
    AuthLayoutComponent,
    DashboardLayoutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutsModule { }
