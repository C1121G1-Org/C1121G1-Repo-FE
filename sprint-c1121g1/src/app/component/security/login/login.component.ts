import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SecurityService} from '../../../services/security/security.service';
import {TokenStorageService} from '../../../services/security/token-storage.service';
import {ShareService} from '../../../services/security/share.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    remember_me: new FormControl()
  });

  roles: string[] = [];
  errorMessage = '';
  username: string;

  constructor(private securityService: SecurityService,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.securityService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  login() {
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
      console.log(error);
      this.errorMessage = 'Sai tên đăng nhập hoặc mật khẩu.';
      this.securityService.isLoggedIn = false;
    });
  }
}
