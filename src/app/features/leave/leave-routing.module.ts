import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeaveHomeComponent } from './pages/leave-home/leave-home.component';

const routes: Routes = [
  { path: '', component: LeaveHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
