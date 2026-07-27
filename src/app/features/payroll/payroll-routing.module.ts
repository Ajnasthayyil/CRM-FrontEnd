import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PayrollHomeComponent } from './pages/payroll-home/payroll-home.component';

const routes: Routes = [
  { path: '', component: PayrollHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
