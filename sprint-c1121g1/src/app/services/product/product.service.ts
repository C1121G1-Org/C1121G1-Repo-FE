
import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Product} from '../../models/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // @ts-ignore
  private apiBaseUrl = environment.apiBaseUrl;
  private products: Product[];

  constructor(private http: HttpClient) {
  }

  productApi = 'http://localhost:8080/api/product';

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.productApi + '/create', product);
  }
  findById(id: number): Observable<Product> {
    return this.http.get<Product>(this.productApi + '/' + id);
  }
  updateProduct(id: number, value: any): Observable<any> {
    return this.http.patch<any>(this.productApi + '/' + id, value);
  }
    list(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiBaseUrl}/api/product/list`);
  }
}
