import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  URL_LIST = 'http://localhost:8080/api/customer';

  constructor(private http: HttpClient) {
  }

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
    return this.http.put<Customer>(this.URL_LIST + '/' + id, customer);
  }

  /*
    Created By hoangDH,
    Time: 15:00 PM 2022-06-01
    Function: list and search all customer from database
    */

  getAllCustomer(name: string, phone: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.URL_LIST + '/list' + '/?' + 'keyName=' + name + '&' + 'keyPhone' + phone);
  }
}
