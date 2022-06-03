import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { SaleReportComponent } from './sale-report/sale-report.component';
import {HttpClientModule} from '@angular/common/http';
import {CustomerReportComponent} from './customer-report/customer-report.component';
import {PurchaseHistoryComponent} from './purchase-history/purchase-history.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { QrCodeComponent } from './qr-code/qr-code.component';





@NgModule({
  declarations: [SaleReportComponent, CustomerReportComponent, PurchaseHistoryComponent, QrCodeComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ReportModule { }
