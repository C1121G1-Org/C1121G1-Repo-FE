
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductListBestsellerComponent} from './component/homepage/product-list-bestseller/product-list-bestseller.component';
<<<<<<< HEAD
import {StorageCreateComponent} from './component/storage/storage-create/storage-create.component';

import {ProductCreateComponent} from './component/product/product-create/product-create.component';
import {ReportModule} from './component/report/report.module';
import {ProductUpdateComponent} from './component/product/product-update/product-update.component';
import {ProductListComponent} from "./component/product/product-list/product-list.component";
=======
import {QrcodeComponent} from './common/qrcode/qrcode.component';


import {ProductCreateComponent} from './component/product/product-create/product-create.component';

import {StorageCreateComponent} from './component/storage/storage-create/storage-create.component';
import {ProductUpdateComponent} from './component/product/product-update/product-update.component';
>>>>>>> manager-product



const routes: Routes = [
  {path: '', component: ProductListBestsellerComponent},
  {path: 'api/product/create', component: ProductCreateComponent},
  {path: 'api/product/edit/:id', component: ProductUpdateComponent},
<<<<<<< HEAD
  {path: 'storage/create', component: StorageCreateComponent},
  {path: 'storage/create', component: StorageCreateComponent},
  {path: 'api/product/edit/:id', component: ProductUpdateComponent},
  {path: 'storage/create', component: StorageCreateComponent},
  {path:'listProduct',component: ProductListComponent},
  {path: 'product/create',component : ProductCreateComponent},
  {path: 'product/edit/:id',component : ProductUpdateComponent},
=======

  {path: 'storage/create', component: StorageCreateComponent}
>>>>>>> manager-product

];

@NgModule({

  imports: [RouterModule.forRoot(routes),
    ReportModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
