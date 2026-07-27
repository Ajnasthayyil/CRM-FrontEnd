import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrainingHomeComponent } from './pages/training-home/training-home.component';

const routes: Routes = [
  { path: '', component: TrainingHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
