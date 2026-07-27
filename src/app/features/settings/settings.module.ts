import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingsHomeComponent } from './pages/settings-home/settings-home.component';

const routes: Routes = [
  { path: '', component: SettingsHomeComponent }
];

@NgModule({
  declarations: [
    SettingsHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SettingsModule { }
