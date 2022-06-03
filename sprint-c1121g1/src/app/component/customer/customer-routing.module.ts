import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {CustomerUpdateComponent} from './customer-update/customer-update.component';


const routes: Routes = [
  {path: 'customer/list', component: CustomerListComponent},
  {path: 'customer/edit/:id', component: CustomerUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
