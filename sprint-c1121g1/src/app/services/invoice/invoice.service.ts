import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  URl = 'http://localhost:8080/api/invoice/list';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<InvoiceDto[]> {
    return this.httpClient.get<InvoiceDto[]>(`${URL}/invoiceList`);
  }

}
