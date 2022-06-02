import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SaleReportComponent} from './sale-report/sale-report.component';
import {CustomerReportComponent} from './customer-report/customer-report.component';


const routes: Routes = [
  {path: 'sale-report/list', component: SaleReportComponent},
  {path: 'report/customer-report', component: CustomerReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
