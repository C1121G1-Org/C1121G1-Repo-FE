import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProduct} from '../../models/IProduct';
import {ICustomer} from '../../models/ICustomer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = environment.baseApi;
  private urlProduct = environment.baseApiProduct;

  constructor(private http: HttpClient) {
  }

  getAllCustomer(pageable, name, phone): Observable<any> {
    return this.http.get<any>(`${this.url}/list?page=${pageable}&keyName=${name}&keyPhone=${phone}`);
  }

  getAllProduct(pageable, name, price): Observable<any> {
    return this.http.get<any>(`${this.urlProduct}/list`);
  }

}

