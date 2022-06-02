import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageRoutingModule} from './component/homepage/homepage-routing.module';
import {HomepageModule} from './component/homepage/homepage.module';
import {ProductListBestsellerComponent} from './component/homepage/product-list-bestseller/product-list-bestseller.component';
import {QrcodeComponent} from "./common/qrcode/qrcode.component";


const routes: Routes = [
  {path: '', component: ProductListBestsellerComponent},
  {path: 'qrcode', component: QrcodeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
