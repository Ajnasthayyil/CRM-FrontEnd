import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformanceRoutingModule } from './performance-routing.module';
import { PerformanceHomeComponent } from './pages/performance-home/performance-home.component';
import { AddReviewComponent } from './pages/add-review/add-review.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PerformanceHomeComponent,
    AddReviewComponent
  ],
  imports: [
    CommonModule,
    PerformanceRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PerformanceModule { }
