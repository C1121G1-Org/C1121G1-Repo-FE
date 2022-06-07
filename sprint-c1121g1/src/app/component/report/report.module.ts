import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { SaleReportComponent } from './sale-report/sale-report.component';
import {CustomerReportComponent} from './customer-report/customer-report.component';
import {PurchaseHistoryComponent} from './purchase-history/purchase-history.component';


@NgModule({
  declarations: [SaleReportComponent, CustomerReportComponent, PurchaseHistoryComponent],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
