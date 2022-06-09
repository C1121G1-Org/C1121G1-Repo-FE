import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SaleReportComponent} from './sale-report/sale-report.component';

import {CustomerReportComponent} from './customer-report/customer-report.component';
import {PurchaseHistoryComponent} from './purchase-history/purchase-history.component';
import {AuthGuard} from '../security/auth.guard';


/*
    Created by HauPV
    Time: 09:00 03/06/2022
    Function: routing for sale-report
*/

const routes: Routes = [

  // Role : Admin , Business Staff
  {path: 'sale-report/list', component: SaleReportComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_BUSINESS_STAFF']
    }},
  /*
    Created by TuanNQ
    Time: 18:00 31/05/2022
    Function: Show all list report customer
  */
  {path: 'report/customer-report', component: CustomerReportComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_BUSINESS_STAFF']
    }},
  /*
    Created by TuanNQ
    Time: 11:00 02/06/2022
    Function: Show detail purchase history
  */
  {path: 'report/purchase-hitory/:id', component: PurchaseHistoryComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_BUSINESS_STAFF']
    }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {
}
