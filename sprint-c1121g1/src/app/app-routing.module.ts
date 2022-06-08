import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListBestsellerComponent} from "./component/homepage/product-list-bestseller/product-list-bestseller.component";


const routes: Routes = [

  {path: '', component: ProductListBestsellerComponent},
  {path: 'api/product/create', component: ProductCreateComponent},
  {path: 'api/product/edit/:id', component: ProductUpdateComponent},
  {path: 'storage/create', component: StorageCreateComponent},
  {path: 'storage/create', component: StorageCreateComponent},
  {path: 'api/product/edit/:id', component: ProductUpdateComponent},
  {path: 'storage/create', component: StorageCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
