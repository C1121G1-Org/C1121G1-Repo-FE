import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';

import { QrCodeComponent } from './qr-code/qr-code.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ListChooseProductModalComponent} from "./list-choose-product-modal/list-choose-product-modal.component";

import { ListCustomerModalComponent } from './list-customer-modal/list-customer-modal.component';






@NgModule({
  declarations: [ QrCodeComponent,ListChooseProductModalComponent, ListCustomerModalComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [

    QrCodeComponent,
    ListChooseProductModalComponent,

    ListCustomerModalComponent
  ]
})
export class SharedModule { }
