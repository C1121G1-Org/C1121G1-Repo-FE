import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SaleReportComponent} from './sale-report/sale-report.component';

/*
    Created by HauPV
    Time: 09:00 03/06/2022
    Function: routing for sale-report
*/

const routes: Routes = [
  // Role : Admin , Business Staff
  {path: 'sale-report/list', component: SaleReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
