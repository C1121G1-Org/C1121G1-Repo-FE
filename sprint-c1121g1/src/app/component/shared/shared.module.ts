import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedRoutingModule} from './shared-routing.module';
import {ListProductModalComponent} from './list-product-modal/list-product-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListSupplierModalComponent} from './list-supplier-modal/list-supplier-modal.component';
import {ListCustomerModalComponent} from './list-customer-modal/list-customer-modal.component';
import {ListChooseProductModalComponent} from './list-choose-product-modal/list-choose-product-modal.component';
import {SuccessModalComponent} from "./success-modal/success-modal.component";
import {QrCodeComponent} from "./qr-code/qr-code.component";


@NgModule({

  declarations: [QrCodeComponent, ListSupplierModalComponent, ListCustomerModalComponent,
    ListChooseProductModalComponent, SuccessModalComponent,ListProductModalComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    QrCodeComponent,
    ListSupplierModalComponent,
    ListChooseProductModalComponent,
    SuccessModalComponent,
    ListProductModalComponent
  ]
})

export class SharedModule {
}


