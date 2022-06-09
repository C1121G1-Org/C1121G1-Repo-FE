import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';

/*
  Created by KhaiTT
  Date: 20:05 02/05/2022
  Function: This class use to set token to header of every single request with key 'Authorization'.
*/
@Injectable()
export class TokenInterceptorService implements HttpInterceptor{
  constructor(private tokenStorageService: TokenStorageService) {
  }
  token: any;
  intercept(req, next) {
    let authReq = req;
    if (this.tokenStorageService.getUser() != null) {
      this.token = this.tokenStorageService.getUser().token;
    } else {
      this.token = '';
    }
    if (this.token != null) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        },
      });
    }
    return next.handle(authReq);
  }
}
