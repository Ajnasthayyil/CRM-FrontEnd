import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerformanceHomeComponent } from './pages/performance-home/performance-home.component';
import { AddReviewComponent } from './pages/add-review/add-review.component';

const routes: Routes = [
  { path: '', component: PerformanceHomeComponent },
  { path: 'add', component: AddReviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceRoutingModule { }
