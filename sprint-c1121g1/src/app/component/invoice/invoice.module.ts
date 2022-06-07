import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';



import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceHistoryComponent } from './invoice-history/invoice-history.component';
import { InvoiceCreateComponent } from './invoice-create/invoice-create.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [InvoiceHistoryComponent, InvoiceCreateComponent],
    exports: [

    ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class InvoiceModule {
}
