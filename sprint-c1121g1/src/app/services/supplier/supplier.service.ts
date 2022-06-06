import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Supplier} from '../../models/supplier';
import {HttpClient} from '@angular/common/http';
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
  private apiBaseUrl = environment.apiBaseUrl;
  private suppliers: Supplier[];
  constructor(private http: HttpClient) { }

  save(supplier: Supplier): Observable<Supplier>{
    return this.http.post<Supplier>(this.url, supplier); }
  list(p: number, supplier: string, address: string, phone: string, email: string): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/api/supplier/list?page=${p}&su=${supplier}&ad=${address}&ph=${phone}&em=${email}`);
  }
}
