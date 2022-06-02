import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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
}
