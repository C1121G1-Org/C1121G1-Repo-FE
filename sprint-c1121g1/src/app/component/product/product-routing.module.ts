import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductUpdateComponent} from './product-update/product-update.component';


const routes: Routes = [
  {path: 'api/product/create', component: ProductCreateComponent},
<<<<<<< HEAD
  {path: 'api/product/edit/:id', component: ProductUpdateComponent},
=======
{path: 'api/product/edit/:id', component: ProductUpdateComponent},

>>>>>>> e4837ffe24d5547f69d85a6bc4e0fac7f0ba52d8
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
