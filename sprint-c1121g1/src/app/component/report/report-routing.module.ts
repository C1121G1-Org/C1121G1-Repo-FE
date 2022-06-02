import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SaleReportComponent} from "./sale-report/sale-report.component";
import {QrcodeComponent} from "../../common/qrcode/qrcode.component";


const routes: Routes = [
  {path:'sale-report/list',component:SaleReportComponent},
  {path: 'qrcode', component: QrcodeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
