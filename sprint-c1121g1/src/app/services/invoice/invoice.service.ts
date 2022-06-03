import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InvoiceDto} from "../../dto/invoiceDto";



@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  URl = 'http://localhost:8080/api/invoice/list';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<InvoiceDto[]> {
    return this.httpClient.get<InvoiceDto[]>(`${URL}/invoiceList`);
  }


  createInvoice(invoice: InvoiceDto): Observable<InvoiceDto> {
    return this.httpClient.post<InvoiceDto>(`http://localhost:8080/api/invoiceDetail/create`,invoice);

  }
}
