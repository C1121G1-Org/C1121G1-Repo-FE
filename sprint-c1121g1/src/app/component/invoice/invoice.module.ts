import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InvoiceRoutingModule} from './invoice-routing.module';
import {InvoiceHistoryComponent} from './invoice-history/invoice-history.component';
import {InvoiceCreateComponent} from './invoice-create/invoice-create.component';
import {PurchaseHistoryComponent} from './purchase-history/purchase-history.component';
import {CustomerReportComponent} from './customer-report/customer-report.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [InvoiceHistoryComponent, InvoiceCreateComponent, PurchaseHistoryComponent, CustomerReportComponent],
  exports: [
    InvoiceHistoryComponent

  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class InvoiceModule {
}
