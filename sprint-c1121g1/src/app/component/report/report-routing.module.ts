import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SaleReportComponent} from "./sale-report/sale-report.component";
import {QrCodeComponent} from "./qr-code/qr-code.component";


const routes: Routes = [
  {path:'sale-report/list',component:SaleReportComponent},
  {path:'qrcode',component:QrCodeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
