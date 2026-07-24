import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { Customer360Component } from './pages/customer-360/customer-360.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CustomerListComponent,
    Customer360Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomersRoutingModule,
    SharedModule
  ]
})
export class CustomersModule { }
