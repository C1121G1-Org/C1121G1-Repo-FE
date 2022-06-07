import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [EmployeeCreateComponent, EmployeeUpdateComponent, EmployeeListComponent],
  exports: [
    EmployeeListComponent
  ],
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        FormsModule
    ]
})
export class EmployeeModule { }
