import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductUpdateComponent} from './product-update/product-update.component';
import {ListCustomerModalComponent} from '../shared/list-customer-modal/list-customer-modal.component';
import {ListChooseProductModalComponent} from '../shared/list-choose-product-modal/list-choose-product-modal.component';


const routes: Routes = [
  {path: 'api/product/create', component: ProductCreateComponent},
{path: 'api/product/edit/:id', component: ProductUpdateComponent},
{path: 'chooseCustomer', component: ListCustomerModalComponent},
{path: 'chooseProduct', component: ListChooseProductModalComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
