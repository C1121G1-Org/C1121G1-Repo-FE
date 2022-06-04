import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InvoiceDetail} from "../../dto/InvoiceDetail";


@Injectable({
  providedIn: 'root'
})


export class InvoiceService {

  constructor(private http: HttpClient) {
  }


  createInvoice(invoiceDetail: InvoiceDetail):Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/invoiceDetail/create`,invoiceDetail);

  }


  updateQuantity(invoiceDetail: InvoiceDetail): Observable<any> {
    return  this.http.patch<any>(`http://localhost:8080/api/invoiceDetail/updateQuantityProduct`,invoiceDetail)

  }
}
