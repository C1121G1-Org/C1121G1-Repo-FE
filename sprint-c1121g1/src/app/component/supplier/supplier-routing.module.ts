import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SupplierCreateComponent} from './supplier-create/supplier-create.component';


const routes: Routes = [{
  path: 'supplier',
  component: SupplierCreateComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
