import { NgModule } from '@angular/core';
// @ts-ignore
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
// @ts-ignore
import {HttpClientModule} from '@angular/common/http';



// @ts-ignore
@NgModule({
  declarations: [EmployeeCreateComponent, EmployeeUpdateComponent, EmployeeListComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    EmployeeListComponent
  ]

})
export class EmployeeModule { }
