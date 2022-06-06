import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ProductListComponent, ProductCreateComponent, ProductUpdateComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductModule { }
