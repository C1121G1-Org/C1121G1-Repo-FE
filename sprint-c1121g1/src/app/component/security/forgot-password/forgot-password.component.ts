import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SecurityService} from '../../../services/security/security.service';
import {Router} from '@angular/router';
import {DataService} from '../../../services/common/data.service';
import {CountdownComponent, CountdownConfig} from 'ngx-countdown';
import {config} from 'rxjs';
import {TokenStorageService} from '../../../services/security/token-storage.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
/*
  Created by KhaiTT
  Date: 11:20 03/05/2022
  Function: This class use to change personal password.
*/
export class ForgotPasswordComponent implements OnInit {
  config: CountdownConfig = {
    leftTime: 60,
    formatDate: ({ date }) => `${date / 1000}`,
    demand: true
  };
  usernameForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    code: new FormControl()
  });
  confirmCode: string;
  errorMessage: string;
  notFoundMessage: string;
  spinFlag = false;
  countTimeOut: any;
  constructor(private securityService: SecurityService,
              private router: Router,
              private dataService: DataService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.router.navigate(['']);
    }
  }

  submit(openSuccessModalBtn: HTMLButtonElement, countdowm: CountdownComponent,
         closeModal: HTMLButtonElement, errorModalBtn: HTMLButtonElement, resetCodeBtn: HTMLButtonElement) {
    this.securityService.findAccountByEmail(this.usernameForm.value.email).subscribe(() => {
      openSuccessModalBtn.click();
      countdowm.resume();
      this.spinFlag = false;
      this.dataService.sendData(this.usernameForm.value.email);
      // tslint:disable-next-line:only-arrow-functions
      this.countTimeOut =  setTimeout(function(){
        closeModal.click();
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() {
          errorModalBtn.click();
        }, 500);
        countdowm.restart();
        resetCodeBtn.click();
      }, 60000);
    }, error => {
      this.spinFlag = false;
      this.notFoundMessage = 'Không tìm thấy tài khoản của bạn.';
    });
  }

  refreshCode(countdowm: CountdownComponent) {
    this.securityService.refreshChangePasswordCode(this.usernameForm.value.email).subscribe(res => {
      console.log('refresh success');
      countdowm.restart();
      this.confirmCode = '';
      this.notFoundMessage = '';
      clearTimeout(this.countTimeOut);
    }, error => {
      console.log('refresh false');
    });
  }

  checkCode(closeModal: HTMLButtonElement) {
    this.usernameForm.controls.code.setValue(this.confirmCode);
    this.securityService.checkChangePasswordCode(this.usernameForm.value).subscribe(res => {
      closeModal.click();
      this.router.navigate(['/reset-password']);
    }, error => {
      this.errorMessage = 'Mã xác nhận không hợp lệ';
    });
  }

  changeSpinFlag() {
    this.spinFlag = true;
    this.notFoundMessage = '';
  }
}
