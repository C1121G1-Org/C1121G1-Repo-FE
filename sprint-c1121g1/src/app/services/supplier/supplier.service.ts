import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Supplier} from '../../models/supplier';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiBaseUrl = environment.apiBaseUrl;
  private suppliers: Supplier[];
  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/api/supplier/list`);
  }
}
