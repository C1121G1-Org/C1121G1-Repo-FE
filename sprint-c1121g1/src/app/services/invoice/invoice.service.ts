import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InvoiceDto} from '../../dto/invoiceDto';



@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private URl = 'http://localhost:8080/api/invoice/list';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<InvoiceDto[]> {
    return this.httpClient.get<InvoiceDto[]>(`${this.URl}`);
  }

  getSearch(value1: string, value2: string , value3: string , value4: string, page: number): Observable<InvoiceDto[]> {
    return this.httpClient.get<InvoiceDto[]>(this.URl + '/');
  }



}
