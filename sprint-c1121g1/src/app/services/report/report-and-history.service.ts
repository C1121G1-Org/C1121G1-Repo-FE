import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReportCustomerDto} from '../../dto/report-customer-dto';
import {environment} from '../../../environments/environment';


/*
    Created by TuanNQ
    Time: 18:00 31/05/2022
    Function: Show all list report customer
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
}
