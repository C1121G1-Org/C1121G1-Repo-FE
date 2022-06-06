import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/*
  Created by khoaVC
  Time: 10:00 03/06/2022
  Service: SecurityService
  Method: getPersonalInformation()
*/
export class SecurityService {

  constructor(private http: HttpClient) { }

  getPersonalInformation(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/public/personal/information');
  }
}
