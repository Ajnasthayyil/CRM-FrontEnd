import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportsHomeComponent } from './pages/reports-home/reports-home.component';

const routes: Routes = [
  { path: '', component: ReportsHomeComponent }
];

@NgModule({
  declarations: [
    ReportsHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportsModule { }
