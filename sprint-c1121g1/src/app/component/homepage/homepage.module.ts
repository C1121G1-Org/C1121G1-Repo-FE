import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { ProductListBestsellerComponent } from './product-list-bestseller/product-list-bestseller.component';


@NgModule({
  declarations: [ProductListBestsellerComponent],
  exports: [
    ProductListBestsellerComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule
  ]
})
export class HomepageModule { }
