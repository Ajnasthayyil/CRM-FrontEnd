import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AttendanceHomeComponent } from './pages/attendance-home/attendance-home.component';

const routes: Routes = [
  { path: '', component: AttendanceHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
