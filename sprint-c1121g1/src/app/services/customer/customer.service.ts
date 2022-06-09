import {Customer} from '../../models/customer';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  URL_LIST = 'http://localhost:8080/api/customer';

  private url = environment.apiBaseUrl;

  /*
    Created By hoangDH,
    Time: 16:10 PM 2022-06-03
    Function: find customer object by id from database
    */
  findById(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.URL_LIST + '/' + id);
  }

  /*
    Created By hoangDH,
    Time: 16:10 PM 2022-06-03
    Function: update customer object by id from database
    */
  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(this.URL_LIST + '/' + id, customer);
  }

  /*
    Created By hoangDH,
    Time: 15:00 PM 2022-06-01
    Function: list and search all customer from database
    */

  getAllCustomer1(name: string, phone: string, page: number): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.URL_LIST + '/list' + '?page=' + page + '&keyName=' + name + '&keyPhone=' + phone);
  }


  /*
  Created by tamHT
  Time: 13:37 03/06/2022
  Method: pageProduct()
*/
  getAllCustomer(pageable, name, phone): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/customer/list?page=${pageable}&keyName=${name}&keyPhone=${phone}`);
  }
}
