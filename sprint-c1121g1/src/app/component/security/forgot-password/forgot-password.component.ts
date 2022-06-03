import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SecurityService} from '../../../services/security/security.service';
import {Router} from '@angular/router';

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
  usernameForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required])
  });
  confirmCode: string;
  errorMessage: string;
  notFoundMessage: string;
  spinFlag = false;
  constructor(private securityService: SecurityService,
              private router: Router) { }

  ngOnInit(): void {
  }

  submit(openSuccessModalBtn: HTMLButtonElement) {
    this.securityService.findAccountByUserName(this.usernameForm.value.username).subscribe(() => {
      openSuccessModalBtn.click();
      this.spinFlag = false;
    }, error => {
      this.spinFlag = false;
      this.notFoundMessage = 'Tên đăng nhập không tồn tại.';
    });
  }

  checkCode(closeModal: HTMLButtonElement) {
    this.securityService.checkChangePasswordCode(this.usernameForm.value.username, this.confirmCode).subscribe(res => {
      closeModal.click();
      this.router.navigate(['/reset-password']);
    }, error => {
      this.errorMessage = 'Không hợp lệ';
    });
  }

  changeSpinFlag() {
    this.spinFlag = true;
    this.notFoundMessage = '';
  }
}
