import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvoiceHistoryComponent} from './invoice-history/invoice-history.component';


const routes: Routes = [
  {
    path: 'list',
    component: InvoiceHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
