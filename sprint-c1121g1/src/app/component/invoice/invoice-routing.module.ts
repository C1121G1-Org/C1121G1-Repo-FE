import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvoiceCreateComponent} from './invoice-create/invoice-create.component';
import {InvoiceHistoryComponent} from './invoice-history/invoice-history.component';
import {AuthGuard} from '../security/auth.guard';


const routes: Routes = [
  // createBy: LongNHL
  {path: 'invoice', component: InvoiceCreateComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_SELLER']
    }},
  // createBy: Cong
  {path: 'listInvoice', component: InvoiceHistoryComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_SELLER']
    }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
