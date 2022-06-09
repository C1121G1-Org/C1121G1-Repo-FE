import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PersonalInformationComponent} from './personal-information/personal-information.component';
import {ChangePersonalPasswordComponent} from './change-personal-password/change-personal-password.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPaswordComponent} from './reset-pasword/reset-pasword.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {AuthGuard} from './auth.guard';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'personal-information', component: PersonalInformationComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_STAFF', 'ROLE_SELLER', 'ROLE_STOREKEEPER']
    }},
  {path: 'change-personal-password', component: ChangePersonalPasswordComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_STAFF', 'ROLE_SELLER', 'ROLE_STOREKEEPER']
    }},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPaswordComponent},
  {path: 'error', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
