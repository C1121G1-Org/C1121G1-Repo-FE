import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/*
  Created by KhaiTT
  Date: 09:30 02/05/2022
  Function: This class use to call method of SecurityRestController of web service.
*/
export class SecurityService {
  isLoggedIn: boolean;

  constructor(private http: HttpClient) {
  }

  login(obj: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/public/login', obj);
  }

  getPersonalInformation(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/public/personal/information');
  }

  updatePersonalInformation(personalInformation: any): Observable<any> {
    return this.http.patch<any>('http://localhost:8080/api/public/personal/information/update', personalInformation);
  }

  changePersonalPassword(changePasswordRequest: any): Observable<any> {
    return this.http.patch('http://localhost:8080/api/public/personal/change-password', changePasswordRequest);
  }

  findAccountByEmail(email: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/public/find-by-email', email);
  }

  checkChangePasswordCode(checkVerificationCodeRequest: any) {
    return this.http.post<any>('http://localhost:8080/api/public/check-code', checkVerificationCodeRequest);
  }

  resetPassword(resetPasswordRequest: any): Observable<any> {
    return this.http.patch<any>('http://localhost:8080/api/public/reset-password', resetPasswordRequest);
  }

  refreshChangePasswordCode(email: string) {
    return this.http.patch('http://localhost:8080/api/public/refresh-code', email);
  }
}
