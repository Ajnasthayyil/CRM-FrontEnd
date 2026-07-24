import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformanceRoutingModule } from './performance-routing.module';
import { PerformanceHomeComponent } from './pages/performance-home/performance-home.component';


@NgModule({
  declarations: [
    PerformanceHomeComponent
  ],
  imports: [
    CommonModule,
    PerformanceRoutingModule
  ]
})
export class PerformanceModule { }
