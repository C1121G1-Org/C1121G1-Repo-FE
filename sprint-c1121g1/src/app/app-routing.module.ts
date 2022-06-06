
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListBestsellerComponent} from './component/homepage/product-list-bestseller/product-list-bestseller.component';
import {ProductCreateComponent} from './component/product/product-create/product-create.component';
import {StorageCreateComponent} from './component/storage/storage-create/storage-create.component';
import {ListCustomerModalComponent} from './component/shared/list-customer-modal/list-customer-modal.component';
import {ListChooseProductModalComponent} from './component/shared/list-choose-product-modal/list-choose-product-modal.component';



const routes: Routes = [
  {path: '', component: ProductListBestsellerComponent},
  {path: 'api/product/create', component: ProductCreateComponent},
  {path: 'storage/create', component: StorageCreateComponent},
  {path: 'storage/create', component: StorageCreateComponent},
  {path: 'chooseCustomer', component: ListCustomerModalComponent},
  {path: 'chooseProduct', component: ListChooseProductModalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
