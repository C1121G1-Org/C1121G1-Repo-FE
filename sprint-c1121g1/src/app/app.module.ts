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
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SecurityModule} from './component/security/security.module';
import {HttpClientModule} from '@angular/common/http';
import {ReportModule} from './component/report/report.module';
import {CKEditorModule} from "ckeditor4-angular";

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeModule,
    ProductModule,
    CustomerModule,
    InvoiceModule,
    SupplierModule,
    StorageModule,
    HomepageModule,
    ReportModule,
    SecurityModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    CKEditorModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
