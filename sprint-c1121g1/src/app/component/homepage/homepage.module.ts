import { NgModule } from '@angular/core';
// @ts-ignore
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { ProductListBestsellerComponent } from './product-list-bestseller/product-list-bestseller.component';
// @ts-ignore
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [ProductListBestsellerComponent],
  exports: [
    ProductListBestsellerComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    HttpClientModule
  ]
})
export class HomepageModule { }
