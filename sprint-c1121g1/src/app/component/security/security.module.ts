import { NgModule } from '@angular/core';
// @ts-ignore
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ChangePersonalPasswordComponent } from './change-personal-password/change-personal-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPaswordComponent } from './reset-pasword/reset-pasword.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {CountdownModule} from 'ngx-countdown';



@NgModule({
  declarations: [LoginComponent, PersonalInformationComponent, ChangePersonalPasswordComponent,
    ForgotPasswordComponent, ResetPaswordComponent, ErrorPageComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CountdownModule
  ]
})
export class SecurityModule { }
