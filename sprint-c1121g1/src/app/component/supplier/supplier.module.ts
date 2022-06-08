import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierCreateComponent } from './supplier-create/supplier-create.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierUpdateComponent } from './supplier-update/supplier-update.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [SupplierCreateComponent, SupplierListComponent, SupplierUpdateComponent],
    imports: [
        CommonModule,
        SupplierRoutingModule,
        ReactiveFormsModule
    ]
})
export class SupplierModule { }
