import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageRoutingModule} from './component/homepage/homepage-routing.module';
import {HomepageModule} from './component/homepage/homepage.module';
import {ProductListBestsellerComponent} from './component/homepage/product-list-bestseller/product-list-bestseller.component';
import {CustomerChooseComponent} from './component/customer/customer-choose/customer-choose.component';


const routes: Routes = [
  {path: '', component: ProductListBestsellerComponent},
  {path: 'chooseProduct', component: CustomerChooseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
