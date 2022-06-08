import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {EmployeeUpdateComponent} from './employee-update/employee-update.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';

const routes: Routes = [
  {
    path: 'employee/list', component: EmployeeListComponent
  },
  {
    path: 'employee/edit/:id', component: EmployeeUpdateComponent
  },
  {
    path: 'employee/create', component: EmployeeCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
