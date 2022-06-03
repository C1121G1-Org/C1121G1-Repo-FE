import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerChooseComponent } from './customer-choose/customer-choose.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [CustomerChooseComponent, CustomerListComponent, CustomerUpdateComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule
  ]
})
export class CustomerModule { }
