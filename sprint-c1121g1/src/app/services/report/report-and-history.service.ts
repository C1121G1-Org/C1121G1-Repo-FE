import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReportCustomerDto} from '../../dto/report-customer-dto';
import {environment} from '../../../environments/environment';
import {PurchaseHistoryDto} from '../../dto/purchase-history-dto';
import {PurchaseProductDto} from '../../dto/purchase-product-dto';


/*
    Created by TuanNQ
    Time: 18:00 31/05/2022
    Function: Show all list report customer and purchase history
*/
@Injectable({
  providedIn: 'root'
})
export class ReportAndHistoryService {

  constructor(private httpClient: HttpClient) {
  }

  filterAllCustomerReport(page: number): Observable<ReportCustomerDto[]> {
   return this.httpClient.get<ReportCustomerDto[]>('http://localhost:8080/api/customer/report-customer?page=' + page);
  }

  getInfoCustomer(id: number): Observable<ReportCustomerDto> {
    return this.httpClient.get<ReportCustomerDto>('http://localhost:8080/api/customer/info-customer/' + id);
  }

  getPurchaseHistory(id: number, page: number): Observable<PurchaseHistoryDto[]> {
    return this.httpClient.get<PurchaseHistoryDto[]>('http://localhost:8080/api/customer/purchase-history/' + id + '?page=' + page);
  }

  getPurchaseProduct(id: number, page: number): Observable<PurchaseProductDto[]> {
    return this.httpClient.get<PurchaseProductDto[]>('http://localhost:8080/api/customer/purchase-products/' + id + '?page=' + page);
  }
}
