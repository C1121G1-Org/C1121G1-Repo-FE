import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerChooseComponent } from './customer-choose/customer-choose.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';


@NgModule({
  declarations: [CustomerChooseComponent, CustomerListComponent, CustomerUpdateComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
