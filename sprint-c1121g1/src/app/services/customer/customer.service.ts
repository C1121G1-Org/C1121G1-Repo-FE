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

  constructor(private http: HttpClient) {
  }
  getAllProduct(pageable, name , phone): Observable<ICustomer[]>{
    return this.http.get<ICustomer[]>(`${this.url}/list?page=${pageable}&keyName=${name}&keyPhone=${phone}`);
  }
}

