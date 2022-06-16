import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SecurityService} from '../../../services/security/security.service';

@Component({
  selector: 'app-change-personal-password',
  templateUrl: './change-personal-password.component.html',
  styleUrls: ['./change-personal-password.component.css']
})
/*
  Created by KhaiTT
  Date: 10:50 03/05/2022
  Function: This class use to change personal password.
*/
export class ChangePersonalPasswordComponent implements OnInit {
  changePasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$')]),
    confirmNewPassword: new FormControl('', [Validators.required])
  });
  showCurrentPassword: any;
  showNewPassword: any;
  showConfirmNewPassword: any;
  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
  }

  get currentPassword() {
    return this.changePasswordForm.get('currentPassword');
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

  // tslint:disable-next-line:max-line-length
  update(openSuccessModalBtn: HTMLButtonElement, closeModalBtn: HTMLButtonElement, errorModalBtn: HTMLButtonElement, closeErrorModalBtn: HTMLButtonElement, serverErrorModal: HTMLButtonElement, closeServerErrorModalBtn: HTMLButtonElement) {
    const changePassword = this.changePasswordForm.value;
    this.securityService.changePersonalPassword(changePassword).subscribe(res => {
      this.changePasswordForm.reset();
      openSuccessModalBtn.click();
      // tslint:disable-next-line:only-arrow-functions
      setTimeout(function(){
        closeModalBtn.click();
      }, 5000);
    }, error => {
      if (error.status === 0) {
        serverErrorModal.click();
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() {
          closeServerErrorModalBtn.click();
        }, 3000);
      }
      if (error.status === 403 || error.status === 400) {
        errorModalBtn.click();
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function(){
          closeErrorModalBtn.click();
        }, 5000);
      }
    });
  }

  toggleShowCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleShowNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleShowConfirmNewPassword() {
    this.showConfirmNewPassword = !this.showConfirmNewPassword;
  }
}
