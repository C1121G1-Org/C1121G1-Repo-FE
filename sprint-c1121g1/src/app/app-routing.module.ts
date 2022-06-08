import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductListBestsellerComponent} from './component/homepage/product-list-bestseller/product-list-bestseller.component';
import {StorageCreateComponent} from './component/storage/storage-create/storage-create.component';
import {ProductCreateComponent} from './component/product/product-create/product-create.component';
import {ReportModule} from './component/report/report.module';
import {ProductUpdateComponent} from './component/product/product-update/product-update.component';
import {ProductListComponent} from "./component/product/product-list/product-list.component";




const routes: Routes = [
  {path: '', component: ProductListBestsellerComponent},

  {path: 'employee', loadChildren: () => import('./component/employee/employee.module').then(module => module.EmployeeModule)},
  {path: 'api/product/create', component: ProductCreateComponent},
  {path: 'api/product/edit/:id', component: ProductUpdateComponent},
  {path: 'storage/create', component: StorageCreateComponent},
  {path: 'storage/create', component: StorageCreateComponent},
  {path: 'api/product/edit/:id', component: ProductUpdateComponent},
  {path: 'storage/create', component: StorageCreateComponent},
  // role admin, bussiness staff
  {path: 'product/create', component: ProductCreateComponent},
  // role admin, bussiness staff
  {path: 'product/edit/:id', component: ProductUpdateComponent},

  // {path: 'api/product/edit/:id', component: ProductUpdateComponent},

  {path: 'storage/create', component: StorageCreateComponent},
  {path:'listProduct',component: ProductListComponent},


];

@NgModule({

  imports: [RouterModule.forRoot(routes),
    ReportModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
