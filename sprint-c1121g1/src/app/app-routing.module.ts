import {ErrorComponent} from './error/error.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListBestsellerComponent} from './component/homepage/product-list-bestseller/product-list-bestseller.component';
import {StorageCreateComponent} from './component/storage/storage-create/storage-create.component';
import {ProductCreateComponent} from './component/product/product-create/product-create.component';
import {ReportModule} from './component/report/report.module';
import {ProductUpdateComponent} from './component/product/product-update/product-update.component';


const routes: Routes = [
  {path: '', component: ProductListBestsellerComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'api/product/create', component: ProductCreateComponent},
  {path: 'api/product/edit/:id', component: ProductUpdateComponent},
  {path: 'storage/create', component: StorageCreateComponent},
  {path: 'storage/create', component: StorageCreateComponent},
  {path: 'api/product/edit/:id', component: ProductUpdateComponent},
  {path: 'storage/create', component: StorageCreateComponent}
];

@NgModule({

  imports: [RouterModule.forRoot(routes),
    ReportModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
