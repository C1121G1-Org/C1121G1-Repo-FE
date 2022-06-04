import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private URl = 'http://localhost:8080/api/invoice/list';

  constructor(private httpClient: HttpClient) { }

  /*
Created by CongNV
Date : 04/06/2022
Function: Search,Pageable
*/

  getAll(keyword: string, sort: string, page: number): Observable<any> {
    return this.httpClient.get<any>(`${this.URl}?keyword=${keyword}&sort=${sort}&page=${page}`);
  }

}
