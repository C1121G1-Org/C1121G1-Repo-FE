import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceHistoryComponent } from './invoice-history/invoice-history.component';
import { InvoiceCreateComponent } from './invoice-create/invoice-create.component';


@NgModule({
    declarations: [InvoiceHistoryComponent, InvoiceCreateComponent],
    exports: [

    ],
    imports: [
        CommonModule,
        InvoiceRoutingModule
    ]
})
export class InvoiceModule { }
