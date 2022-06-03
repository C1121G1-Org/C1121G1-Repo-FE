import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllCustomer(pageable, name, phone): Observable<any> {
    return this.http.get<any>(`${this.url}/customer/list?page=${pageable}&keyName=${name}&keyPhone=${phone}`);
  }
}
// getList(searchName: string, page: number): Observable<Customer[]> {
//   return this.http.get<Customer[]>(API_URL + '/customer_list?page=' + page + '&searchVal=' + searchName);
// }
