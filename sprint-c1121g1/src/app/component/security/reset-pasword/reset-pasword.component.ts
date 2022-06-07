import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SecurityService} from '../../../services/security/security.service';
import {DataService} from '../../../services/common/data.service';
import {CountdownConfig} from 'ngx-countdown';
import {TokenStorageService} from '../../../services/security/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-pasword',
  templateUrl: './reset-pasword.component.html',
  styleUrls: ['./reset-pasword.component.css']
})
export class ResetPaswordComponent implements OnInit {
  changePasswordForm: FormGroup = new FormGroup({
    email: new FormControl(),
    newPassword: new FormControl('', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$')]),
    confirmNewPassword: new FormControl('', [Validators.required])
  });
  emailResetPassword: string;
  constructor(private dataService: DataService,
              private securityService: SecurityService,
              private tokenStorageService: TokenStorageService,
              private router: Router) {
    this.getEmailOfAccount();
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken() && this.emailResetPassword) {
      this.router.navigate(['']);
    }
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }

  get confirmNewPassword() {
    return this.changePasswordForm.get('confirmNewPassword');
  }

  checkConfirmNewPassword() {
    const newPassword = this.changePasswordForm.get('newPassword').value;
    const confirmNewPassword = this.changePasswordForm.get('confirmNewPassword').value;
    if (newPassword !== confirmNewPassword) {
      this.changePasswordForm.get('confirmNewPassword').setErrors({passwordNoMatch: true});
    }
  }

  getEmailOfAccount() {
    this.dataService.data.subscribe(res => {
      this.emailResetPassword = res;
    });
  }

  // tslint:disable-next-line:max-line-length
  updatePassword(openSuccessModalBtn: HTMLButtonElement, closeModalBtn: HTMLButtonElement, errorModalBtn: HTMLButtonElement, closeErrorModalBtn: HTMLButtonElement) {
    this.changePasswordForm.get('email').setValue(this.emailResetPassword);
    this.securityService.resetPassword(this.changePasswordForm.value).subscribe(res => {
      openSuccessModalBtn.click();
    }, error => {
      errorModalBtn.click();
      // tslint:disable-next-line:only-arrow-functions
      setTimeout(function(){
        closeErrorModalBtn.click();
      }, 5000);
    });
  }
}
