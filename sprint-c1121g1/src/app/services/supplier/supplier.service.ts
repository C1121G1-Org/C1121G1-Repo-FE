import { Injectable } from '@angular/core';
<<<<<<< HEAD
import {HttpClient} from '@angular/common/http';
import {Supplier} from '../../models/supplier';
=======
import {environment} from '../../../environments/environment';
import {Supplier} from '../../models/supplier';
import {HttpClient} from '@angular/common/http';
>>>>>>> f1b918f96a955034e9887d1cb36d548fb8e7dc60
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/*
    Created by NgocTTB
    Time: 09:00 03/06/2022
    Function: Create Supplier
    */
export class SupplierService {
<<<<<<< HEAD
  url = 'http://localhost:8080/api/supplier/create';
  constructor(private http: HttpClient) { }

  save(supplier: Supplier): Observable<Supplier>{
    return this.http.post<Supplier>(this.url, supplier);
=======
  private apiBaseUrl = environment.apiBaseUrl;
  private suppliers: Supplier[];
  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/api/supplier/list`);
>>>>>>> f1b918f96a955034e9887d1cb36d548fb8e7dc60
  }
}
