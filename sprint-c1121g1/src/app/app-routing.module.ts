import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductListBestsellerComponent} from './component/homepage/product-list-bestseller/product-list-bestseller.component';

import {StorageCreateComponent} from './component/storage/storage-create/storage-create.component';

import {ProductCreateComponent} from './component/product/product-create/product-create.component';
import {ReportModule} from "./component/report/report.module";


const routes: Routes = [
  {path: '', component: ProductListBestsellerComponent},
  {path: 'api/product/create', component: ProductCreateComponent},
  {path: 'storage/create', component: StorageCreateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ReportModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
