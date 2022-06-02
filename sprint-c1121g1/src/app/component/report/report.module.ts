import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { SaleReportComponent } from './sale-report/sale-report.component';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [SaleReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    HttpClientModule
  ]
})
export class ReportModule { }
