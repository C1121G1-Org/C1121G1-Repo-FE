import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {EmployeeUpdateComponent} from './employee-update/employee-update.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';

import {AuthGuard} from '../security/auth.guard';

const routes: Routes = [
  {path: 'employee/list', component: EmployeeListComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }},
  {path: 'employee/edit/:id', component: EmployeeUpdateComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }},
  {path: 'employee/create', component: EmployeeCreateComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
