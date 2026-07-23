import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayoutComponent } from './layouts/dashboard/dashboard-layout/dashboard-layout.component';
import { DashboardHomeComponent } from './features/dashboard/pages/dashboard-home/dashboard-home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { OtpVerificationComponent } from './features/auth/otp-verification/otp-verification.component';
import { RoleDashboardComponent } from './features/dashboard/pages/role-dashboard/role-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardHomeComponent // Landing page (Role Selection)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'verify-otp',
    component: OtpVerificationComponent
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        component: RoleDashboardComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}