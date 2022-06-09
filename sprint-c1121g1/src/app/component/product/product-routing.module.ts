import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductUpdateComponent} from './product-update/product-update.component';
import {ListCustomerModalComponent} from '../shared/list-customer-modal/list-customer-modal.component';
import {ListChooseProductModalComponent} from '../shared/list-choose-product-modal/list-choose-product-modal.component';
import {AuthGuard} from '../security/auth.guard';
import {ProductListComponent} from './product-list/product-list.component';

const routes: Routes = [
  {
    path: 'product/create', component: ProductCreateComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_BUSINESS_STAFF']
    }
  },
  {path: 'product/edit/:id', component: ProductUpdateComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_BUSINESS_STAFF']
    }},
  {path: 'chooseCustomer', component: ListCustomerModalComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_SELLER']
    }},
  {path: 'chooseProduct', component: ListChooseProductModalComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_SELLER', 'ROLE_STOREKEEPER']
    }},
  {path: 'listProduct', component: ProductListComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_BUSINESS_STAFF', 'ROLE_SELLER']
    }},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
