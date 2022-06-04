import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvoiceHistoryComponent} from './invoice-history/invoice-history.component';
import {InvoiceCreateComponent} from './invoice-create/invoice-create.component';


const routes: Routes = [
  {path: 'listInvoice', component: InvoiceHistoryComponent},
  {path: 'invoice', component: InvoiceCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
