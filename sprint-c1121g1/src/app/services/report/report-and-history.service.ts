import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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

  filterAllCustomerReport(page: number): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/api/customer/report-customer?page=' + page);
  }

  getInfoCustomer(id: number): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/api/customer/info-customer/' + id);
  }


  getPurchaseHistory(id: number, startDate: string, endDate: string, page: number):
    Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/api/customer/purchase-history/' + id +
      '?startDate=' + startDate + '&endDate=' + endDate + '&page=' + page);
  }

  getPurchaseProduct(id: number, page: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/customer/purchase-products/' + id + '?page=' + page);
  }

  filterByGender(page: number, genderSearch: boolean):
    Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/api/customer/report-customer-search-gender?page=' +
      page + '&gender=' + genderSearch);
  }

  filterByAge(page: number, ageSearch: number):
  Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/api/customer/report-customer-search-age?page=' +
      page + '&age=' + ageSearch);
  }

  filterByGenderAndAge(page: number, genderSearch: boolean, ageSearch: number):
  Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:8080/api/customer/report-customer-search?page=' +
      page + '&gender=' + genderSearch + '&age=' + ageSearch);
  }
}
