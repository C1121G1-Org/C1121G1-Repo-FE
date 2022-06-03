import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './common/header/header.component';
import {FooterComponent} from './common/footer/footer.component';
import {EmployeeModule} from './component/employee/employee.module';
import {ProductModule} from './component/product/product.module';
import {CustomerModule} from './component/customer/customer.module';
import {InvoiceModule} from './component/invoice/invoice.module';
import {SupplierModule} from './component/supplier/supplier.module';
import {StorageModule} from './component/storage/storage.module';
import {HomepageModule} from './component/homepage/homepage.module';
import {ReportModule} from './component/report/report.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {SecurityModule} from './component/security/security.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptorService} from './services/security/token-interceptor.service';

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
    ReportModule,
    SecurityModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    /*
      Created by KhaiTT
      Date: 20:30 02/05/2022
      Function: This providers use for TokenInterceptorService.
    */
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
