// @ts-ignore

import {Injectable} from '@angular/core';
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

  /*
        Created by tuanPA
        Time:
        Function:
  */

  productApi = 'http://localhost:8080/api/product';

  /*
      Created by TuanPA
      Date: 9:08 3/6/2022
      Function: createProduct
  */
  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.productApi + '/create', product);
  }
  /*
    Created by TuanPA
    Date: 9:08 3/6/2022
    Function: find by id
*/

  findById(id: number): Observable<Product> {
    return this.http.get<Product>(this.productApi + '/' + id);
  }
  /*
    Created by TuanPA
    Date: 9:08 3/6/2022
    Function: edit product
*/

  updateProduct(id: number, value: any): Observable<any> {
    return this.http.patch<any>(this.productApi + '/' + 'update/' + id, value);
  }


  listAll(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/api/product/list`);
  }
  /*
   Created by tamHT
   Time: 13:37 03/06/2022
   Method: pageProduct()
 */
  getAllProductPage(pageable, name, price): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/api/product/list?page=${pageable}&keyName=${name}&keyPrice=${price}`);
  }

}
