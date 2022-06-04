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

<<<<<<< HEAD
=======
  /*
    Created by TuanPA
    Date: 9:08 3/6/2022
    Function: find by id
*/
>>>>>>> f1b918f96a955034e9887d1cb36d548fb8e7dc60
  findById(id: number): Observable<Product> {
    return this.http.get<Product>(this.productApi + '/' + id);
  }

<<<<<<< HEAD
=======
  /*
    Created by TuanPA
    Date: 9:08 3/6/2022
    Function: edit product
*/
>>>>>>> f1b918f96a955034e9887d1cb36d548fb8e7dc60
  updateProduct(id: number, value: any): Observable<any> {
    return this.http.patch<any>(this.productApi + '/' + 'update/' + id, value);
  }

<<<<<<< HEAD
  listAll(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/api/product/list`);
  }

  /*
  Created by khoaVC
  Time: 10:00 03/06/2022
  Method: list()
*/
  list(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/api/product/listAll`);
=======
  list(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiBaseUrl}/api/product/list`);
>>>>>>> f1b918f96a955034e9887d1cb36d548fb8e7dc60
  }
}
