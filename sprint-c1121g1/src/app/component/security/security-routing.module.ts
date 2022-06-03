import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PersonalInformationComponent} from './personal-information/personal-information.component';
import {ChangePersonalPasswordComponent} from './change-personal-password/change-personal-password.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPaswordComponent} from './reset-pasword/reset-pasword.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'personal-information', component: PersonalInformationComponent},
  {path: 'change-personal-password', component: ChangePersonalPasswordComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPaswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
