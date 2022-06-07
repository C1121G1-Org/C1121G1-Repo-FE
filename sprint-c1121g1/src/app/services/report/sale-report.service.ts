import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SaleReportService {

  URL_SALE_REPORT = "http://localhost:8080/api/sale-report";

  constructor(private http: HttpClient) {
  }

  getAllSaleReports(startDay: string, endDay: string, productId: string): Observable<any> {
    return this.http.get<any>(`${this.URL_SALE_REPORT}?startDay=${startDay}&endDay=${endDay}&productId=${productId}`);
  }
}
