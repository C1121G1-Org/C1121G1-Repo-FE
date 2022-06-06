import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { SaleReportComponent } from './sale-report/sale-report.component';
import {HttpClientModule} from '@angular/common/http';
import {CustomerReportComponent} from './customer-report/customer-report.component';
import {PurchaseHistoryComponent} from './purchase-history/purchase-history.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

/*
    Created by HauPV
    Time: 09:00 03/06/2022
    Function: module for sale-report
*/

@NgModule({
  declarations: [SaleReportComponent, CustomerReportComponent, PurchaseHistoryComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ReportModule { }
