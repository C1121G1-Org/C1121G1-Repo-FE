import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListBestsellerComponent} from './component/homepage/product-list-bestseller/product-list-bestseller.component';
import {ProductCreateComponent} from './component/product/product-create/product-create.component';


const routes: Routes = [
  {path: '', component: ProductListBestsellerComponent},
  {path: 'api/product/create', component: ProductCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
