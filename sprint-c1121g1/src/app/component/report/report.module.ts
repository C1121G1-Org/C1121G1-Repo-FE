import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { SaleReportComponent } from './sale-report/sale-report.component';


@NgModule({
  declarations: [SaleReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
