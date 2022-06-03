import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageRoutingModule} from './component/homepage/homepage-routing.module';
import {HomepageModule} from './component/homepage/homepage.module';
import {ProductListBestsellerComponent} from './component/homepage/product-list-bestseller/product-list-bestseller.component';
import {CustomerListComponent} from './component/customer/customer-list/customer-list.component';
import {CustomerUpdateComponent} from './component/customer/customer-update/customer-update.component';


const routes: Routes = [
  {path: '', component: ProductListBestsellerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
