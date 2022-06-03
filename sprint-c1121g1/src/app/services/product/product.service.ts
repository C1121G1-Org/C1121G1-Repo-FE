import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Product} from '../../models/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiBaseUrl = environment.apiBaseUrl;
  private products: Product[];

  constructor(private http: HttpClient) {
  }

  /*
        Created by tuanPA
        Time:
        Function:
  */

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

  listAll(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/api/product/list`);
  }

  /*
  Created by khoaVC
  Time: 10:00 03/06/2022
  Method: list()
*/
  list(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/product/listAll`);
  }

  /*
   Created by tamHT
   Time: 13:37 03/06/2022
   Method: pageProduct()
 */
  getAllProduct(pageable, name, price): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/api/product/listAll`);
  }
  /*
   Created by tamHT
   Time: 13:37 03/06/2022
   Method: pageProduct()
 */
  getAllProductPage(pageable, name, price): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/api/product/list?page=${pageable}&keyName=${name}&keyPhone=${price}`);
  }
}
