import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvoiceCreateComponent} from "./invoice-create/invoice-create.component";
import {InvoiceHistoryComponent} from './invoice-history/invoice-history.component';


const routes: Routes = [
  // createBy: LongNHL
  {path: "invoice", component: InvoiceCreateComponent},
  // createBy: Cong
  {path: 'listInvoice', component: InvoiceHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
