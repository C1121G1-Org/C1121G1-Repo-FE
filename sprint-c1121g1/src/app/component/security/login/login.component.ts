import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SecurityService} from '../../../services/security/security.service';
import {TokenStorageService} from '../../../services/security/token-storage.service';
import {ShareService} from '../../../services/security/share.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/*
  Created by KhaiTT
  Date: 11:00 02/05/2022
  Function: This class use to login.
*/
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    remember_me: new FormControl()
  });

  roles: string[] = [];
  errorMessage = '';
  username: string;
  showPassword: any;

  constructor(private securityService: SecurityService,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.securityService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
      this.router.navigate(['']);
    }
  }

  get usernameForm() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }


  login(errorModalBtn: HTMLButtonElement, closeErrorModal: HTMLButtonElement) {
    this.securityService.login(this.loginForm.value).subscribe(data => {
      if (this.loginForm.value.remember_me) {
        this.tokenStorageService.saveTokenLocal(data.accessToken);
        this.tokenStorageService.saveUserLocal(data);
      } else {
        this.tokenStorageService.saveTokenSession(data.accessToken);
        this.tokenStorageService.saveUserLocal(data);
      }
      this.securityService.isLoggedIn = true;
      this.username = this.tokenStorageService.getUser().username;
      this.roles = this.tokenStorageService.getUser().roles;
      this.loginForm.reset();
      this.shareService.sendClickEvent();
      this.router.navigate(['']);
    }, error => {
      if (error.status === 403) {
        this.errorMessage = 'Sai tên đăng nhập hoặc mật khẩu.';
        // if (this.password?.valueChanges) {
        //   this.errorMessage = '';
        // }
        this.securityService.isLoggedIn = false;
      } else if (error.status === 0) {
        errorModalBtn.click();
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() {
          closeErrorModal.click();
        }, 3000);
        this.securityService.isLoggedIn = false;
      }
    });
  }
}
