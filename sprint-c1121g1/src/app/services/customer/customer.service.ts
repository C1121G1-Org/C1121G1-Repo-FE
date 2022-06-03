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

  findById(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.URL_LIST + '/' + id);
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.URL_LIST + '/' + id, customer);
  }

  getAllCustomer(name: string, phone: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.URL_LIST + '/list' + '/?' + 'keyName=' + name + '&' + 'keyPhone' + phone);
  }
}
