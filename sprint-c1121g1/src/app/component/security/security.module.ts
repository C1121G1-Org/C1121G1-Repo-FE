import { NgModule } from '@angular/core';
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


@NgModule({
  declarations: [LoginComponent, PersonalInformationComponent, ChangePersonalPasswordComponent, ForgotPasswordComponent, ResetPaswordComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SecurityModule { }
