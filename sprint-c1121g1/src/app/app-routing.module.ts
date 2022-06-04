import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListBestsellerComponent} from './component/homepage/product-list-bestseller/product-list-bestseller.component';
import {QrcodeComponent} from './common/qrcode/qrcode.component';


import {ProductCreateComponent} from './component/product/product-create/product-create.component';

import {StorageCreateComponent} from './component/storage/storage-create/storage-create.component';
import {ProductUpdateComponent} from './component/product/product-update/product-update.component';



const routes: Routes = [
  {path: '', component: ProductListBestsellerComponent},

  {path: 'qrcode', component: QrcodeComponent},
  {path: 'api/product/create', component: ProductCreateComponent},
  {path: 'api/product/edit/:id', component: ProductUpdateComponent},

  {path: 'storage/create', component: StorageCreateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
