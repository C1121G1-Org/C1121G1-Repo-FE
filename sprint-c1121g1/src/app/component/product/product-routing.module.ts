import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductUpdateComponent} from './product-update/product-update.component';


const routes: Routes = [
<<<<<<< HEAD
  // {path: 'api/product/create', component: ProductCreateComponent},
  // {path: 'api/product/edit/:id', component: ProductUpdateComponent},
=======
  {path: 'api/product/create', component: ProductCreateComponent},

{path: 'api/product/edit/:id', component: ProductUpdateComponent}


>>>>>>> bfaae86ffa5e865441afe2eaabf416bc742aff31
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
