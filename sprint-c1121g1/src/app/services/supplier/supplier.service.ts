import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Supplier} from '../../models/supplier';
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
  url = 'http://localhost:8080/api/supplier/create';
  constructor(private http: HttpClient) { }

  save(supplier: Supplier): Observable<Supplier>{
    return this.http.post<Supplier>(this.url, supplier);
  }
}
