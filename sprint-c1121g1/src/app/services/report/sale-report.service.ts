import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleReportService {

  /*
    Created by TuanNQ
    Time: 18:00 31/05/2022
    Function: Show all list report customer
  */
  URL_SALE_REPORT = 'http://localhost:8080/api/sale-report';

  constructor(private http: HttpClient) {
  }

  /*
    Created by TuanNQ
    Time: 18:00 31/05/2022
    Function: Show all list report customer
  */
  getAllSaleREports(): Observable<any>{
    return this.http.get<any>(`${this.URL_SALE_REPORT}`);
  }
}
