import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SaleReportComponent} from './sale-report/sale-report.component';
import {CustomerReportComponent} from './customer-report/customer-report.component';

import {QrcodeComponent} from '../../common/qrcode/qrcode.component';


const routes: Routes = [
  {path: 'sale-report/list', component: SaleReportComponent},
  {path: 'report/customer-report', component: CustomerReportComponent},
  {path: 'qrcode', component: QrcodeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
