import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListBestsellerComponent} from './component/homepage/product-list-bestseller/product-list-bestseller.component';



const routes: Routes = [

  {path: '', component: ProductListBestsellerComponent}
  // {
  //   path: 'listInvoice',
  //   loadChildren: () => import('../app/component/invoice/invoice.module').then(module => module.InvoiceModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
