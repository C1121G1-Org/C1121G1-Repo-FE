import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SaleReportService {

  URL_SALE_REPORT = "http://localhost:8080/api/sale-report";

  constructor(private http: HttpClient) {
  }

<<<<<<< HEAD
  getAllSaleREports():Observable<any>{
    return this.http.get<any>(`${this.URL_SALE_REPORT}`);
=======
  getAllSaleREports(startDay: string, endDay: string, productId: string): Observable<any> {
    return this.http.get<any>(`${this.URL_SALE_REPORT}?startDay=${startDay}&endDay=${endDay}&productId=${productId}`);
>>>>>>> e4837ffe24d5547f69d85a6bc4e0fac7f0ba52d8
  }
}
