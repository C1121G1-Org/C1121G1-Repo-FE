import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListBestsellerComponent} from './component/homepage/product-list-bestseller/product-list-bestseller.component';
import { StorageCreateComponent } from './component/storage/storage-create/storage-create.component';


const routes: Routes = [
  {path: '', component: ProductListBestsellerComponent},
  {path: 'storage/create', component: StorageCreateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
