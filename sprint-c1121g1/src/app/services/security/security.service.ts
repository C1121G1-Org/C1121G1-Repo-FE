import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  isLoggedIn: boolean;

  constructor(private http: HttpClient) { }

  login(obj: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/public/login', obj);
  }

  findAccountByUserName(username: string): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/public/find-by-username?username=' + username);
  }

  checkChangePasswordCode(username: string, code: string) {
    return this.http.get<any>('http://localhost:8080/api/public/check-code?username=' + username + '&code=' + code);
  }
}
