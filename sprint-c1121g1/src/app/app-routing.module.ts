import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListBestsellerComponent} from './component/homepage/product-list-bestseller/product-list-bestseller.component';


const routes: Routes = [
  {path: '', component: ProductListBestsellerComponent},
  {
    path: 'employee',
    loadChildren: () => import('./component/employee/employee.module').then(module => module.EmployeeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
