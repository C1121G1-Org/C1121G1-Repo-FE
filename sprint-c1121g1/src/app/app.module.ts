import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import {EmployeeModule} from './component/employee/employee.module';
import {ProductModule} from './component/product/product.module';
import {CustomerModule} from './component/customer/customer.module';
import {InvoiceModule} from './component/invoice/invoice.module';
import {SupplierModule} from './component/supplier/supplier.module';
import {StorageModule} from './component/storage/storage.module';
import {HomepageModule} from './component/homepage/homepage.module';
import {ReportModule} from './component/report/report.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EmployeeModule,
    ProductModule,
    CustomerModule,
    InvoiceModule,
    SupplierModule,
    StorageModule,
    HomepageModule,
    ReportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
