import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvoiceHistoryComponent} from './invoice-history/invoice-history.component';
import {InvoiceCreateComponent} from './invoice-create/invoice-create.component';


const routes: Routes = [
  // createBy: LongNHL
  {path: "invoice", component: InvoiceCreateComponent},
  // createBy: Cong
  {path: 'listInvoice', component: InvoiceHistoryComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
